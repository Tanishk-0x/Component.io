import express from "express";
import RequestToPublish from "../Controllers/Publish";
import { requireCSRF } from "../Middlewares/CsrfMiddleware";
import { AuthMe } from "../Middlewares/AuthMiddleware";
const router = express.Router(); 


router.patch('/requestpublish/:id' , requireCSRF , AuthMe , RequestToPublish); 


export default router ; 