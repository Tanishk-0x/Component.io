import express from "express";
import Component from "../Controllers/Controller";
import { AuthMe } from "../Middlewares/AuthMiddleware";
import { requireCSRF } from "../Middlewares/CsrfMiddleware";
const router = express.Router(); 

// -------------------------------------------------
router.post('/resolve' , requireCSRF , AuthMe , Component.ResolveComponent); 
// ------------------------------------------------
router.post('/save/:id' , requireCSRF , AuthMe , Component.SaveComponent ); 

export default router ; 