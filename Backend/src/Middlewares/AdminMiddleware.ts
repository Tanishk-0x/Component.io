import { Request, Response, NextFunction } from "express";
import User from "../Models/userModel";

interface AuthenticatedRequest extends Request {
    userId?: string ;
}

export const CheckForAdmin = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    const userId = req.userId ; 

    if( !userId ){
        return res.status(401).json({
            success: false , 
            message: 'UnAuthorized!'
        }); 
    }

    const user = await User.findById(userId); 

    if( !user ){
        return res.status(404).json({
            success: false , 
            message: 'User Not Found!'
        }); 
    }

    // Checking for ADMIN ROLE
    if( user.role !== 'ADMIN' ){
        return res.status(401).json({
            success: false , 
            message: 'Role Is Not ADMIN!'
        }); 
    }

    next(); 
}; 