import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface MainContextProps {
    children: ReactNode;
}


export interface FormDataType {
    name?: string;
    email: string;
    password: string;
}


export interface AuthContextType {
    Signup: (formData: FormDataType) => Promise<boolean>;
    signupLoading: boolean;

    Login: (formData: FormDataType) => Promise<boolean>;
    loginLoading: boolean;

    userData: any; 
    setUserData: Dispatch<SetStateAction<any>> ; 
}