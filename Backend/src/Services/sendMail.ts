import nodemailer from 'nodemailer'
import { SetHtmlContent } from '../Constants/emailContent';

export const SendMail = async ( email: string , otp: string ) => {

    // Creating a transporter using Smtp 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.example.com',
        port: 465,
        secure: true,
        pool: true ,
        auth: {
            user: process.env.HOST_EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    }); 

    const HtmlContent = SetHtmlContent(otp); 

    // Using this Transporter Sending Mail
    const info = await transporter.sendMail({
        from: '"Component.io" <projectbeta009@gmail.com>', 
        to: email, 
        subject: "Email Verification - Action Required", 
        text: `Your verification code for Component.io is: ${otp}. This code is valid for 5 minutes.`, 
        html: HtmlContent ,
    });

    return info ; 
}

