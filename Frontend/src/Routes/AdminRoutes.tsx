import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { authDataContext } from "../Context/AuthContext"
import { useSafeContext } from "../Hooks/UseSafeContext"


const AdminRoutes = ({children}: {children: React.ReactNode}) => {

    const { userData , gettingUserDetails } = useSafeContext(authDataContext); 

    if( gettingUserDetails ){
        return <div className="h-screen w-screen bg-neutral-950 flex justify-center items-center">
            <Loader />
        </div>
    }

    if( !userData ){
        return <Navigate to='/login' />
    }

    if( userData.role !== 'ADMIN' ){
        return <Navigate to='/login' />
    }

    return children ; 
}

export default AdminRoutes
