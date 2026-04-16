import { useContext, type Context } from "react"

export function useSafeContext <T>(ContextObject: Context<T | null>) {
    
    const context = useContext(ContextObject); 

    if( !context ){
        throw new Error('UseSafeContext Error!');
    }

    return context ; 
}