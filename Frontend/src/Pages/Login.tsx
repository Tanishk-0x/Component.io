import { useSafeContext } from "../Hooks/UseSafeContext";
import { authDataContext } from "../Context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate(); 

    const { Login , loginLoading } = useSafeContext(authDataContext); 

    const [formData , setFormData] = useState({
        email: '',
        password: ''
    });


    const HandleLogin = async () => {
        const isSuccess = await Login(formData);
        if( isSuccess ){
            navigate('/');
        }
    }; 

  return (

    <div className="bg-neutral-950 relative h-screen w-screen flex justify-center items-center flex-col ">
        
        {/* --- Cover Image --- */}
        <div className="absolute top-0 w-full h-64 flex justify-center items-center overflow-hidden">
            <img 
            src="./cover.png" 
            alt="Banner"
            className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-neutral-950"></div>
        </div>

        {/* --- Main Form --- */}
        <div className="absolute border-2 border-gray-800 bg-neutral-900 w-[95%] h-120 md:h-120 md:w-120 shadow-sm md:shadow-sm shadow-emerald-400 rounded-2xl flex justify-start items-center flex-col">
            
            <h1 className="text-white text-[30px] md:text-[35px] font-bold mt-5">
                Create Your Account 
            </h1>
            <p className="text-gray-400 text-[12px] md:text-[14px]">
                Build Stunning Components With <span className="text-emerald-400"> Component.io </span> 
            </p>

            <form className="w-full flex justify-center items-center flex-col mt-3">

                {/* Email */}
                <div className="w-[90%] mt-2">
                    <label className="text-emerald-400 text-sm font-medium">Email Address</label>
                    <input
                    onChange={(e) => {
                        setFormData({...formData , email: e.target.value});
                    }}
                    name="email"
                    value={formData.email}
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-transparent border border-emerald-600 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-900 transition"
                    />
                </div>

                {/* Password */}
                <div className="w-[90%] mt-2">
                    <label className="text-emerald-400 text-sm font-medium">Password</label>
                    <input
                    onChange={(e) => {
                        setFormData({...formData , password: e.target.value});
                    }}
                    name="password"
                    value={formData.password}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent border border-emerald-600 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-900 transition pr-10"
                    />
                </div>

                {/* Login Button */}
                <button 
                onClick={(e) => {
                    e.preventDefault(); 
                    HandleLogin();  
                }}
                className="mt-6 w-[90%] bg-emerald-400 text-black text-[18px] py-3 rounded-lg font-semibold text-base hover:bg-emerald-500 transition duration-150 active:scale-[0.98] cursor-pointer">
                    { loginLoading ? 'Loading..' : 'Login' }
                </button>
                
                <div className="mt-3 w-[90%] py-3 flex items-center justify-center rounded-lg bg-neutral-900/40 border border-neutral-800 border-dashed">
                    <p className="font-mono text-[13px] sm:text-sm flex items-center gap-2 text-neutral-400">
                        <span className="text-emerald-500 font-bold">❯</span>
                        <span className="tracking-wide">Build Smarter with Component.io</span>
                        {/* Blinking Cursor Animation */}
                        <span className="w-1.5 h-4 bg-emerald-400 animate-[pulse_1s_ease-in-out_infinite]"></span>
                    </p>
                </div>

            </form>

            <p className="text-neutral-400 text-center mt-4 text-md">
            Don't have an account? <span onClick={() => navigate('/signup')} className="text-emerald-400 font-medium hover:text-emerald-300 cursor-pointer"> Signup </span>
            </p>
            
        </div>

    </div>

  )
}

export default Login
