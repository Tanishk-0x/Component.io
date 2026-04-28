import type { Request , Response } from "express";
import User from "../Models/userModel";
import Component from "../Models/componentModel";


const GetAdminData = async (req: Request , res: Response) => {
    try {
        const users = await User.find({} , 
            {
                _id: 1 ,
                name: 1 , 
                email: 1 , 
                isVerified: 1 ,
            }
        ).sort({ createdAt: -1 }).lean(); 

        if( !users ){
            return res.status(404).json({
                success: false , 
                message: 'Users Not Fetched!'
            }); 
        }

        const components = await Component.find({} , 
            {
                _id: 1 , 
                title: 1 , 
                category: 1 , 
                code: 1 ,
                status:1 , 
            }
        ).sort({createdAt: -1}).lean(); 

        if( !components ){
            return res.status(404).json({
                success: false , 
                message: 'Components Not Fetched!'
            });
        }

        return res.status(200).json({
            success: true , 
            message: 'User Fetched SuccessFully!' ,
            users: users ,
            components: components , 
        }); 
    }
    
    catch (error: any) {
        return res.status(500).json({
            success: false , 
            message: 'Getting Admin Data Error!' , 
            error: error.message 
        });
    }
}

export default GetAdminData ; 