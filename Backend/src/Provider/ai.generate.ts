import { GoogleGenAI } from '@google/genai' ; 
import { SystemInstruction } from '../Constants/instructions';

const GEMINI_API_KEY2 = process.env.GEMINI_API_KEY2 ; 

const genAI = new GoogleGenAI({
    apiKey: GEMINI_API_KEY2
}); 

// ------- Instruction -------- 
const Instruction = SystemInstruction ; 


// ---- Function For Generating ----
const GenerateViaGemini = async ( prompt: string ) => {
    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash-lite' ,  
            contents: [{
                role: 'user' , 
                parts: [
                    { text: `CONTEXT: ${Instruction}` },
                    { text: `USER REQUEST: ${prompt}` }
                ]
            }]
        });

        if( !response ){
            throw new Error('Failed To Generate!'); 
        }

        return response.text ; 
    }
    
    catch (error) {
        console.log('Error On Generating:' , error); 
        throw error ; 
    }
};

export default GenerateViaGemini ; 