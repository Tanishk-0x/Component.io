import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || '' ; 

const DbConnect = async () => {
    await mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('DB Connected SuccessFully✅')
    })
    .catch((err) => {
        console.log(`Error In DB Connection: ${err}`)
    })
}; 

export default DbConnect ; 