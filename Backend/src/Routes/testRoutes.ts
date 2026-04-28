import express from "express";
import EmbeddingContent from "../Provider/ai.embedding";
import GenerateViaGemini from "../Provider/ai.generate";
import GenerateViaOpenRouter from "../Provider/ai.openrouter";
import GenerateViaGroq from "../Provider/ai.groq";
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
router.post('/gemini' , async(req , res) => {
    const prompt = req.body.prompt ; 

    const response: any = await GenerateViaGemini( prompt );

    // ------ TITLE/CATEGORY ------
    const declarationMatch = response.match(/(?:const|function|class)\s+([A-Z][a-zA-Z0-9_]*)\s*(?:=|\(|extends)/);
    const exportMatch = response.match(/export\s+default\s+([A-Z][a-zA-Z0-9_]*)/);

    const componentName = declarationMatch?.[1] || exportMatch?.[1] ; 

    if (componentName) {
        // Example: "AnimatedProductCard" -> "Animated Product Card"
        return componentName.replace(/([A-Z])/g, ' $1').trim(); 
    }
  

    return res.status(200).json({
        success: true , 
        message: 'Generated SuccessFully!' , 
        componentName: componentName ,
        code: response ,
    });
});

// --------- OPEN ROUTER ------------
router.post('/openrouter' , async(req , res) => {
    const prompt = req.body.prompt ; 

    const response: any = await GenerateViaOpenRouter( prompt ); 

    // ------ TITLE/CATEGORY ------
    const declarationMatch = response.match(/(?:const|function|class)\s+([A-Z][a-zA-Z0-9_]*)\s*(?:=|\(|extends)/);
    const exportMatch = response.match(/export\s+default\s+([A-Z][a-zA-Z0-9_]*)/);

    const componentName = declarationMatch?.[1] || exportMatch?.[1] ; 

    if (componentName) {
        // Example: "AnimatedProductCard" -> "Animated Product Card"
        return componentName.replace(/([A-Z])/g, ' $1').trim(); 
    }
  

    return res.status(200).json({
        success: true , 
        message: 'Generated SuccessFully!' , 
        componentName: componentName ,
        code: response ,
    });
});


// ------------ GROQ --------------
router.post('/groq' , async(req , res) => {
    const prompt = req.body.prompt ; 

    const response: any = await GenerateViaGroq( prompt ); 

    // ------ TITLE/CATEGORY ------
    const declarationMatch = response.match(/(?:const|function|class)\s+([A-Z][a-zA-Z0-9_]*)\s*(?:=|\(|extends)/);
    const exportMatch = response.match(/export\s+default\s+([A-Z][a-zA-Z0-9_]*)/);

    const componentName = declarationMatch?.[1] || exportMatch?.[1] ; 

    if (componentName) {
        // Example: "AnimatedProductCard" -> "Animated Product Card"
        return componentName.replace(/([A-Z])/g, ' $1').trim(); 
    }
  

    return res.status(200).json({
        success: true , 
        message: 'Generated SuccessFully!' , 
        componentName: componentName ,
        code: response ,
    });
});

export default router ; 