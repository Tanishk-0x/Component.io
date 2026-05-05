import { Request, Response } from "express";
import User from "../Models/userModel";
import Component from "../Models/componentModel";
import EmbeddingContent from "../Provider/ai.embedding";
import { ManageGeneration } from "../Utils/swapModel";
import { ParseComponentData } from "../Utils/parseData";

/*
1. Take prompt from request 
2. embdding those prompt 
3. check for exist in Database ( Vector Search ) 
4. if exist just return from that (source: 'DATABASE')
5. if not exists then Generate a new component also
save its prompt + code + embedding in DATABASE for 
further search 
6. Credits Deduct Logic Handle 
7. Push Component's ID in User's SavedComponent Field 🔨
8. Response Return 
*/

interface AuthenticatedRequest extends Request {
    userId?: string 
}; 


// Resolve Component 
const ResolveComponent = async(req: AuthenticatedRequest , res: Response) => {
    try {
        const prompt = req.body.prompt ; 
        const model = req.body.model ; 

        const userId = req.userId ; 

        if( !prompt || !model ){
            return res.status(404).json({
                success: false , 
                message: 'Prompt Or Model Cannot Be Empty!'
            }); 
        }

        // ---- Check for User ----
        const user = await User.findById(userId); 

        if( !user ){
            return res.status(404).json({
                success: false , 
                message: 'User Not Found!'
            });
        }

        // ---- Check for Credits ---- 
        if( user.credits < 5 ){
            return res.status(403).json({
                success: false , 
                message: 'Insufficient Credits!'
            });
        }

        // ---- Embedding ---- 
        const embeddings: any = await EmbeddingContent( prompt ); 

        if( !embeddings || embeddings.values.length === 0 ){
            return res.status(404).json({
                success: false , 
                message: 'Failed To Genarate Embeddings'
            });
        }


        // ---- Vector Search ---- 
        const component: any = await Component.aggregate([
            {
                $vectorSearch: {
                    index: 'vector_index' , 
                    path: 'embedding' ,
                    queryVector: embeddings.values ,
                    numCandidates: 15 ,
                    limit: 1
                }
            },
            {
                $addFields: {
                    "score" : { $meta: 'vectorSearchScore' }
                }
            },
            {
                $match: {
                    "score" : { '$gt' : 0.95 }
                }
            },
            {
                $project: {
                    embedding: 0 ,
                    __v: 0
                }
            }
        ]);  

        // ---- CACHE MISSED ---- 
        if( !component || component.length === 0 ){

            // -- Check for Credits --
            if( user.credits < 20 ){
                return res.status(403).json({
                    success: false , 
                    message: 'Insufficient Credits!'
                });
            }

            const response: any = await ManageGeneration( model , prompt );  

            if( !response ){
                return res.status(404).json({
                    success: false , 
                    message: 'Failed To Genarate Code!'
                }); 
            }

            // -- Cleaning Data --
            const ParsedData = await ParseComponentData( response ); 

            // -- Save IN DB --
            const comp = await Component.create({
                author: req.userId ,
                title: ParsedData.title ,
                category: ParsedData.category ,
                prompt: prompt , 
                code: ParsedData.cleanCode ,
                modelUsed: model ,
                embedding: embeddings.values
            });  

            // -- Removing Embedding --
            const newObj = comp.toObject(); 
            const { embedding , ...safeComponent } = newObj ;  

            // -- Deduct Credits --
            user.credits -= 20 ;
            user.callsMade += 1 ;  
            await user.save() ; 

            // -- Response --
            return res.status(200).json({
                success: true , 
                message: 'Component Resolved SuccessFully!' , 
                info: 'Cache Missed (Not Found In DB)!' ,
                source: 'AI_Generated' ,
                model: model ,
                prompt: prompt ,
                title: ParsedData.title , 
                category: ParsedData.category ,
                code: ParsedData.cleanCode ,
                component: safeComponent ,
            });
        }

        // ---- CACHE HITTED ----
        if( component && component.length !== 0 ){
            // ---- Check for Credits ----
            if( user.credits < 5 ){
                return res.status(403).json({
                    success: false , 
                    message: 'Insufficient Credits!'
                });
            }

            // -- Deduct Credits --
            user.credits -= 5 ; 
            user.callsMade += 1 ; 
            await user.save() ; 

            // -- Response -- 
            return res.status(200).json({
                success: true , 
                message: 'Component Resolved SuccessFully!' , 
                info: 'Cache Hits (Found In DB)!' ,
                prompt: prompt , 
                matchedPrompt: component[0].prompt ,
                matchedScore: Math.round((component[0].score) * 100)+'%' ,
                source: 'DataBase' ,
                component: component[0] , 
            });
        }

    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Resolving Component Request!' , 
            error: error.message 
        });
    }
}; 


// Save Component 
const SaveComponent = async(req: AuthenticatedRequest , res: Response) => {
    try {
        const { id } = req.params ; 
        const userId = req.userId ; 

        if( !id ){
            return res.status(404).json({
                success: false , 
                message: 'Component Id Not Found!'
            });
        }

        const component = await Component.findByIdAndUpdate(id , 
            { $inc: { savedCount: 1 } } , 
            { new: true }
        ); 

        if( !component ){
            return res.status(404).json({
                success: false , 
                message: 'Component Not Found!'
            }); 
        }

        if( !userId ){
            return res.status(401).json({
                success: false , 
                message: 'UnAuthorized!'
            });
        }

        const user = await User.findByIdAndUpdate(userId,
            {
                $addToSet: { savedComponents: id }
            },
            { new: true }
        ); 

        if( !user ){
            return res.status(404).json({
                success: false , 
                message: 'User Not Found!'
            }); 
        }

        return res.status(200).json({
            success: true , 
            message: 'Component Saved SuccessFully!' , 
            savedCount: component.savedCount ,
            user: user
        }); 
    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Saving Component!' , 
            error: error.message 
        });
    }
};


// Get All Components 
const GetComponents = async (req: AuthenticatedRequest , res: Response) => {
    try {
        const page = parseInt(req.query.page as any) || 1 ; 
        const limit = 10 ; 
        const skip = (page - 1) * limit ; 

        const totalComponents = await Component.countDocuments(); 
        const maxPages = Math.ceil(totalComponents / limit); 

        const components = await Component.find({})
        .select('-embedding').skip(skip).limit(limit)
        .populate('author' , 'name email')
        .sort({ createdAt: -1}).lean({}); 

        if( !components || components.length === 0 ){
            return res.status(404).json({
                success: false , 
                message: 'Components Not Found!'
            });
        }

        return res.status(200).json({
            success: true , 
            message: 'Components Fetched SuccessFully!' , 
            maxPages: maxPages , 
            components: components
        }); 
    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Saving Component!' , 
            error: error.message 
        });
    }
}; 


// Like Component 
const LikeComponent = async (req: AuthenticatedRequest , res: Response) => {
    try {
        const {id} = req.params ; 

        if( !id ){
            return res.status(403).json({
                success: false ,
                message: 'Component Id Missing!'
            });
        }

        const component: any = await Component.findByIdAndUpdate(
            id , 
            { $inc: { likeCount: 1 } } , 
            { new: true }
        );

        if( !component ){
            return res.status(404).json({
                success: false ,
                message: 'Component Not Found!'
            });
        }

        return res.status(200).json({
            success: true , 
            message: 'Component Liked!' , 
            likeCount: component.likeCount , 
        }); 
    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Like Component!' , 
            error: error.message 
        });
    }
};


// Remove From Saved 
const RemoveSaved = async(req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params ; 
        const userId = req.userId ; 

        if( !id ){
            return res.status(403).json({
                success: false , 
                message: 'Component Id Missing!'
            }); 
        }

        if( !userId ){
            return res.status(401).json({
                success: false , 
                message: 'UnAuthorized!'
            }); 
        }

        const user = await User.findByIdAndUpdate( userId , 
            { $pull: { savedComponents: id } } , 
            { new: true }
        ).select('-password');

        if( !user ){
            return res.status(404).json({
                success: false , 
                message: 'User Not Found!'
            }); 
        }

        return res.status(200).json({
            success: true , 
            message: 'Removed SuccessFully!' , 
            user: user 
        }); 
        
    }
    
    catch (error: any) {
       return res.status(500).json({
            success: false , 
            message: 'Error While Removing Saved Component!' , 
            error: error.message 
        }); 
    }
}


export default {ResolveComponent , SaveComponent, GetComponents , LikeComponent , RemoveSaved}; 
