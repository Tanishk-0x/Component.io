import jwt from 'jsonwebtoken'; 
import crypto from 'crypto'; 

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '' ; 
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '' ; 

export function SetAccessToken (res: any , userId: string , role: string , maxAge: number) {
    // 1. Generate token 
    // 2. Set into cookies (httpOnly)
    const AccessTokenExpiry = Math.floor(maxAge / 1000);  

    const token = jwt.sign(
        { userId , role , type: 'access' },
        ACCESS_TOKEN_SECRET ,
        { expiresIn: AccessTokenExpiry }
    ); 

    
    res.cookie('access_token' , token , {
        httpOnly: true , 
        secure: true , 
        sameSite: 'lax' , 
        maxAge: maxAge , 
    }); 
};


export function SetRefreshToken (res: any , userId: string , role: string , maxAge: number) {
    // 1. Generate token 
    // 2. Set into cookies (httpOnly)
    const RefreshTokenExpiry = Math.floor(maxAge / 1000);  

    const token = jwt.sign(
        { userId , role , type: 'refresh' },
        REFRESH_TOKEN_SECRET ,
        { expiresIn: RefreshTokenExpiry }
    ); 

    res.cookie('refresh_token' , token , {
        httpOnly: true , 
        secure: true , 
        sameSite: 'lax' , 
        maxAge: maxAge , 
    }); 
};


export function SetCsrfToken (res: any , maxAge: number) {
    // Generate CSRF Token 
    const csrfToken = crypto.randomBytes(32).toString('hex'); 

    res.cookie('csrf_token' , csrfToken , {
        httpOnly: false , 
        secure: true,
        sameSite: 'lax',
        maxAge: maxAge,
    }); 
}


export function ClearAllCookies (res: any) {
    res.clearCookie('access_token' , {
        secure: true, 
        sameSite: 'lax'
    }); 

    res.clearCookie('refresh_token' , {
        secure: true, 
        sameSite: 'lax'
    }); 
    
    res.clearCookie('csrf_token' , {
        secure: true, 
        sameSite: 'lax'
    }); 
}