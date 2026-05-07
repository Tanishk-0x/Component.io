import { authDataContext } from "../Context/AuthContext"
import { useSafeContext } from "../Hooks/UseSafeContext"
import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader";

const ProtectedRoutes = ({ children }: {children: React.ReactNode}) => {

    const { userData , gettingUserDetails } = useSafeContext(authDataContext); 

    if( gettingUserDetails ){
        return <div className="h-screen w-screen bg-neutral-950 flex justify-center items-center">
            <Loader />
        </div>
    }

    if( !userData ){
        return <Navigate to='/' />
    }

    return children ; 
}

export default ProtectedRoutes
