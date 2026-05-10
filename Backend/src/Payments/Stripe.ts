import Stripe from 'stripe' ; 

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '' ; 

const stripe = new Stripe(STRIPE_SECRET_KEY); 

// Function To Create Checkout
const CheckOut = async(req: any , res: any) => {

    try {
        let price = 12 ;
        const userId = req.userId ; 
        let creditAmount = 50 ; 

        const { tierId } = req.body ; 

        if( tierId === '02' ){
            price = 20 ; 
            creditAmount = 500 ; 
        }
        else if( tierId === '01' ){
            price = 12 ; 
            creditAmount = 200 ;
        }
        else{
            price = 0 ; 
            creditAmount = 0 ;
        }
        
        // Creating Session
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card'] , 
            line_items: [{
                price_data: {
                    currency: 'usd' , 
                    product_data: { name: `${creditAmount} Credits Pack` }, 
                    unit_amount: price * 100 , 
                },
                quantity: 1 ,
            }],
            mode: 'payment' ,
            metadata: {
                userId: userId.toString() ,
                creditsToAdd: creditAmount.toString() ,  
            }, 
            success_url: `${process.env.FRONTEND_URL}/success` , 
            cancel_url: `${process.env.FRONTEND_URL}/pricing`
        }); 
        
        res.json({ 
            id: session.id ,
            url: session.url
        }); 
    }
    
    catch (error: any) {
        res.status(500).json({
            success: false , 
            message: 'Error on Checkout' , 
            error: error.message 
        }); 
    }
}; 

export default CheckOut ; 