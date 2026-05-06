import express from "express";
import GetComponentForCLI from "../Controllers/Cli";
const router = express.Router(); 

router.get('/get-component/:id' , GetComponentForCLI); 

export default router ; 