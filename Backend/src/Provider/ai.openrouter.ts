import { SystemInstruction } from '../Constants/instructions';
import { OpenRouter } from '@openrouter/sdk';

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY1

const client = new OpenRouter({ 
    apiKey: OPEN_ROUTER_API_KEY 
});


function CreateInstruction ( prompt: string ){
    return SystemInstruction + "The Prompt Is: " + prompt ; 
}


const GenerateViaOpenRouter = async (prompt: string) => {

    const instruction = CreateInstruction(prompt);

    const FALL_BACK_MODELS = [
        'openai/gpt-oss-120b:free',          
        'tencent/hy3-preview:free',          
        'inclusion-ai/ling-2.6-1t:free',      
        'poolside/laguna-m.1:free',          
        'google/gemma-4-31b-it:free', 
        'nvidia/nemotron-3-super-120b-a12b:free'        
    ];

    for( const currentModel of FALL_BACK_MODELS ){
        try {

            const completion = await client.chat.send({
                chatRequest: {
                    model: currentModel,
                    messages: [{ role: 'user', content: instruction }],
                }
            });

            const content = completion.choices?.[0]?.message?.content;

            if( !content || content.trim() === '' ){
                continue;
            }

            return content;
        }

        catch (error: any) {
            continue;
        }
    }

    console.log('Failed To Generate'); 
    return null;
    
};

export default GenerateViaOpenRouter;