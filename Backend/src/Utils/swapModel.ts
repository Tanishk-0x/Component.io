import GenerateViaGemini from "../Provider/ai.generate";
import GenerateViaGroq from "../Provider/ai.groq";
import GenerateViaOpenRouter from "../Provider/ai.openrouter";

export const ManageGeneration = async ( modelId: any , prompt: any) => {
    let response ; 
    switch(modelId){
        case 'gemini-2.5-flash-lite':
            response = await GenerateViaGemini( prompt ); 
        
        case 'llama-3.3-70b-versatile':
            response = await GenerateViaGroq( prompt ); 

        case 'nvidia/nemotron-3-super-120b-a12b:free':
            response = await GenerateViaOpenRouter( prompt ); 

        default :
            response = await GenerateViaGemini( prompt );
    }

    return response ; 
};