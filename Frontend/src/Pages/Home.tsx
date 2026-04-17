import Navbar from "../Components/Navbar";
import { authDataContext } from "../Context/AuthContext"
import { useSafeContext } from "../Hooks/UseSafeContext"

const Home = () => {

  const { userData } = useSafeContext(authDataContext); 

  return (

    <div className="flex justify-center items-center w-screen h-full flex-col gap-2">

      <Navbar />

      <h2> Home Page! </h2>
      <p> {userData?._id} </p>
      <p> {userData?.name} </p>
      <p> {userData?.email} </p>
      <p> {userData?.credits} </p>
      
    </div>

  )
}

export default Home
