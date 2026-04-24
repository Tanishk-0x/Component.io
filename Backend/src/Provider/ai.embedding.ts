import { GoogleGenAI } from '@google/genai' ; 

const GEMINI_API_KEY2 = process.env.GEMINI_API_KEY2 ; 

const AI = new GoogleGenAI({
    apiKey: GEMINI_API_KEY2
});

// ---- Function For Embedding ----
const EmbeddingContent = async ( prompt: string ) => {
    try {
        const response: any = await AI.models.embedContent({
            model: 'gemini-embedding-2' , 
            contents: prompt ,
            config: {
                outputDimensionality: 768
            }
        });

        if( !response.embeddings || response.embeddings.length === 0 ){
            throw new Error('Failed To Embed!'); 
        }

        return response.embeddings[0] ; 
    }
    
    catch (error: any) {
        console.log('Error On Embedding:', error); 
        throw error ; 
    }
}; 


export default EmbeddingContent ; 