import type { ReactNode } from "react";

export interface MainContextProps {
    children: ReactNode;
}


export interface FormDataType {
    name?: string;
    email: string;
    password: string;
}


export interface AuthContextType {
    Signup: (formData: FormDataType) => Promise<void>;
    signupLoading: boolean;
    Login: (formData: FormDataType) => Promise<void>;
    loginLoading: boolean;
}