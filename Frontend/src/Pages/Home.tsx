import { authDataContext } from "../Context/AuthContext"
import { useSafeContext } from "../Hooks/UseSafeContext"

const Home = () => {

  const { userData } = useSafeContext(authDataContext); 

  return (

    <div>
      <h2> Home Page! </h2>
      <p> {userData?._id} </p>
      <p> {userData?.name} </p>
      <p> {userData?.email} </p>
      <p> {userData?.credits} </p>
    </div>

  )
}

export default Home
