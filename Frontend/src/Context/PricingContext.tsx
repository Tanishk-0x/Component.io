import { createContext, useState } from "react"
import type { MainContextProps, PricingContextType } from "../Types/Types";
import axios from "axios";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { mainUrlContext } from "./MainContext";
import { authDataContext } from "./AuthContext";
import toast from "react-hot-toast";

export const pricingDataContext = createContext<PricingContextType | null>(null); 
 

const PricingContext = ({ children }: MainContextProps) => {

    const { serverUrl } = useSafeContext(mainUrlContext); 
    const { userData } = useSafeContext(authDataContext); 

    const [loading , setLoading] = useState(false); 

    // -------- Handler ---------------
    const HandleCheckout = async( tierId: any ) => {
        if( loading ){
            return ; 
        }
        if( tierId === '00' ){
            return ; 
        }
        if( !userData ){
            toast.error("Please Login First!"); 
            return ; 
        }

        setLoading(true); 
        try {
            const res = await axios.post(serverUrl + '/payment/checkout' ,
                { tierId } , 
                { withCredentials: true }
            ); 

            const paymentDetails = {
                name: userData.name,
                email: userData.email,
                tier: tierId === '01' ? 'Pro' : 'Ultimate'
            };

            const paymentData = {
                ...paymentDetails,
                expiry: Date.now() + 1000 * 60 * 10
            };

            localStorage.setItem(
                'paymentDetails',
                JSON.stringify(paymentData)
            );
            
            const { url } = res.data ; 

            if( url ){
                window.location.href = url ; 
            }
        }
        
        catch (error) {
            console.error("Checkout Error:", error);
            alert("Payment failed to start");
        }

        finally{
            setLoading(false); 
        }
    }

    const value = {
        HandleCheckout , 
        loading , 
    }; 

    return (
        <div>
            <pricingDataContext.Provider value={value}>
                    {children}
            </pricingDataContext.Provider>
        </div>
    )
}

export default PricingContext
