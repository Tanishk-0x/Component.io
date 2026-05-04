import type { Request , Response } from "express";
import User from "../Models/userModel";
import Component from "../Models/componentModel";
import EmbeddingContent from "../Provider/ai.embedding";
import mongoose, { mongo } from "mongoose";
import { truncate } from "node:fs";

interface AuthenticatedRequest extends Request {
    userId: string ; 
}; 

// Get-Admin-Dashboard-Data 
const GetAdminDashboardData = async(req: Request , res: Response) => {
    try {
        const page = parseInt(req.query.page as any) || 1 ; 
        const limit = 10 ; 
        const skip = (page - 1) * limit ; 

        // Promise.all = to executes all concurrently 
        const [
            totalUsers , 
            componentStatusAggregation , 
            requestedComponents , 
            recentUsers , 
            allRecentComponents
        ] = await Promise.all([

            // 1. Total Users 
            User.countDocuments() ,
            
            // 2. Component grouped by status
            Component.aggregate([
                {
                    $group: {
                        _id: "$status" , 
                        count: { $sum: 1 }
                    }
                }
            ]), 

            // 3. Requested Components 
            Component.find({ status: "Requested" })
            .populate('author' , 'name email')
            .select('-embedding')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            , 

            // 4. Recent Users 
            User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

            // 5. All Components 
            Component.find({ status: "Public" })
            .populate('author' , 'name email')
            .select('title category code prompt status likeCount viewCount createdAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
        ]); 

        const componentStats: any = {
            Total: 0 , 
            Public: 0 , 
            Created: 0 , 
            Requested: 0 , 
            Rejected: 0 
        }; 

        // Setting Counts
        componentStatusAggregation.forEach( itr => {
            if( itr._id in componentStats ){
                componentStats[itr._id] = itr.count ; 
            }
            componentStats.Total += itr.count ; 
        }); 

        return res.status(200).json({
            success: true , 
            message: 'Admin-Data Fetched SuccessFully!' , 
            data: {
                counts: {
                    users: totalUsers , 
                    components: componentStats
                },
                lists: {
                    requests: requestedComponents , 
                    users: recentUsers , 
                    components: allRecentComponents
                },
                pagination: {
                    currentPage: page , 
                    limit: limit
                }
            }
        }); 

    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Getting Admin Dashboard Data!' , 
            error: error.message 
        }); 
    }
}

// Add-Component
const AddComponents = async(req: Request , res: Response) => {
    try {

        const userId = ( req as AuthenticatedRequest ).userId  ; 

        if( !userId ){
            return res.status(401).json({
                success: false , 
                message: 'UnAuthorized!'
            }); 
        }
        
        const { 
            title , category , prompt , code  
        } = req.body.formData ; 

        if( !title || !category || !code || !prompt ){
            return res.status(400).json({
                success: false , 
                message: 'Provide All Fields!'
            }); 
        }

        // ----- Embedding -----
        const embeddings: any = await EmbeddingContent( prompt );
        
        if( !embeddings || embeddings.values.length === 0 ){
            return res.status(404).json({
                success: false , 
                message: 'Failed To Genarate Embeddings'
            });
        }

        // Creating Component 
        const component: any = await Component.create({
            title: title , 
            category: category , 
            prompt: prompt || 'Default' , 
            author:  userId , 
            status: "Public" , 
            code: code ,
            embedding: embeddings.values 
        });

        if( !component ){
            return res.status(400).json({
                success: false , 
                message: 'Unable To Create Component!'
            }); 
        }

        return res.status(200).json({
            success: true , 
            message: 'Component Created!' , 
            component: component 
        }); 
    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Adding Component!' , 
            error: error.message 
        }); 
    }
}

// Delete Component 
const DeleteComponent = async(req: Request , res: Response) => {
    try {
        const { id } = req.params as { id: string } ; 

        if( !id ){
            return res.status(403).json({
                success: false , 
                message: 'Component ID Missing!'
            }); 
        }

        if( !mongoose.Types.ObjectId.isValid(id) ){
            return res.status(403).json({
                success: false , 
                message: 'Invalid Component ID!'
            }); 
        }

        const component = await Component.findById(id); 

        if( !component ){
            return res.status(404).json({
                success: false , 
                message: 'Component Not Found!'
            }); 
        }

        // Deleting Component 
        await Component.findByIdAndDelete(id);  

        const newId = new mongoose.Types.ObjectId(id);

        // Pulling from users 
        await User.updateMany(
            { savedComponents: newId },
            { $pull: { savedComponents: newId }}
        ); 

        return res.status(200).json({
            success: true , 
            message: 'Component Deleted SuccessFully!'
        }); 
    } 

    catch(error: any){
        return res.status(500).json({
            success: false , 
            message: 'Error While Deleting Component!' , 
            error: error.message 
        }); 
    }
}

// Update Component 
const UpdateComponent = async(req: Request , res: Response) => {
    try {
        const { id } = req.params ; 
        const { title, category, prompt, code } = req.body.formData ; 

        if( !id ){
            return res.status(403).json({
                success: false , 
                message: 'Component ID Missing!'
            }); 
        }

        let component = await Component.findById(id) ; 

        if( !component ){
            return res.status(404).json({
                success: false , 
                message: 'Component Not Found!'
            });
        }

        component = await Component.findByIdAndUpdate( id , 
            { title, category, prompt, code } , 
            { new: true }
        );

        return res.status(200).json({
            success: true , 
            message: 'Component Updated SuccessFully!'
        }); 

    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Updating Component!' , 
            error: error.message 
        }); 
    }
}

// Delete User / Transfer Ownership to Admin
const DeleteUser = async(req: Request , res: Response) => {
    try {
        const { id } = req.params ; 
        const AuthRequest = req as AuthenticatedRequest ; 
        const AdminID = AuthRequest.userId ; 

        if( !id ){
            return res.status(403).json({
                success: false , 
                message: 'User ID Missing!'
            }); 
        }

        if( !AdminID ){
            return res.status(403).json({
                success: false , 
                message: 'Admin ID Missing!'
            });
        }

        const user = await User.findById(id) ; 

        if( !user ){
            return res.status(404).json({
                success: false , 
                message: 'User Not Found!'
            }); 
        }

        // Transfer Ownership 
        await Component.updateMany(
            { author: id } , 
            { author: AdminID }
        ); 

        await User.findByIdAndDelete( id ); 

        return res.status(200).json({
            success: true , 
            message: 'User Deleted/Ownership Transferred!'
        }); 
    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Updating Component!' , 
            error: error.message 
        });     
    }
}

export default {GetAdminDashboardData , AddComponents , DeleteComponent , UpdateComponent , DeleteUser} ; 