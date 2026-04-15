import jwt from 'jsonwebtoken'; 
import crypto from 'crypto'; 

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '' ; 
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '' ; 

export function SetAccessToken (res: any , userId: string , role: string , maxAge: Number) {
    // 1. Generate token 
    // 2. Set into cookies (httpOnly)
    const MaxAge = 1 * 60 * 60 * 24 * 10000 ; 
    const token = jwt.sign(
        { userId , role , type: 'access' },
        ACCESS_TOKEN_SECRET ,
        { expiresIn: MaxAge }
    ); 

    res.cookie('access_token' , token , {
        httpOnly: true , 
        secure: true , 
        sameSite: 'lax' , 
        maxAge: maxAge , 
    }); 
};


export function SetRefreshToken (res: any , userId: string , role: string , maxAge: Number) {
    // 1. Generate token 
    // 2. Set into cookies (httpOnly)
    const MaxAge = 1 * 60 * 60 * 24 * 10000 ; 
    const token = jwt.sign(
        { userId , role , type: 'refresh' },
        REFRESH_TOKEN_SECRET ,
        { expiresIn: MaxAge }
    ); 

    res.cookie('refresh_token' , token , {
        httpOnly: true , 
        secure: true , 
        sameSite: 'lax' , 
        maxAge: maxAge , 
    }); 
};


export function SetCsrfToken (res: any , maxAge: Number) {
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