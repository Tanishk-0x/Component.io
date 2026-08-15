import express, {Request , Response} from 'express';
require('dotenv').config();
import DbConnect  from './Configs/database'
import authRoutes from './Routes/authRoutes'; 
import userRoutes from './Routes/userRoutes'; 
import compRoutes from './Routes/compRoutes';
import adminRoutes from './Routes/adminRoutes'; 
import publishRoutes from './Routes/publishRoutes'; 
import cliRoutes from './Routes/cliRoutes'; 
import paymentRoutes from './Routes/paymentRoutes'; 
import HandleStripeWebhook from './Payments/Webhook';
import cookieParser from 'cookie-parser'; 
import rateLimit from 'express-rate-limit'; 
import helmet from 'helmet';
import cors from 'cors'; 
const app = express(); 

const PORT = process.env.PORT ; 

// ---- WebHooks -----
app.post(
    '/api/webhook',
    express.raw({ type: 'application/json' }),
    HandleStripeWebhook 
); 



app.set('trust proxy', 1);

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

const allowedOrigin = ["http://localhost:5173" , process.env.FRONTEND_URL ] ; 

console.log("🔥 EXPOSED VERCEL SECRETS 🔥\n", {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL,
    GEMINI_API_KEY2: process.env.GEMINI_API_KEY2,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    HOST_EMAIL: process.env.HOST_EMAIL,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    OPEN_ROUTER_API_KEY1: process.env.OPEN_ROUTER_API_KEY1,
    PORT: process.env.PORT,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
});


// Cors Setup
app.use(cors({
    origin(origin , callback){
        if(!origin){
            return callback(null , true); 
        }
        if( allowedOrigin?.includes(origin) ){
            return callback(null , true); 
        }

        return callback(new Error('Not Allowed By Cors!'), false); 
    },
    credentials: true 
})); 


app.use(express.json()); 
app.use(cookieParser()); 


app.use(async (req, res, next) => {
    try {
        await DbConnect();  
        next();
    } catch (error) {
        console.error("Database connection error in middleware:", error);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
});


// Mounting 
app.use('/auth' , authRoutes);
app.use('/user' , userRoutes); 
app.use('/comp' , compRoutes); 
app.use('/admin' , adminRoutes); 
app.use('/publish' , publishRoutes); 
app.use('/cli' , cliRoutes); 
app.use('/payment' , paymentRoutes); 



app.get('/' , (req: Request , res: Response) => {
    res.send('Default Route!');
}); 


if( process.env.NODE_ENV !== 'production' ){
    const serverPort = PORT || 5000 ; 
    app.listen(serverPort , () => {
        console.log(`Server Started SuccessFully At: ${serverPort}✅`);
    });
}


export default app ; 



