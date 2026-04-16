import express from "express";
import { Signup , Login , Logout, RefreshToken } from "../Controllers/Auth";
import { requireCSRF } from "../Middlewares/CsrfMiddleware";
const router = express.Router(); 

router.post('/signup' , Signup); 
router.post('/login' , Login); 
router.post('/logout' , Logout); 

router.post('/refresh' , requireCSRF , RefreshToken); 


export default router ; 