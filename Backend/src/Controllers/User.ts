import { Request, Response } from "express";
import User from "../Models/userModel";
import { AuthRequest } from "../Middlewares/AuthMiddleware";

// Get Current User Details 
export const GetCurrentUser = async (req: Request, res: Response) => {
    try {
        // Extracting userID 
        const AuthReq = req as AuthRequest ;
        
        const UserId = AuthReq.userId ; 

        if( !UserId ){
            return res.status(401).json({
                success: false,
                message: 'UnAuthorized! (Get User)'
            }); 
        }

        const user = await User.findById(UserId).select('-password')
            .populate('savedComponents' , 'title category code createdAt').lean(); 

        if( !user ){
            return res.status(404).json({
                success: false,
                message: 'User Not Found! (Get User)'
            }); 
        }

        return res.status(200).json({
            success: true ,
            message: 'UserDetails Fetched SuccessFully!' ,
            user: user
        }); 
    }
    
    catch (error) {
        console.error('Getting Current User Error: ' , error);
        return res.status(500).json({
            success: false , 
            message: 'Error While Getting Current User' , 
            error
        });
    }
}