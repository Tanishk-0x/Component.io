import express, {Request , Response} from 'express';
require('dotenv').config();
import DbConnect  from './Configs/database'
import authRoutes from './Routes/authRoutes'; 
import userRoutes from './Routes/userRoutes'; 
import compRoutes from './Routes/compRoutes';
import adminRoutes from './Routes/adminRoutes'; 
import publishRoutes from './Routes/publishRoutes'; 
import cliRoutes from './Routes/cliRoutes'; 
import cookieParser from 'cookie-parser'; 
import rateLimit from 'express-rate-limit'; 
import helmet from 'helmet';
import cors from 'cors'; 
const app = express(); 

const PORT = process.env.PORT ; 

// Limitter 
const Limiter = rateLimit({
    windowMs: 1000 * 60   , 
    max: 100 , 
    message: {
        success: false,
        message: 'Too Many Requests From This IP'
    },
});

app.use(Limiter); 


app.use(helmet()); 


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
app.use('/admin' , adminRoutes); 
app.use('/publish' , publishRoutes); 
app.use('/cli' , cliRoutes); 

app.get('/' , (req: Request , res: Response) => {
    res.send('Default Route!');
}); 


DbConnect()
.then(() => {
    app.listen(PORT , () => {
        console.log(`Server Started SuccessFully At: ${PORT}✅`);
    });
})
.catch((error) => {
    console.log('Database Connection Failed', error);
})

