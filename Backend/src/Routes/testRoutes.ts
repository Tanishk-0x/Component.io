import express from "express";
import EmbeddingContent from "../Provider/ai.embedding";
import GenerateContent from "../Provider/ai.generate";
const router = express.Router(); 

// ----- Embed Test Route -------
router.post('/embed' , async(req , res) => {
    const prompt = req.body.prompt ; 

    const response = await EmbeddingContent( prompt ); 

    return res.status(200).json({
        success: true , 
        message: 'Embedded SuccessFully!' , 
        embedLength: response.values.length , 
        embedding: response.values 
    }); 
}); 

// ------ Generate Text Route --------
router.post('/generate' , async(req , res) => {
    const prompt = req.body.prompt ; 

    const response = await GenerateContent( prompt );

    return res.status(200).json({
        success: true , 
        message: 'Generated SuccessFully!' , 
        code: response 
    });
});


export default router ; 