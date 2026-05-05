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

    author: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: "User" , 
        required: true
    },

    modelUsed: {
        type: String , 
    },
    status: {
        type: String , 
        enum: ["Created" , "Public" , "Requested" , "Rejected"] , 
        default: "Created"
    },
    savedCount: {
        type: Number , 
        default: 0
    },
    
    likeCount: {
        type: Number , 
        default: 0 
    },
    
    // ---- Embedding ----
    embedding: {
        type: [Number] , 
        required: true
    }

}, {timestamps: true}); 

const Component = mongoose.model("Component" , ComponentSchema); 
export default Component ; 