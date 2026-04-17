import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Home from "./Pages/Home";
import Verify from "./Pages/Verify";

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/' ,
      element: <Home />
    }, 
    {
      path: '/signup' ,
      element: <Signup />
    },
    {
      path: '/login' , 
      element: <Login />
    },
    {
      path: '/verify' ,
      element: <Verify />
    }
  ]); 

  return (

    <>
      <RouterProvider router={router}/>

      <Toaster />
    </>

  )
}

export default App