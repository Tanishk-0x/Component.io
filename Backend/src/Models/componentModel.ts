import mongoose, { trusted } from 'mongoose'; 

const ComponentSchema = new mongoose.Schema({

    title: {
        type: String , 
        default: 'Untitled Component'
    },
    category: {
        type: String , 
        default: 'Uncategorized'
    },
    prompt: {
        type: String , 
        required: true
    },
    code: {
        type: String ,
        required: true
    },

    modelUsed: {
        type: String , 
        requird: trusted
    },
    status: {
        type: String , 
        enum: ["Created" , "Public"] , 
        default: "Created"
    },
    copyCount: {
        type: Number , 
        default: 0
    },
    
    likeCount: {
        type: Number , 
        default: 0 
    },
    viewCount: {
        type: Number , 
        default: 0
    },

    
    // ---- Embedding ----
    embedding: {
        type: [Number] , 
        required: true
    }

}); 

const Component = mongoose.model("Component" , ComponentSchema); 
export default Component ; 