import { Request, Response, NextFunction } from "express"

export const requireCSRF = async (req: Request, res: Response, next: NextFunction) => {

    const Csrf_Cookie_Token = req.cookies?.['csrf_token'] ; 
    const Csrf_Header_Token = req.headers['x-csrf-token'];

    if( !Csrf_Cookie_Token || !Csrf_Header_Token || Csrf_Cookie_Token !== Csrf_Header_Token ){
        return res.status(403).json({
            success: false,
            message: 'Invalid CSRF Token'
        });
    }

    next(); 

}