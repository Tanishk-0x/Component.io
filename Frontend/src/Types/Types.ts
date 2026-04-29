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

    Logout: () => Promise<boolean>;
    isLogout: boolean; 

    GetUserDetails: () => Promise<void>; 
    gettingUserDetails: boolean;
}


export interface OtpContextType {
    SendOtp: (email: string) => Promise<void>;
    sendingOtp: boolean;
    isOtpSend: boolean; 
    VerifyOtp: (email: string , otp: string) => Promise<boolean | undefined> ; 
    verifyingOtp: boolean;  
}

export interface ComponentContextType {
    ResolveComponent: (prompt: string , model: string) => Promise<void> ; 
    componentData: any ;
    isLoading: boolean ; 
    errorMessage: any ;
    source: any ; 
    isSaving: boolean ;
    SaveComponent: (CompId: string) => Promise<void> ; 
    isSaved: boolean ; 
    components: any ; 
    LikeComponent: (Id: string) => Promise<void> ; 
    isLiked: boolean ; 
    likesCount: any ; 
    RemoveSaved: (Id: string) => Promise<void> ;
    isRemoving: boolean ;   
    removed: boolean ;  
}

export interface PublishContextType {
    RequestToPublish: (Id: string) => Promise<void> ; 
    requested: boolean ; 
    isRequesting: boolean ; 
    AcceptRequest: (Id: any) => Promise<void> ; 
    isAccepting: boolean ; 
    accepted: boolean ; 
    RejectRequest: (Id: string) => Promise<void> ; 
    isRejecting: boolean ;  
    rejected: boolean ;  
}; 


export interface AdminContextType {
    isGettingData: boolean ;  
    GetAdminDashboardData: (page: number) => Promise<void> ;  
    totalUsers: number ;  
    componentCount: object ;   
    requestedComponents: any ;    
    users: any ; 
    components: any ;
    currentPage: any ; 
}; 