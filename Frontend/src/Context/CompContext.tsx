import { createContext, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import type{ ComponentContextType, MainContextProps } from "../Types/Types";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { mainUrlContext } from "./MainContext";
import { ExtractCookie } from "../Utils/Cookie";
import { authDataContext } from "./AuthContext";


// Creating Context 
export const componentDataContext = createContext<ComponentContextType | null>(null); 

const CompContext = ({children}: MainContextProps) => {

    const { serverUrl } = useSafeContext(mainUrlContext); 
    const { GetUserDetails } = useSafeContext(authDataContext); 

    // -------------- UseStates --------------
    const [source , setSource] = useState(null); 
    const [componentData , setComponentData] = useState(null); 
    const [isLoading , setIsLoading] = useState(false); 
    const [errorMessage , setErrorMessage] = useState(''); 
    const [isSaving , setIsSaving] = useState(false); 
    const [isSaved , setIsSaved] = useState(false); 

    // ----- Function To Resolve Component ------
    const ResolveComponent = async (prompt: string , model: string) => {
        
        if( isLoading ){
            return ; 
        }

        if( !prompt || !model ){
            toast.error('Please Provide Prompt Or Model!'); 
            return ; 
        }

        const CSRF_TOKEN = ExtractCookie(); 
        setIsLoading(true); 

        try {
            const res = await axios.post(serverUrl + '/comp/resolve' , 
                { prompt: prompt , model: model } , 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            );

            if( res.data.success ){
                setComponentData(res.data.component); 
                setSource(res.data.source) ; 
                GetUserDetails(); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            setErrorMessage(errorMessage); 
            toast.error(errorMessage); 
            console.log("Component Error!"); 
            console.dir(error); 
        }

        finally{
            setIsLoading(false); 
        }
    }

    // ----- Function To Save Component ------
    const SaveComponent = async ( CompId: string ) => {

        if( isSaving ){
            return ; 
        }
        if( !CompId ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsSaving(true); 

        try {
            const res = await axios.post( serverUrl + `/comp/save/${CompId}` ,
                { } , 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 
            
            if(res.data.success ){
                toast.success("Component Saved!"); 
                setIsSaved(true); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            setErrorMessage(errorMessage); 
            toast.error(errorMessage); 
            console.log("Component Save Error!"); 
            console.dir(error);
        }

        finally{
            setIsSaving(false); 
        }
    }

    const value = {
        ResolveComponent ,
        componentData ,
        isLoading , 
        errorMessage ,
        source , 
        SaveComponent ,
        isSaving , 
        isSaved , 
    }; 

    return (
        <div>
            {/* --- Proving the values --- */}
            <componentDataContext.Provider value={value}>
                {children}
            </componentDataContext.Provider>
        </div>
    )
}

export default CompContext
