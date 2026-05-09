import { createContext, useState } from "react"
import type { AdminContextType, ComponentCounts, MainContextProps } from "../Types/Types";
import toast from "react-hot-toast";
import axios from "axios";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { mainUrlContext } from "./MainContext";
import { ExtractCookie } from "../Utils/Cookie";


// Dummy Code 
const dummyCode = `
import React from 'react';

const AddComponentCard = () => {
  return (
    <div className="min-h-screen bg-[#050a09] flex items-center justify-center p-8 font-sans">
      
      <button className="group relative w-72 h-80 bg-[#0a1210] rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-6 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:-translate-y-2 overflow-hidden cursor-pointer">
        
        {/* Ambient Hover Glow */}
        <div className="absolute inset-0 bg-linear-to-b from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="absolute -bottom-10 inset-x-0 h-20 bg-emerald-500/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Floating Icon Container */}
        <div className="relative z-10 w-20 h-20 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all duration-500 group-hover:scale-110 shadow-lg shadow-black/50">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 transition-colors duration-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>

        {/* Typography */}
        <div className="text-center relative z-10 px-6">
          <h3 className="text-lg font-bold text-slate-200 tracking-wide mb-2 group-hover:text-emerald-400 transition-colors duration-500">
            Add Component
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-emerald-100/60 transition-colors duration-500">
            Deploy a new UI module to your library workspace.
          </p>
        </div>

        {/* Decorative Corner Borders on Hover */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-3xl -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tr-3xl translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-bl-3xl -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-3xl translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>

      </button>
      
    </div>
  );
};

export default AddComponentCard;
` ; 


// Creating Context
export const adminDataContext = createContext<AdminContextType | null>(null); 

const AdminContext = ({children}: MainContextProps) => {

    const { serverUrl } = useSafeContext(mainUrlContext); 

    // --------- UseStates ------------
    const [isGettingData , setIsGettingData] = useState(false); 
    const [totalUsers , setTotalUsers] = useState(0); 
    const [componentCount , setComponentCount] = useState<ComponentCounts | null>(null); 
    const [requestedComponents , setRequestedComponents] = useState<any[]>([]); 
    const [users , setUsers] = useState<any[]>([]); 
    const [components , setComponents] = useState<any[]>([]); 
    const [currentPage ,  setCurrentPage] = useState(0); 
    const [maxPage , setMaxPage] = useState(1); 

    const [isAdding , setIsAdding] = useState(false); 
    const [added , setAdded] = useState(false); 
    const [formData , setFormData] = useState({
        title: '' , 
        category: '' , 
        prompt: '' , 
        code: dummyCode 
    }); 

    const [isUpdating , setIsUpdating] = useState(false); 
    const [updated , setUpdated] = useState(false); 
    const [isDeleting , setIsDeleting] = useState(false); 
    const [deleted , setDeleted] = useState(false); 
    const [isDeletingUser , setIsDeletingUser] = useState(false); 
    const [userDeleted , setUserDeleted] = useState(false); 

    // ---------- Handlers -------------
    const GetAdminDashboardData = async (page: number) => {
        if( isGettingData ){
            return ; 
        }
        if( currentPage >= maxPage ){
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
                const data = res.data.data ; 

                // Setting States
                setTotalUsers(data.counts.users);
                setComponentCount(data.counts.components) ; 

                if(page === 1){
                    setRequestedComponents(data.lists.requests);
                    setUsers(data.lists.users);
                    setComponents(data.lists.components);
                }

                else{
                    setRequestedComponents((prev) => ([...prev , ...data.lists.requests]));
                    setUsers((prev) => ([...prev , ...data.lists.users]));
                    setComponents((prev) => ([...prev , ...data.lists.components]));
                }

                setCurrentPage(data.pagination.currentPage);
                setMaxPage(data.pagination.maxPage); 
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


    // ---------- Handlers -------------
    const AddComponent = async () => {

        if( isAdding ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsAdding(true); 

        try {
            const res = await axios.post( serverUrl + '/admin/addcomponent' , 
                { formData } , 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                toast.success("Component Added!"); 
                setAdded(true); 
                setFormData({
                  title: '' , 
                  category: '' , 
                  prompt: '' , 
                  code: ''
                });
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("Adding Component Error!"); 
            console.dir(error);
        }

        finally{
            setIsAdding(false); 
        }
    }
    

    // --------- Handlers --------------
    const UpdateComponent = async ( id: string , formData: object ) => {

        if( isUpdating ){
            return ; 
        }
        if( updated ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsUpdating(true); 

        try {
            const res = await axios.post( serverUrl + `/admin/updatecomponent/${id}` ,
                { formData } , 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true 
                }
            ); 

            if( res.data.success ){
                toast.success("Component Updated!"); 
                setUpdated(true); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("Updating Component Error!"); 
            console.dir(error);
        }

        finally{
            setIsUpdating(false); 
        }
    }

    // --------- Handlers --------------
    const DeleteComponent = async ( id: string ) => {
        if( isDeleting ){
            return false; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsDeleting(true); 

        try {
            const res = await axios.post( serverUrl + `/admin/deletecomponent/${id}` , 
                {} , 
                {
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    },
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                toast.success("Component Deleted!"); 
                setDeleted(true); 
                return true ; 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("Deleting Component Error!"); 
            console.dir(error);
            return false ; 
        }

        finally{
            setIsDeleting(false); 
        }
    }

    // ---------- Handlers --------------
    const DeleteUser = async ( id: string ) => {

        if( isDeletingUser ){
            return ; 
        }
        const CSRF_TOKEN = ExtractCookie(); 
        setIsDeletingUser(true); 

        try {
            const res = await axios.post( serverUrl + `/admin/deleteuser/${id}` , 
                {} , 
                { 
                    headers: {
                        'x-csrf-token' : CSRF_TOKEN
                    }, 
                    withCredentials: true
                }
            ); 

            if( res.data.success ){
                toast.success("User Deleted!"); 
                setUserDeleted(true); 
            }
        }
        
        catch (error: any) {
            const errorMessage = error?.response?.data?.message ; 
            toast.error(errorMessage); 
            console.log("Deleting Component Error!"); 
            console.dir(error);
        }

        finally{
            setIsDeletingUser(false); 
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
        AddComponent , 
        formData , 
        setFormData , 
        isAdding , 
        added , 
        UpdateComponent , 
        isUpdating , 
        updated , 
        DeleteComponent , 
        isDeleting , 
        deleted , 
        DeleteUser , 
        isDeletingUser , 
        userDeleted , 
        maxPage , 
        setCurrentPage , 
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
