import { createContext, useState } from "react"
import type { MainContextProps, OtpContextType } from "../Types/Types";
import toast from "react-hot-toast";
import axios from "axios";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { mainUrlContext } from "./MainContext";
import { ExtractCookie } from "../Utils/Cookie";


// Creating Context 
export const otpDataContext = createContext<OtpContextType | null>(null); 

const OtpContext = ({children}: MainContextProps) => {

    const { serverUrl } = useSafeContext(mainUrlContext); 

    // ---------- UseStates ----------
    const [sendingOtp , setSendingOtp] = useState(false); 
    const [isOtpSend , SetIsOtpSend] = useState(false); 
    const [verifyingOtp , setVerifyingOtp] = useState(false); 


    // ---------- SendOtp Handlers -----------
    const SendOtp = async (email: string) => {
        if(  sendingOtp ){
            return ; 
        }
        if( !email ){
            toast.error("Email Required!");
            return ; 
        }
        setSendingOtp(true); 
        const CSRF_TOKEN = ExtractCookie(); 

        try {
            const res = await axios.post( serverUrl + '/auth/sendotp' ,
                { email: email },
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                toast.success("Otp Send SuccessFully!"); 
                SetIsOtpSend(true); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("SendOtp Error!"); 
            console.dir(error);
        }

        finally{
            setSendingOtp(false); 
        }
    }


    // ---------- VerifyOtp Handlers -----------
    const VerifyOtp = async (email: string, otp: string) => {
        if( verifyingOtp ){
            return false;
        }
        if( !email || !otp ){
            toast.error('Email Or Otp Required!'); 
            return false; 
        }
        setVerifyingOtp(true); 
        const CSRF_TOKEN = ExtractCookie(); 

        try {
            const res = await axios.post( serverUrl + '/auth/verify' ,
                {
                    email: email,
                    otp: otp
                },
                {
                    headers:{
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            );

            if( res.data.success ){
                toast.success("Email Verified!"); 
                return true ; 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("VerifyOtp Error!"); 
            console.dir(error);
            return false ; 
        }

        finally{
            setVerifyingOtp(false); 
        }
    }

    const value = {
        SendOtp , 
        sendingOtp , 
        isOtpSend ,
        VerifyOtp , 
        verifyingOtp , 
    }; 

    return (
        <div>
        <otpDataContext.Provider value={value}>
            {children}
        </otpDataContext.Provider>
        </div>
    )

}

export default OtpContext
