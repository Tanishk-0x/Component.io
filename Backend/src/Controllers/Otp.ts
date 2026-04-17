import OTP from "../Models/otpModel";
import { Request , Response } from "express";
import crypto from 'crypto'; 
import { SendMail } from "../Services/sendMail";
import bcrypt from 'bcrypt'; 
import User from '../Models/userModel'; 

function GenerateOtp () {
    return crypto.randomInt( 100000 , 1000000 ).toString(); 
}

// --------- Send Otp ----------
export const SendOtp = async (req: Request , res: Response) => {
    try {
        const { email } = req.body ; 

        if( !email ){
            return res.status(404).json({
                success: false,
                message: 'Email Not Found!'
            });
        }

        const ExistOtp = await OTP.findOne({email}); 

        const newOtp = GenerateOtp(); 
        const HashedOtp = await bcrypt.hash( newOtp , 10 ); 

        if( ExistOtp ){
            ExistOtp.otp = HashedOtp ; 
            ExistOtp.createdAt = new Date(); 
            await ExistOtp.save(); 
        }
        else{
            OTP.create({
                email ,
                otp: HashedOtp ,
                createdAt: new Date()
            });
        }

        // Sending Through Email 
        const info = await SendMail( email , newOtp ); 

        return res.status(200).json({
            success: true,
            message: 'Otp Send SuccessFully!'
        }); 

    }
    
    catch (error) {
        console.log('SendOtp Error!' , error); 
        return res.status(500).json({
            success: false , 
            message: 'Error While Sending Otp' , 
            error 
        }); 
    }
}


// --------- Verify Otp ----------
export const VerifyOtp = async (req: Request, res: Response) => {
    try {
        const { email , otp } = req.body ; 

        if( !email || !otp ){
            return res.status(404).json({
                success: false,
                message: 'Email or Otp Not Found!'
            });
        }

        const OtpExist = await OTP.findOne({email}); 

        if( !OtpExist ){
            return res.status(403).json({
                success: false,
                message: 'Invalid Otp'
            });
        }

        const isOtpMatched = await bcrypt.compare( otp , OtpExist.otp ); 

        if( !isOtpMatched ){
            return res.status(403).json({
                success: false,
                message: 'Invalid Otp'
            });
        }

        const user = await User.findOne({email}); 

        if( !user ){
            return res.status(404).json({
                success: false,
                message: 'User Not Found!'
            });
        }

        user.isVerified = true ; 
        await user.save(); 

        await OTP.deleteMany({email});

        return res.status(200).json({
            success: true , 
            message: 'Email Verified SuccessFully!'
        }); 

    }
    
    catch (error) {
      console.log('Email Verify Error!' , error); 
        return res.status(500).json({
            success: false , 
            message: 'Error While Verifying Email' , 
            error 
        });   
    }
}