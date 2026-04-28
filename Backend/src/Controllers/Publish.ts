import type { Request, Response } from "express";
import User from "../Models/userModel";
import Component from "../Models/componentModel";

// Request To Publish 
const RequestToPublish = async(req: Request , res: Response) => {
    try {
        const { id } = req.params ; 

        if( !id ){
            return res.status(404).json({
                success: false , 
                message: 'Component Id Missing!'
            }); 
        }

        
        const component = await Component.findByIdAndUpdate(id , 
            { status: "Requested" } , 
            { new: true }
        ).select('-embedding');  

        if( !component ){
            return res.status(404).json({
                success: false , 
                message: "Component Not Found!"
            }); 
        }

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



export default RequestToPublish ; 