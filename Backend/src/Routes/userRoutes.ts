import express from "express";
import { GetCurrentUser } from "../Controllers/User";
import { AuthMe } from "../Middlewares/AuthMiddleware";
const router = express.Router(); 


router.get('/authme' , AuthMe , GetCurrentUser);


export default router ; 