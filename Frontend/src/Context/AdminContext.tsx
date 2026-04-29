import { createContext, useState } from "react"
import type { AdminContextType, ComponentCounts, MainContextProps } from "../Types/Types";
import toast from "react-hot-toast";
import axios from "axios";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { mainUrlContext } from "./MainContext";
import { ExtractCookie } from "../Utils/Cookie";

// Creating Context
export const adminDataContext = createContext<AdminContextType | null>(null); 

const AdminContext = ({children}: MainContextProps) => {

    const { serverUrl } = useSafeContext(mainUrlContext); 

    // --------- UseStates ------------
    const [isGettingData , setIsGettingData] = useState(false); 
    const [totalUsers , setTotalUsers] = useState(0); 
    const [componentCount , setComponentCount] = useState<ComponentCounts | null>(null); 
    const [requestedComponents , setRequestedComponents] = useState(null); 
    const [users , setUsers] = useState(null); 
    const [components , setComponents] = useState(null); 
    const [currentPage ,  setCurrentPage] = useState(null); 


    // ---------- Handlers -------------
    const GetAdminDashboardData = async (page: number) => {
        if( isGettingData ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsGettingData(true); 

        try {
            const res = await axios.get( serverUrl + `/admin/getadmindata?page=${page}` , 
                {
                    headers:{
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                toast.success("Data Fetched!"); 
                const data = res.data.data ; 

                // Setting States
                setTotalUsers(data.counts.users);
                setComponentCount(data.counts.components) ; 
                setRequestedComponents(data.lists.requests); 
                setUsers(data.lists.users); 
                setComponents(data.lists.components); 
                setCurrentPage(data.pagination.currentPage);
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("Get Admin Data Error!"); 
            console.dir(error);
        }

        finally{
            setIsGettingData(false); 
        }
    }

    const value = {
        isGettingData ,
        GetAdminDashboardData ,
        totalUsers , 
        componentCount , 
        requestedComponents , 
        users , 
        components , 
        currentPage ,
    }; 

    return (
        <div>   
            <adminDataContext.Provider value={value}>
                {children}
            </adminDataContext.Provider>
        </div>
    )

}

export default AdminContext
