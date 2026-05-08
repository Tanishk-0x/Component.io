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
    GetComponents: (page: number) => Promise<void> ; 
    currentPage: number ;   
    setCurrentPage: any ;   
    isGetting: boolean ; 
    savedCount: any ; 
    TopComponents: () => Promise<void> ; 
    gettingTop: boolean ;  
    topComponents: any ; 
    activeComponent: any ;  
    setActiveComponent: any ; 
    SearchComponent: (query: string) => Promise<void> ; 
    isSearching: boolean ; 
    isSearched: boolean ; 
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
    showPopup: boolean
    setShowPopup: any ;  
}; 


export interface AdminContextType {
    isGettingData: boolean ;  
    GetAdminDashboardData: (page: number) => Promise<void> ;  
    totalUsers: number ;  
    componentCount: any ;   
    requestedComponents: any ;    
    users: any ; 
    components: any ;
    currentPage: any ; 
    AddComponent: () => Promise<void> ;   
    formData: {
        title: string ; 
        category: string ; 
        prompt: string ; 
        code: string
    }; 
    setFormData: any ;   
    isAdding: boolean ;   
    added: boolean ; 
    UpdateComponent: (id: any , formData: object) => Promise<void> ;   
    isUpdating: boolean ;   
    updated: boolean ; 
    DeleteComponent: ( id: string ) => Promise<boolean | undefined>  ;   
    isDeleting: boolean ;  
    deleted: boolean ;   
    DeleteUser: ( id: string ) => Promise<void> ;  
    isDeletingUser: boolean ;
    userDeleted: boolean ; 
}; 


export interface ComponentCounts {
    users: number ; 
    components: {
        Total: number ; 
        Public: number ; 
        Created: number ; 
        Requested: number ; 
        Rejected: number
    }
}; 

export interface ReviewItemType {
  _id: string;
  title: string;
  category: string;
  code: string;
  prompt: string;
  status: string;
  viewCount: number;
  savedCount: number ; 
  likeCount: number;
  copyCount: number;
  modelUsed: string;
  author?: {
    _id: string ; 
    name: string ;
    email: string
  }
};


export interface ManagingComponentType {
    title: string ; 
    category: string ; 
    status: string ; 
    code: string ; 
    _id: string ; 
    author: any ; 
    prompt: any ; 
}; 

