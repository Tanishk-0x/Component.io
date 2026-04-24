import express from "express";
import ResolveComponent from "../Controllers/Controller";
import { AuthMe } from "../Middlewares/AuthMiddleware";
import { requireCSRF } from "../Middlewares/CsrfMiddleware";
const router = express.Router(); 

// -------------------------------------------------
router.post('/resolve' , requireCSRF , AuthMe , ResolveComponent); 
// ------------------------------------------------

export default router ; 