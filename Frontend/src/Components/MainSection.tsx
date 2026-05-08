import { useNavigate } from 'react-router-dom'
import { PiSparkle } from "react-icons/pi";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useSafeContext } from '../Hooks/UseSafeContext';
import { authDataContext } from '../Context/AuthContext';

const MainSection = () => {
    
    const navigate = useNavigate(); 

    const { userData } = useSafeContext(authDataContext); 

  return (
    <>
      <section className="w-full flex justify-center items-center flex-col md:flex-row gap-10 md:gap-1 max-w-7xl px-4 md:px-6 pt-16 md:pt-24 pb-20 md:pb-24 relative">
          
          <div className="hidden sm:block absolute top-0 right-0 p-4 text-[10px] opacity-40 font-bold uppercase tracking-widest text-right">
            [ Email: {userData?.email || 'developer@dev'} ] <br /> [ Name: {userData?.name || 'developer'} ] <br /> { userData?.isVerified ? '[ Verified ]' : '[ Not Verified ]' }
          </div>

          {/* --------- SIDE TEXT SECTION ---------- */}
          <div className="flex flex-col items-start gap-3 w-full md:w-[50%]">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-500 animate-blink"></div>
                 <span className="text-[10px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] uppercase">AI POWERED COMPONENT LIBRARY</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-sans text-white uppercase leading-tight md:leading-none">
                Create <span className="text-[#10b981]">Component</span>
                <br /> In <span className="text-[#10b981]">Minute</span>
              </h1>
            </div>

            <div className="w-full max-w-xl p-6 md:p-8 glass-panel border-l-4 border-emerald-500 relative">
              <div className="absolute top-0 right-0 w-8 h-8 corner-br rotate-180"></div>
              <p className="text-sm md:text-lg leading-relaxed opacity-70">
                Component.io is a AI Powered component library, You can generate components and use via Installing npx or copy paste.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
               <button onClick={() => navigate('/components')}
               className="w-full flex justify-center items-center flex-row gap-1 cursor-pointer sm:w-auto bg-[#10b981] text-black px-8 md:px-12 py-4 md:py-5 font-semibold text-[16px] md:text-[18px] transition-all rounded-lg active:scale-95">
                  COMPONENTS <IoArrowForwardOutline className="text-[20px] font-semibold"/>
               </button>
               <button onClick={() => navigate('/lab')}
                className="w-full flex justify-center items-center flex-row gap-1 cursor-pointer sm:w-auto border border-[#10b981] text-[#10b981] px-8 md:px-12 py-4 md:py-5 font-bold uppercase rounded-lg text-sm hover:bg-[#10b98110] active:scale-95 transition-all">
                  <PiSparkle className="text-[20px] font-semibold"/> AI_LAB
               </button>
            </div>
          </div>

          {/* ---------- SIDE IMAGE SECTION ---------- */}
          <div className="w-full md:w-[50%] flex justify-center md:justify-end items-center mt-10 md:mt-0">
            <img 
              src="./side22.png"
              alt="Component Interface"
              className="w-full max-w-87.5 md:max-w-none md:w-[80%] h-auto object-cover drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]" 
            />
          </div>

        </section>
    </>
  )
}

export default MainSection
