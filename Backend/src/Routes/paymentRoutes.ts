import express from 'express' ; 
import { requireCSRF } from '../Middlewares/CsrfMiddleware';
import { AuthMe } from '../Middlewares/AuthMiddleware';
import CheckOut from '../Payments/Stripe';
const router = express.Router(); 


router.post('/checkout' , AuthMe , CheckOut); 


export default router ; 