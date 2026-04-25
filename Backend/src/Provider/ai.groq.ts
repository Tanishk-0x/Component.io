import Groq from "groq-sdk";
import { SystemInstruction } from "../Constants/instructions";

const GROQ_API_KEY = process.env.GROQ_API_KEY ;

const groq = new Groq({
    apiKey: GROQ_API_KEY 
}); 


function CreateInstruction ( prompt: any ){
    const Instruction = SystemInstruction ; 
    return Instruction + "The Prompt Is: " + prompt ; 
}


const GenerateViaGroq = async (prompt: string) => {
    const instruction = CreateInstruction( prompt ) ; 
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user' ,
                    content: instruction 
                },
            ],
            model: 'llama-3.3-70b-versatile'
        }); 

        if( !chatCompletion ){
            throw new Error('Failed To Generate Via Groq!')
        }

        return chatCompletion.choices[0]?.message?.content ; 
    }
    
    catch (error) {
        console.log('Erorr On Groq:' , error); 
        throw error ;
    }
}

export default GenerateViaGroq ;