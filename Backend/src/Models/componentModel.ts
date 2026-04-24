import mongoose from 'mongoose'; 

const ComponentSchema = new mongoose.Schema({

    prompt: {
        type: String , 
        required: true
    },
    code: {
        type: String ,
        required: true
    },

    
    // ---- Embedding ----
    embedding: {
        type: [Number] , 
        required: true
    }

}); 

const Component = mongoose.model("Component" , ComponentSchema); 
export default Component ; 