import type { Request , Response } from "express";
import User from "../Models/userModel";
import Component from "../Models/componentModel";


// Get-Admin-Dashboard-Data 
const GetAdminDashboardData = async(req: Request , res: Response) => {
    try {
        const page = parseInt(req.body.page) || 1 ; 
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
            .limit(limit) , 

            // 4. Recent Users 
            User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

            // 5. All Components 
            Component.find()
            .populate('author' , 'name email')
            .select('title category code status likeCount viewCount createdAt')
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

export default GetAdminDashboardData ; 