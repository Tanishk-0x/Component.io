import { useRef, useState } from "react";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { otpDataContext } from "../Context/OtpContext";
import { authDataContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Verify = () => {

    const navigate = useNavigate(); 

    const { SendOtp , sendingOtp , isOtpSend , VerifyOtp , verifyingOtp } = useSafeContext(otpDataContext);
    
    const { userData } = useSafeContext(authDataContext); 

    // ---------- UseStates ----------- 
    const [email , setEmail] = useState(userData?.email); 

    const [otp , setOtp] = useState(new Array(6).fill("")); 

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]); 

    // -------- Otp Handler ---------
    const HandleOtpChange = (value: any , index: number) => {
        if( isNaN(value) ){
            return ; 
        }

        const newOtp = [...otp] ; 
        newOtp[index] = value.substring(value.length -1 );
        setOtp(newOtp); 

        if( value && index < 5 ){
            inputRefs.current[index + 1]?.focus() ;
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    


    const HandleverifyOtp = async () => {
        const TempFinalOtp = otp.join(""); 
        
        const isVerified = await VerifyOtp(email , TempFinalOtp); 
        if( isVerified ){
            navigate('/'); 
        }
    }



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
        <div className="absolute border-2 border-gray-800 bg-neutral-900 w-[95%] h-120 md:h-124 md:w-120 shadow-sm md:shadow-sm shadow-green-400 rounded-2xl flex justify-start items-center flex-col">
            
            <h1 className="text-white text-[30px] md:text-[35px] font-bold mt-5">
                Email Verification 
            </h1>
            <p className="text-gray-400 text-[12px] md:text-[14px] text-center">
                Verify your email to get your free <span className="text-emerald-500 font-semibold">100</span> creadits   
            </p>

            <form className="w-full flex justify-center items-center flex-col mt-3">

                {/* Email */}
                <div className="w-[90%] mt-2">
                    <label className="text-emerald-400 text-sm font-medium">Email Address</label>
                    <input
                    onChange={(e) => {
                        e.preventDefault(); 
                        setEmail(e.target.value)
                    }}
                    name="email"
                    value={email}
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-900 transition"
                    />
                </div>

                {/* Send Otp */}
                { !isOtpSend && 
                <button onClick={(e) => {
                    e.preventDefault();
                    SendOtp(email); 
                }}
                className="mt-4 w-[90%] bg-emerald-500 text-black text-[18px] py-2.5 rounded-lg font-semibold text-base hover:bg-emerald-400 transition duration-150 active:scale-[0.98] cursor-pointer">
                    { sendingOtp ? 'Sending..' : 'Send Otp' }
                </button>
                }

                { isOtpSend && 
                <button 
                className="mt-4 w-[90%] bg-emerald-950 text-emerald-500 text-[18px] py-2.5 rounded-lg font-semibold text-base border border-emerald-500 transition duration-150 active:scale-[0.98] cursor-pointer">
                    Otp Send
                </button>
                }

                <div className="bg-neutral-800 h-0.5 mt-4 w-[90%] "></div>

                <p className="text-gray-300 text-[12px] md:text-[16px]">
                    Check you email, a verification code has been send
                </p>
                
                {/* ----- Otp Section ----- */}
                <div className="gap-3 w-[90%] h-15 mt-3 flex justify-center items-center">

                    <div className="flex gap-2">
                        {otp.map((digit, index) => (
                            <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            // 4. Correct ref assignment
                            ref={(el) => { inputRefs.current[index] = el; }}
                            onChange={(e) => HandleOtpChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="border border-emerald-400 rounded-lg h-10 w-10 md:h-12 md:w-12 bg-transparent text-white text-center outline-none"
                            />
                        ))}
                        </div>
                </div>

                {/* Verify Otp */}
                <button disabled={!isOtpSend}
                onClick={(e) => {
                    e.preventDefault(); 
                    HandleverifyOtp(); 
                }}
                className={
                    `${ isOtpSend ? 'border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black' : 'border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-black' } 
                    mt-4 w-[90%] border  text-[18px] py-2.5 rounded-lg font-semibold text-base  transition duration-150 active:scale-[0.98] cursor-pointer`
                }>
                    { verifyingOtp ? 'Verifying..' : 'Verify Otp' }
                </button>

            </form>

            <p className="text-neutral-400 text-center mt-4 text-md">
                Didn't receive a code? <span className="border-b border-emerald-500 font-medium hover:text-green-300 cursor-pointer"> Resend </span>
            </p>
            
        </div>

    </div>

  )
}

export default Verify
