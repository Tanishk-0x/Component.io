import { OpenRouter } from '@openrouter/sdk';
import { SystemInstruction } from '../Constants/instructions';

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY1


const openRouter = new OpenRouter({
    apiKey: OPEN_ROUTER_API_KEY , 
});

function CreateInstruction ( prompt: string ){
    const Instruction = SystemInstruction ; 
    return Instruction + "The Prompt Is: " + prompt ; 
}


const GenerateViaOpenRouter = async (prompt: string) => {
    const instruction = CreateInstruction( prompt ); 
    try {
        const completion = await openRouter.chat.send({
            chatRequest: {
                model: 'nvidia/nemotron-3-super-120b-a12b:free' , 
                messages: [
                    {
                        role: 'user' , 
                        content: instruction ,
                    },
                ],
            }
        });

        if( !completion ){
            throw new Error('Failed To Generate Via OpenRouter!'); 
        }

        return completion.choices[0].message.content ; 
    }
    
    catch (error) {
        console.log('Erorr On OpenRouter:' , error); 
        throw error ; 
    }
};

export default GenerateViaOpenRouter ; 