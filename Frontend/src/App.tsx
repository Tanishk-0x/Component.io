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
    },
    {
      path: '/lab' ,
      element: <Lab />
    },
    {
      path: '/components' ,
      element: <Components />
    },
    {
      path: '/profile' ,
      element: <Profile />
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
      path: '/admin' ,
      element: <Admin />
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