import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken'; 

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '' ; 

export interface AuthRequest extends Request {
    userId?: string;
};

export const AuthMe = async (req: AuthRequest, res: Response , next: NextFunction) => {
    try {
        const accessToken = req.cookies.access_token ; 

        if( !accessToken ){
            return res.status(401).json({
                success: false,
                message: 'UnAuthorized! (Token Missing)'
            }); 
        }

        const decoded = jwt.verify( accessToken , ACCESS_TOKEN_SECRET ) as JwtPayload;  

        if( !decoded.userId ){
            return res.status(401).json({
                success: false,
                message: 'UnAuthorized! (Invalid Token)'
            }); 
        }

        // Setting UserId Into Req 
        req.userId = decoded.userId ; 

        next(); 
    }
    
    catch (error) {

        if( error instanceof TokenExpiredError ){
            return res.status(401).json({
                success: false,
                message: 'UnAuthorized! (Token Expired)'
            }); 
        }

        if( error instanceof JsonWebTokenError ){
            return res.status(403).json({
                success: false,
                message: 'Forbidden!'
            });
        }

        console.error('Authenticating Error: ' , error);
        return res.status(500).json({
            success: false , 
            message: 'Error While Authenticating User' , 
            error
        });
    }
}