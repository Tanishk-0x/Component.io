import express from "express";
import { Signup , Login , Logout, RefreshToken } from "../Controllers/Auth";
const router = express.Router(); 

router.post('/signup' , Signup); 
router.post('/login' , Login); 
router.post('/logout' , Logout); 

router.post('/refresh' , RefreshToken); 


export default router ; 