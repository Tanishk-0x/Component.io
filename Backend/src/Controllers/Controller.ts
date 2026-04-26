import { Request, Response } from "express";
import User from "../Models/userModel";
import Component from "../Models/componentModel";
import EmbeddingContent from "../Provider/ai.embedding";
import { ManageGeneration } from "../Utils/swapModel";

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

            // -- Save IN DB --
            const comp = await Component.create({
                prompt: prompt , 
                code: response ,
                modelUsed: model ,
                embedding: embeddings.values
            });  

            // -- Removing Embedding --
            const newObj = comp.toObject(); 
            const { embedding , ...safeComponent } = newObj ;  

            // -- Deduct Credits --
            user.credits -= 20 ; 
            await user.save() ; 

            // -- Response --
            return res.status(200).json({
                success: true , 
                message: 'Component Resolved SuccessFully!' , 
                info: 'Cache Missed (Not Found In DB)!' ,
                source: 'AI_Generated' ,
                model: model ,
                prompt: prompt ,
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


export default {ResolveComponent , SaveComponent}; 
