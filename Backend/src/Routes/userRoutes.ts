import express from "express";
import { GetCurrentUser } from "../Controllers/User";
import { AuthMe } from "../Middlewares/AuthMiddleware";
import { requireCSRF } from "../Middlewares/CsrfMiddleware";
const router = express.Router(); 


router.get('/authme' , requireCSRF , AuthMe , GetCurrentUser);


export default router ; 