import { createContext, useEffect, useState } from "react"
import type{ MainContextProps } from "../Types/Types";
import toast from "react-hot-toast";
import axios, { AxiosError } from 'axios'; 
import { mainUrlContext } from "./MainContext";
import { useSafeContext } from "../Hooks/UseSafeContext";
import type{ AuthContextType } from "../Types/Types";
import type{ FormDataType } from "../Types/Types";
import { ExtractCookie } from "../Utils/Cookie";

// Creating Context 
export const authDataContext = createContext<AuthContextType | null>(null); 

const AuthContext = ({ children }: MainContextProps) => {


    // -------- UseContext ---------
    const { serverUrl }  = useSafeContext(mainUrlContext)

    // --------- UseStates ---------
    const [signupLoading , setSignupLoading] = useState(false); 
    const [loginLoading , setLoginLoading] = useState(false); 
    const [gettingUserDetails , setGettingUserDetails] = useState(false); 
    const [isRefreshing , setIsRefreshing] = useState(false); 
    const [isLogout , setIsLogout] = useState(false); 

    const [userData , setUserData] = useState<any | null>(null); 


    // --------- Signup Handlers --------- 
    const Signup = async (formData: FormDataType) => {
        // Checks 
        if( signupLoading ){
            return false; 
        }

        if( !formData.name || !formData.email || !formData.password ){
            toast.error('Fields cannot be empty');
            return false; 
        }

        if( formData.password.length < 6 ){
            toast.error('Password must be atleast 6 character');
            return false; 
        }

        setSignupLoading(true); 

        try {
            const res = await axios.post( serverUrl + '/auth/signup' ,
                {
                    name: formData.name ,
                    email: formData.email ,
                    password: formData.password ,
                },
                { withCredentials: true }
            ); 

            if( res.data.success ){
                GetUserDetails(); 
                toast.success('Signup SuccessFully!'); 
                return true ; 
            }
            return false ; 
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage);  
            console.error(error); 
            return false ; 
        }

        finally{
            setSignupLoading(false); 
        }
    }


    // --------- Login Handlers --------- 
    const Login = async (formData: FormDataType) => {
        // Checks 
        if( loginLoading ){
            return false ; 
        }

        if( !formData.email || !formData.password ){
            toast.error('Fields cannot be empty');
            return false ; 
        }

        if( formData.password.length < 6 ){
            toast.error('Password must be atleast 6 character'); 
            return false ; 
        }

        setLoginLoading(true); 

        try {
            const res = await axios.post( serverUrl + '/auth/login' , 
                {
                    email: formData.email ,
                    password: formData.password , 
                },
                { withCredentials: true }
            ); 

            if( res.data.success ){
                GetUserDetails(); 
                toast.success('Login SuccessFully!');  
                return true ; 
            }
            return false ;
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.error(error);
            return false ; 
        }

        finally{
            setLoginLoading(false); 
        }
    }


    // ---------- Refresh Token ------------ 
    const RefreshToken = async () => {
        if( isRefreshing ){
            return false ; 
        }
        
        setIsRefreshing(true); 
        const CSRF_TOKEN = ExtractCookie(); 
        try {
            const res = await axios.post( serverUrl + '/auth/refresh' , 
                {},
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN 
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                return true ; 
            }
        }
        
        catch (error) {
            // Logout 
            setUserData(null); 
            return false ; 
        }

        finally{
            setIsRefreshing(false); 
        }
    }


    // --------- Auth (Get_User_Details) --------- 

    const GetUserDetails = async () => {
        if( gettingUserDetails ){
            return ; 
        }
        setGettingUserDetails(true); 
        const CSRF_TOKEN = ExtractCookie(); 
            
        try {
            const res = await axios.get( serverUrl + '/user/authme' , 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                setUserData(res.data?.user); 
            }
        }
            
        catch (error) {
            const axiosError = error as AxiosError; 

            if( axiosError?.response?.status === 401 ){
                setUserData(null);
                    
                // ----- Refresh Token Logic -----
                const isRefreshed = await RefreshToken(); 

                if( isRefreshed ){
                    const CSRF_TOKEN = ExtractCookie(); 
                    try {
                        const res = await axios.get( serverUrl + '/user/authme' , 
                            {
                                headers: {
                                    'x-csrf-token' : CSRF_TOKEN
                                },
                                withCredentials: true
                            } 
                        ); 

                        if( res.data.success ){
                            setUserData(res?.data?.user); 
                        }
                    }
                    catch (error) {
                        setUserData(null); 
                    }
                }
            }

            else{
                console.error(error);
            }
        }

        finally{
            setGettingUserDetails(false); 
        }
    }

    useEffect(() => {

        GetUserDetails(); 

    }, [serverUrl]);


    // --------- LogOut Handlers --------- 
    const Logout = async () => {
        if(isLogout){
            return false; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsLogout(true);

        try {
            const res = await axios.post( serverUrl + '/auth/logout' , 
                {},
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN 
                    },
                    withCredentials: true
                }
            );

            if( res.data.success ){
                toast.success("Logout SuccessFully!");
                setUserData(null);  
                return true ; 
            }
            return false ;
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.error(error); 
            setUserData(null); 
            return false ;
        }

        finally{
            setIsLogout(false); 
        }
    }


    // Defining Values
    const value = {
        Signup ,
        signupLoading ,
        Login , 
        loginLoading , 
        userData , 
        setUserData ,
        Logout , 
        isLogout ,
        gettingUserDetails , 
        GetUserDetails
    
    }; 

    return (
        <div>
            <authDataContext.Provider value={value}>
                {children}
            </authDataContext.Provider>
        </div>
    )
}

export default AuthContext
