import express from "express";
import { Signup , Login , Logout, RefreshToken } from "../Controllers/Auth";
import { requireCSRF } from "../Middlewares/CsrfMiddleware";
import { SendOtp, VerifyOtp } from "../Controllers/Otp";
import { AuthMe } from "../Middlewares/AuthMiddleware";
const router = express.Router(); 

router.post('/signup' , Signup); 
router.post('/login' , Login); 
router.post('/logout' , Logout); 

router.post('/refresh' , requireCSRF , RefreshToken); 

router.post('/sendotp', requireCSRF , AuthMe , SendOtp); 
router.post('/verify' , requireCSRF , AuthMe , VerifyOtp); 


export default router ; 