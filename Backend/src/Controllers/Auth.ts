import User from "../Models/userModel";
import bcrypt from 'bcrypt'; 
import { Request , Response } from "express";
import {SetAccessToken , SetRefreshToken , SetCsrfToken , ClearAllCookies} from '../Utils/tokens' ; 
import jwt, { JwtPayload } from 'jsonwebtoken'; 

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '' ;

// Token Configs (MaxAge)
const Config = {
    AccessMaxAge:  15*60*1000,
    RefreshMaxAge:  60*60*1000, 
    CsrfMaxAge:  60*60*1000, 
}

// --------- SIGNUP HANDLER ----------
export const Signup = async (req: Request , res: Response) => {
    try {
        const { name , email , password } = req.body ; 

        // check of user already exist 
        const UserExist = await User.findOne({email}); 
        if(UserExist){
            return res.status(403).json({
                success: false , 
                message: 'User Already Exist'
            }); 
        }

        const HashedPassword = await bcrypt.hash( password , 10 ); 

        const user = await User.create({
            name , email , password: HashedPassword
        });

        // Setting Tokens 
        SetAccessToken(res , String(user._id) , 'user' ,  Config.AccessMaxAge); 
        SetRefreshToken(res , String(user._id) , 'user' ,  Config.RefreshMaxAge); 
        SetCsrfToken(res , Config.CsrfMaxAge); 

        // Remove Password 
        const userObj = user.toObject() as any ;  
        delete userObj.password ; 

        return res.status(201).json({
            success: true , 
            message: 'Signup SuccessFully!' , 
            user: userObj
        }); 

    }
    
    catch (error) {
        console.error('Signup Error: ' , error);
        return res.status(500).json({
            success: false , 
            message: 'Error While Signup' , 
            error
        }); 
    }
}; 


// --------- LOGIN HANDLER ----------
export const Login = async (req: Request , res: Response) => {
    try {
        const { email , password } = req.body ; 

        const UserExist = await User.findOne({email}); 
        if( !UserExist ){
            return res.status(403).json({
                success: false,
                message: 'Invalid Email Or Password!'
            }); 
        }

        // check for password 
        const isMatch = await bcrypt.compare( password , UserExist.password ); 
        if( !isMatch ){
            return res.status(403).json({
                success: false,
                message: 'Invalid Email Or Password!'
            });
        }

        // Setting Tokens 
        SetAccessToken(res , String(UserExist._id) , 'user' , Config.AccessMaxAge);
        SetRefreshToken(res , String(UserExist._id) , 'user' , Config.RefreshMaxAge);
        SetCsrfToken(res , Config.CsrfMaxAge); 

        // Remove Password 
        const userObj = UserExist.toObject() as any ; 
        delete userObj.password ; 

        return res.status(200).json({
            success: true , 
            message: 'Login SuccessFully!' , 
            user: userObj
        }); 
    }
    
    catch (error) {
        console.error('Login Error: ' , error); 
        return res.status(500).json({
            success: false , 
            message: 'Error While Login' , 
            error: error
        }); 
    }
}


// --------- LOGIN HANDLER ----------
export const Logout = async (req: Request , res: Response) => {
    try {
        ClearAllCookies(res); 

        return res.status(200).json({
            success: true,
            message: 'Logout SuccessFully!'
        }); 
    }
    
    catch (error) {
        console.error('Logout Error: ' , error);
        return res.status(500).json({
            success: false , 
            message: 'Error While Logout' , 
            error: error
        }); 
    }
}


// --------- REFRESH TOKEN ----------
export const RefreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token ; 

        if( !refreshToken ){
            return res.status(401).json({
                success: false,
                message: 'UnAuthorized! (Refresh Token Missing)'
            });
        }

        const decoded = jwt.verify( refreshToken , REFRESH_TOKEN_SECRET ) as JwtPayload ; 

        if( !decoded.userId || !decoded.exp ){
            return res.status(401).json({
                success: false,
                message: 'UnAuthorized! (Invalid Refresh Token)'
            }); 
        }

        const CurrentTime = Math.floor(Date.now() / 1000); 
        const RemainingTime = decoded.exp - CurrentTime ; 

        if( RemainingTime <= 0 ){
            return res.status(401).json({
                success: false,
                message: 'UnAuthorized! (Refresh Token Expired)'
            });
        }

        // Refreshing Token 
        SetAccessToken(res , String(decoded.userId) , 'user' ,  Config.AccessMaxAge); 
        SetRefreshToken(res , String(decoded.userId) , 'user' ,  RemainingTime * 1000); 
        SetCsrfToken(res , RemainingTime * 1000); 

        return res.status(200).json({
            success: true ,
            message: 'Token Refreshed!'
        }); 
    }
    
    catch (error) {
        console.error('Refreshing Token Error: ' , error);
        return res.status(500).json({
            success: false , 
            message: 'Error While Refreshing Token' , 
            error: error
        }); 
    }
}