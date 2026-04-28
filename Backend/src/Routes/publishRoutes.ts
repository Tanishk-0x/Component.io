import express from "express";
import Publish from "../Controllers/Publish";
import { requireCSRF } from "../Middlewares/CsrfMiddleware";
import { AuthMe } from "../Middlewares/AuthMiddleware";
const router = express.Router(); 


router.patch('/requestpublish/:id' , requireCSRF , AuthMe , Publish.RequestToPublish); 
router.post('/acceptrequest/:id' , requireCSRF , AuthMe , Publish.AcceptRequest); 
router.post('/rejectrequest/:id' , requireCSRF , AuthMe , Publish.RejectRequest); 

export default router ; 