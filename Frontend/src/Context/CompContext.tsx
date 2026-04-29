import { createContext, useEffect, useState } from "react"
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
    const { GetUserDetails , setUserData } = useSafeContext(authDataContext); 

    // -------------- UseStates --------------
    const [source , setSource] = useState(null); 
    const [componentData , setComponentData] = useState(null); 
    const [isLoading , setIsLoading] = useState(false); 
    const [errorMessage , setErrorMessage] = useState(''); 
    const [isSaving , setIsSaving] = useState(false); 
    const [isSaved , setIsSaved] = useState(false); 
    const [components , setCompnents] = useState(null); 
    const [isGetting , setIsGetting] = useState(false); 
    const [isLiking , setIsLiking] = useState(false); 
    const [isLiked , setIsLiked] = useState(false); 
    const [likesCount , setLikesCount] = useState(null); 
    const [isRemoving , setIsRemoving] = useState(false); 
    const [removed , setRemoved] = useState(false); 

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

    // ----- Function To Get Components ------
    const GetComponents = async () => {

        if( isGetting ){
            return ; 
        }
        setIsGetting(true); 
        try {
            const res = await axios.get( serverUrl + '/comp/getcomponents' ,
                { withCredentials: true }
            ); 

            if( res.data.success ){
                if( res.data.components.length > 0 ){
                    setCompnents(res.data.components); 
                    console.log("COMPONENTS: " , res.data.components); 
                    toast.success("Components Fetched!"); 
                }
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            setErrorMessage(errorMessage); 
            toast.error(errorMessage); 
            console.log("Get Components Error!"); 
            console.dir(error);
        }

        finally{
            setIsGetting(false); 
        }
    }

    // ----- CALLING TO GET COMPONENTS ------
    useEffect(() => {
        GetComponents(); 
    },[]); 


    // ---- Function To Like Component -----
    const LikeComponent = async ( Id: string ) => {
        if( isLiking ){
            return ; 
        }
        if( isLiked ){
            return ; 
        }

        setIsLiking(true); 
        try {
            const res = await axios.post( serverUrl + `/comp/likecomponent/${Id}` ,
                { } , 
                { withCredentials: true }
            ); 

            if( res.data.success ){
                setIsLiked(true); 
                setLikesCount(res.data.likeCount); 
                toast.success("Liked!"); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            setErrorMessage(errorMessage); 
            toast.error(errorMessage); 
            console.log("Like Components Error!"); 
            console.dir(error);
        }

        finally{
            setIsLiking(false); 
        }
    }

    // ---- Function To Remove Component -----
    const RemoveSaved = async(Id: string) => {
        if( isRemoving ){
            return ; 
        }
        if( !Id ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsRemoving(true); 

        try {
            const res = await axios.post( serverUrl + `/comp/remove/${Id}` , 
                {} , 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                toast.success("Removed!"); 
                setRemoved(true); 
                setUserData(res.data.user); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("Remove Saved Error!"); 
            console.dir(error);
        }

        finally{
            setIsRemoving(false); 
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
        components , 
        LikeComponent , 
        isLiked , 
        likesCount , 
        RemoveSaved , 
        isRemoving , 
        removed ,
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
