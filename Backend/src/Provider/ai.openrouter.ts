import { SystemInstruction } from '../Constants/instructions';


const OPEN_ROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.OPEN_ROUTER_API_KEY;

function CreateInstruction (prompt: string) {
    return SystemInstruction + "\n\nThe Prompt Is: " + prompt; 
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

    for (const currentModel of FALL_BACK_MODELS) {

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPEN_ROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: currentModel,
                    messages: [{ role: 'user', content: instruction }]
                })
            });

            if (!response.ok) {
                console.log(`Skipping ${currentModel} - API Error Status: ${response.status}`);
                continue;
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (!content || content.trim() === '') {
                continue;
            }

            return content; 
            
        }
        
        catch (error: any) {
            console.error(`Failed with ${currentModel}:`, error.message);
            continue;
        }
    }

    console.log('Failed To Generate With All Fallback Models'); 
    return null;
};

export default GenerateViaOpenRouter;