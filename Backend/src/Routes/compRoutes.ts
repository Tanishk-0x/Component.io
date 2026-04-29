import express from "express";
import Component from "../Controllers/Controller";
import { AuthMe } from "../Middlewares/AuthMiddleware";
import { requireCSRF } from "../Middlewares/CsrfMiddleware";
const router = express.Router(); 

// -------------------------------------------------
router.post('/resolve' , requireCSRF , AuthMe , Component.ResolveComponent); 
// ------------------------------------------------
router.post('/save/:id' , requireCSRF , AuthMe , Component.SaveComponent ); 
router.post('/remove/:id' , requireCSRF , AuthMe , Component.RemoveSaved); 
// ------------------------------------------------
router.get('/getcomponents' , Component.GetComponents); 
// ------------------------------------------------
router.post('/likecomponent/:id' , Component.LikeComponent); 

export default router ; 