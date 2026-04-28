import { createContext, useState } from 'react'
import type { MainContextProps, PublishContextType } from '../Types/Types';
import { ExtractCookie } from '../Utils/Cookie';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSafeContext } from '../Hooks/UseSafeContext';
import { mainUrlContext } from './MainContext';

// Creating Context 
export const publishDataContext = createContext<PublishContextType | null>(null); 

const PublishContext = ({children}: MainContextProps) => {

    const { serverUrl } = useSafeContext(mainUrlContext);  

    // ------- UseStates ----------- 
    const [isRequesting , setIsRequesting] = useState(false); 
    const [requested , setRequested] = useState(false); 
    const [isAccepting , setIsAccepting] = useState(false); 
    const [accepted , setAccepted] = useState(false); 
    const [rejected , setRejected] = useState(false); 
    const [isRejecting , setIsRejecting] = useState(false); 


    // ------ Handlers ------------

    // Request Publish 
    const RequestToPublish = async(Id: string) => {

        if( isRequesting ){
            return ; 
        }
        if( !Id ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsRequesting(true); 

        try {
            const res = await axios.patch( serverUrl + `/publish/requestpublish/${Id}` , 
                {}, 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true 
                }
            );

            if( res.data.success ){
                toast.success("Requested!"); 
                setRequested(true); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ;  
            toast.error(errorMessage); 
            console.log("Requesting Component Error!"); 
            console.dir(error);
        }

        finally{
            setIsRequesting(false); 
        }
    }

    // Accept Request 
    const AcceptRequest = async(Id: string) => {

        if( isAccepting ){
            return ; 
        }
        if( !Id ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsAccepting(true); 

        try {
            const res = await axios.post( serverUrl + `/publish/acceptrequest/${Id}` , 
                {} , 
                { 
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                toast.success("Accepted!"); 
                setAccepted(true);  
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ;  
            toast.error(errorMessage); 
            console.log("Accepting Request Error!"); 
            console.dir(error);
        }

        finally{
            setIsAccepting(false); 
        }
    }


    // Reject Request 
    const RejectRequest = async(Id: string) => {

        if( isRejecting ){
            return ; 
        }
        if( !Id ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsRejecting(true); 

        try {
            const res = await axios.post( serverUrl + `/publish/rejectrequest/${Id}` , 
                {} , 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                toast.success("Rejected!"); 
                setRejected(true); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ;  
            toast.error(errorMessage); 
            console.log("Rejecting Request Error!"); 
            console.dir(error);
        }

        finally{
            setIsRejecting(false); 
        }
    }

    const value = {
        RequestToPublish , 
        isRequesting , 
        requested ,
        AcceptRequest , 
        isAccepting , 
        accepted , 
        RejectRequest , 
        isRejecting , 
        rejected , 
    }; 

    return (
        <div>
            <publishDataContext.Provider value={value}>
                {children}
            </publishDataContext.Provider>
        </div>
    )
}

export default PublishContext
