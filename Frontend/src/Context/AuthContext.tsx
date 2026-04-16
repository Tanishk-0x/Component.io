import { createContext, useState } from "react"
import type{ MainContextProps } from "../Types/Types";
import toast from "react-hot-toast";
import axios from 'axios'; 
import { mainUrlContext } from "./MainContext";
import { useSafeContext } from "../Hooks/UseSafeContext";
import type{ AuthContextType } from "../Types/Types";
import type{ FormDataType } from "../Types/Types";


// Creating Context 
export const authDataContext = createContext<AuthContextType | null>(null); 

const AuthContext = ({ children }: MainContextProps) => {

    // -------- UseContext ---------
    const { serverUrl }  = useSafeContext(mainUrlContext)

    // --------- UseStates ---------
    const [signupLoading , setSignupLoading] = useState(false); 
    const [loginLoading , setLoginLoading] = useState(false); 

    const [userData , setUserData] = useState<any | null>(null); 


    // --------- Signup Handlers --------- 
    const Signup = async (formData: FormDataType) => {
        // Checks 
        if( signupLoading ){
            return ; 
        }

        if( !formData.name || !formData.email || !formData.password ){
            toast.error('Fields cannot be empty');
            return ; 
        }

        if( formData.password.length < 6 ){
            toast.error('Password must be atleast 6 character');
            return ; 
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
                toast.success('Signup SuccessFully!'); 
                setUserData(res.data?.user);
            }

        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("Signup Error!"); 
            console.dir(error); 
        }

        finally{
            setSignupLoading(false); 
        }
    }


    // --------- Login Handlers --------- 
    const Login = async (formData: FormDataType) => {
        // Checks 
        if( loginLoading ){
            return ; 
        }

        if( !formData.email || !formData.password ){
            toast.error('Fields cannot be empty');
            return ; 
        }

        if( formData.password.length < 6 ){
            toast.error('Password must be atleast 6 character'); 
            return ; 
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
                toast.success('Login SuccessFully!'); 
                setUserData(res.data?.user); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("Login Error!"); 
            console.dir(error);
        }

        finally{
            setLoginLoading(false); 
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
