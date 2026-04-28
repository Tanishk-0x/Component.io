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


    // ------ Handlers ------------

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

    const value = {
        RequestToPublish , 
        isRequesting , 
        requested ,
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
