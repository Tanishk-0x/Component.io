import User from "../Models/userModel";
import { Request , Response } from "express";
import Stripe from 'stripe'; 

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '' ; 
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '' ; 

const stripe = new Stripe(STRIPE_SECRET_KEY); 

// ----------- WebHook ---------
const HandleStripeWebhook = async(req: Request , res: Response) => {
    const sig = req.headers['stripe-signature'] ; 
    let event ; 

    try {
        event = stripe.webhooks.constructEvent(
            req.body , 
            sig! ,
            STRIPE_WEBHOOK_SECRET , 
        );     
    }
    
    catch (error: any) {
        console.log(`Webhook signature verification failed.`, error.message); 
        return res.status(400).json({
            success: false , 
            message: `Webhook Error: ${error.message}` , 
        });
    }

    if( event.type === 'checkout.session.completed' ){
        const session = event.data.object as any ; 

        const userId = session.metadata.userId ; 
        const creditsToAdd = parseInt(session.metadata.creditsToAdd) ;


        if (!userId || creditsToAdd === 0) {
            console.log("Missing Info: UserId or Credits not found in metadata");
            return res.json({ received: true });
        }

        try {
            await User.findByIdAndUpdate(userId , {
                $inc: { credits: creditsToAdd },
            }, {new: true}); 
            
            console.log(`Successfully added ${creditsToAdd} credits to User: ${userId}`);
        }
        
        catch (error) {
            console.error("Database update failed:", error);
        }
    }

    res.json({ received: true });

}

export default HandleStripeWebhook ; 