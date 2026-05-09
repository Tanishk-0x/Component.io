import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || '' ; 

const DbConnect = async () => {

    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(MONGO_URL);
        console.log('DB Connected SuccessFully✅');
    }
    
    catch (err) {
        console.error(`Error In DB Connection: ${err}`);
        throw err; 
    }
}; 

export default DbConnect ; 