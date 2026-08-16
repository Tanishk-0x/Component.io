import { createContext } from "react"
import type{ ReactNode } from "react";

interface MainContextType {
    serverUrl: string;
}

interface MainContextProps {
    children: ReactNode; 
}

// Creating Context 
export const mainUrlContext = createContext <MainContextType | null>(null); 

const MainContext = ({ children }: MainContextProps ) => {

    const serverUrl = '/api' ; 

    // Defining Values 
    const value = {
        serverUrl
    }; 

    return (
        <div>
            {/* Providing Context  */}
            <mainUrlContext.Provider value={value}>
                {children}
            </mainUrlContext.Provider>
        </div>
    )
}

export default MainContext
