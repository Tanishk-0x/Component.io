import express, {Request , Response} from 'express';
require('dotenv').config();
import DbConnect  from './Configs/database'
import authRoutes from './Routes/authRoutes'; 
import userRoutes from './Routes/userRoutes'; 
import compRoutes from './Routes/compRoutes';
import testRoutes from './Routes/testRoutes'; 
import adminRoutes from './Routes/adminRoutes'; 
import cookieParser from 'cookie-parser'; 
import cors from 'cors'; 
const app = express(); 

const PORT = process.env.PORT ; 

// Cors Setup
app.use(cors({
    origin(origin , callback){
        if(!origin){
            return callback(null , true); 
        }
        if( process.env.CORS_ORIGIN?.includes(origin) ){
            return callback(null , true); 
        }

        return callback(new Error('Not Allowed By Cors!'), false); 
    },
    credentials: true 
})); 


app.use(express.json()); 
app.use(cookieParser()); 


// Mounting 
app.use('/auth' , authRoutes);
app.use('/user' , userRoutes); 
app.use('/comp' , compRoutes); 
app.use('/text' , testRoutes); 
app.use('/admin' , adminRoutes); 


app.get('/' , (req: Request , res: Response) => {
    res.send('Default Route!');
}); 


DbConnect(); 

app.listen(PORT , () => {
    console.log(`Server Started SuccessFully At: ${PORT}✅`);
});