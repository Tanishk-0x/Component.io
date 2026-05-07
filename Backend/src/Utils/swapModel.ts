import GenerateViaGemini from "../Provider/ai.generate";
import GenerateViaGroq from "../Provider/ai.groq";
import GenerateViaOpenRouter from "../Provider/ai.openrouter";

export const ManageGeneration = async ( modelId: any , prompt: any) => {
    let response ; 
    switch(modelId){
        
        case 'gemini-2.5-flash-lite':
            response = await GenerateViaGemini( prompt ); 
            break ; 
        
        case 'llama-3.3-70b-versatile':
            response = await GenerateViaGroq( prompt ); 
            break ; 

        case 'openrouter-fallback':
            response = await GenerateViaOpenRouter( prompt ); 
            break ; 

        default :
            response = await GenerateViaGemini( prompt );
    }

    return response ; 
};