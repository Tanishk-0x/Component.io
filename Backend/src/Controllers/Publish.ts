import type { Request, Response } from "express";
import User from "../Models/userModel";
import Component from "../Models/componentModel";

interface AuthenticatedRequest extends Request {
    userId: string ; 
}; 

// Request To Publish 
const RequestToPublish = async(req: Request , res: Response) => {
    try {
        const { id } = req.params ; 

        const authRequest = req as AuthenticatedRequest ; 
        const userID = authRequest.userId ; 

        if( !id ){
            return res.status(404).json({
                success: false , 
                message: 'Component Id Missing!'
            }); 
        }

        if( !userID ){
            return res.status(404).json({
                success: false , 
                message: 'User Id Missing!'
            });
        }
        
        const component = await Component.findOne({
            _id: id , author: userID
        }).select('-embedding'); 

        if( !component ){
            return res.status(404).json({
                success: false , 
                message: "Component Not Found OR You are not authorized to publish this!"
            }); 
        }

        if( component.status !== 'Created' ){
            return res.status(400).json({
                success: false , 
                message: `Cannot request publish. Component is currently in '${component.status}' state.`
            }); 
        }

        component.status = "Requested" ; 
        await component.save(); 

        return res.status(200).json({
            success: true , 
            message: 'Requested SuccessFully!' , 
            component: component 
        }); 

    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Requesting to Publish!' , 
            error: error.message 
        });
    }
};


/*
1. take component id 
2. fetch component 
3. get user id from component 
4. mark component'status as "PUBLIC" 
5. add +10 credits to user 
*/

// Accept Request 
const AcceptRequest = async(req: Request , res: Response) => {
    try {
        const { id } = req.params ; 

        if( !id ){
            return res.status(404).json({
                success: false , 
                message: 'Component Id Missing!'
            }); 
        }

        const component = await Component.findById(id).select('-embedding');   

        if( !component ){
            return res.status(404).json({
                success: false , 
                message: 'Component Not Found!'
            }); 
        }

        if( component.status === "Public" ){
            return res.status(403).json({
                success: false , 
                message: 'Component is Already Public!'
            }); 
        }

        if( component.status !== "Requested" ){
            return res.status(403).json({
                success: false , 
                message: 'Invalid Status!'
            });
        }

        const userId = component?.author ; 
        
        if( !userId ){
            return res.status(404).json({
                success: false , 
                message: 'User Id Missing!'
            }); 
        }

        component.status = "Public" ; 
        await component.save(); 

        const user = await User.findByIdAndUpdate(userId , 
            { $inc: { credits: 10 } } , 
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
            message: 'Request Accepted & User Rewarded!' , 
            user: user , 
            component: component
        }); 
    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Accepting Request!' , 
            error: error.message 
        });
    }
}


// Reject Request 
const RejectRequest = async(req: Request , res: Response) => {
    try {
        const { id } = req.params ; 

        if( !id ){
            return res.status(400).json({
                success: false , 
                message: 'Component Id Missing!'
            });
        }

        const component = await Component.findById(id).select('-embedding'); 

        if( !component ){
            return res.status(404).json({
                success: false , 
                message: 'Component Not Found!'
            });
        }

        if( component.status === "Public" ){
            return res.status(400).json({
                success: false , 
                message: 'Cannot Reject Public Component!'
            });
        }

        if( component.status !== "Requested" ){
            return res.status(400).json({
                success: false , 
                message: 'Only Requested Component Can be Reject!'
            });
        }

        component.status = "Rejected" ; 
        await component.save(); 

        return res.status(200).json({
            success: true , 
            message: 'Request Rejected!' , 
            component: component 
        }); 
    }
    
    catch (error: any) {
       return res.status(500).json({
            success: false , 
            message: 'Error While Rejecting Request!' , 
            error: error.message 
        }); 
    }
}


export default {RequestToPublish , AcceptRequest , RejectRequest} ; 