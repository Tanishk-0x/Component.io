import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Home from "./Pages/Home";
import Verify from "./Pages/Verify";
import Lab from "./Pages/Lab";
import Components from "./Pages/Components";
import Profile from "./Pages/Profile";
import Top from "./Pages/Top";
import ComponentCards from "./Pages/ComponentCards";
import Admin from "./Pages/Admin";
import AddComponent from "./Pages/AddComponent";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import Demo from "./Pages/Demo";

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
      element: <ProtectedRoutes> <Verify /> </ProtectedRoutes> 
    },
    {
      path: '/lab' ,
      element: <ProtectedRoutes> <Lab /> </ProtectedRoutes> 
    },
    {
      path: '/components' ,
      element: <Components />
    },
    {
      path: '/profile' ,
      element: <ProtectedRoutes> <Profile /> </ProtectedRoutes> 
    },
    {
      path: '/top' ,
      element: <Top />
    },
    {
      path: '/componentcard' ,
      element: <ComponentCards />
    },
    {
      path: '/npx-demo' ,
      element: <Demo />
    },
    {
      path: '/admin' ,
      element: <AdminRoutes> <Admin /> </AdminRoutes>
    },
    {
      path: '/addcomponent' ,
      element: <AdminRoutes> <AddComponent /> </AdminRoutes>
    },
  ]); 

  return (

    <>
      <RouterProvider router={router}/>

      <Toaster />
    </>

  )
}

export default App