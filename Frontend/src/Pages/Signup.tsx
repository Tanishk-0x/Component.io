import { FcGoogle } from "react-icons/fc";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { useState } from "react";
import { authDataContext } from "../Context/AuthContext";

const Signup = () => {

    const { Signup , signupLoading } = useSafeContext(authDataContext); 

    // --------- FormData --------- 
    const [ formData , setFormData ] = useState({
        name: '',
        email: '',
        password: ''
    });

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
        <div className="absolute border-2 border-gray-800 bg-neutral-900 w-[95%] h-135 md:h-135 md:w-120 shadow-sm md:shadow-sm shadow-green-400 rounded-2xl flex justify-start items-center flex-col">
            
            <h1 className="text-white text-[30px] md:text-[35px] font-bold mt-5">
                Create Your Account 
            </h1>
            <p className="text-gray-400 text-[12px] md:text-[14px]">
                Build Stunning Components With <span className="text-green-400"> Component.io </span> 
            </p>

            <form className="w-full flex justify-center items-center flex-col mt-3">
            
                {/* UserName */}
                <div className="w-[90%]">
                    <label className="text-neutral-400 text-sm font-medium">Username</label>
                    <input
                    onChange={(e) => {
                        setFormData({ ...formData , name: e.target.value})
                    }}
                    name="name"
                    value={formData.name}
                    type="text"
                    placeholder="E.g., Name"
                    className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-900 transition"
                    />
                </div>

                {/* Email */}
                <div className="w-[90%] mt-2">
                    <label className="text-neutral-400 text-sm font-medium">Email Address</label>
                    <input
                    onChange={(e) => {
                        setFormData({ ...formData , email: e.target.value})
                    }}
                    name="email"
                    value={formData.email}
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-900 transition"
                    />
                </div>

                {/* Password */}
                <div className="w-[90%] mt-2">
                    <label className="text-neutral-400 text-sm font-medium">Password</label>
                    <input
                    onChange={(e) => {
                        setFormData({ ...formData , password: e.target.value})
                    }}
                    name="password"
                    value={formData.password}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-900 transition pr-10"
                    />
                </div>

                {/* Create Account Button */}
                <button
                onClick={(e) => {
                    e.preventDefault(); 
                    Signup(formData); 
                }}
                className="mt-6 w-[90%] bg-green-500 text-black text-[18px] py-3 rounded-lg font-semibold text-base hover:bg-green-400 transition duration-150 active:scale-[0.98] cursor-pointer">
                    { signupLoading ? 'Loading..' : 'Create Account' }
                </button>
                
                {/* Google Button */}
                <button
                className="text-[18px] mt-3 w-[90%] bg-white text-neutral-900 py-3 rounded-lg font-semibold text-base flex items-center justify-center hover:bg-neutral-100 transition duration-150 active:scale-[0.98] cursor-pointer">
                    <FcGoogle />
                    Sign in with Google
                </button>
            </form>

            <p className="text-neutral-400 text-center mt-4 text-md">
            Already have an account? <span className="text-green-400 font-medium hover:text-green-300 cursor-pointer"> Login </span>
            </p>
            
        </div>

    </div>

  )
}

export default Signup
