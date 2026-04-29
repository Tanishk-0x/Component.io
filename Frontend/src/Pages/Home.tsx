import Navbar from "../Components/Navbar";
import { authDataContext } from "../Context/AuthContext";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { MdDashboard } from "react-icons/md";
import { PiCardsFill } from "react-icons/pi";
import { SiHackthebox } from "react-icons/si";
import { IoAddCircle } from "react-icons/io5";
import { PiSparkle } from "react-icons/pi";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const { userData } = useSafeContext(authDataContext);
  const navigate = useNavigate(); 

  return (

    <div className="w-screen min-h-screen bg-[#020403] text-[#10b981] flex flex-col justify-start items-center selection:bg-[#10b981] selection:text-black overflow-x-hidden p-2 md:p-4">

      {/* --- BACKGROUND SCAN LINE --- */}
      <div className="scan-line"></div>

      
      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* ----- Navbar ----- */}
        <Navbar />

        {/* --- MAIN SECTION --- */}
        <section className="w-full flex justify-center items-center flex-col md:flex-row gap-10 md:gap-1 max-w-7xl px-4 md:px-6 pt-16 md:pt-24 pb-20 md:pb-24 relative">
          
          <div className="hidden sm:block absolute top-0 right-0 p-4 text-[10px] opacity-40 font-bold uppercase tracking-widest text-right">
            [ Email: {userData?.email || 'developer@dev'} ] <br /> [ Name: {userData?.name || 'developer'} ] <br /> [ Verified ]
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
                Component.io is a Ai Powered component library, Where you can generate components and just copy paste and use it.
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


        {/* ---------- SELECTOR SECTION ---------- */}
        <div className="flex flex-col justify-center items-center w-full px-4 md:px-6">

          <div className="flex text-center flex-col max-w-2xl mx-auto">
            <p className="text-[28px] md:text-[36px] lg:text-[40px] text-white font-semibold leading-tight">
              The right template for your <br className="hidden md:block" />
              <span className="text-emerald-500 md:ml-2">
                specific use case
              </span>
            </p>
            <p className="text-[14px] md:text-[16px] text-gray-400 mt-4">
              A carefully curated collection of gorgeous, fully functional templates.
            </p>
          </div>

          <div className="w-full mt-8 md:mt-10 flex flex-wrap justify-center items-center gap-3 md:gap-6">
            <button className="w-full sm:w-auto bg-emerald-950 gap-2 text-white flex flex-row justify-center items-center px-4 md:px-5 py-3 md:py-4 font-semibold text-[14px] md:text-[16px] rounded-lg border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer">
              <MdDashboard className="text-emerald-500 text-[18px] md:text-[20px]"/> Dashboard 
            </button>

            <button className="w-full sm:w-auto bg-emerald-950 gap-2 text-white flex flex-row justify-center items-center px-4 md:px-5 py-3 md:py-4 font-semibold text-[14px] md:text-[16px] rounded-lg border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer">
              <SiHackthebox className="text-emerald-500 text-[18px] md:text-[20px]"/> Landing Page 
            </button>

            <button className="w-full sm:w-auto bg-emerald-950 gap-2 text-white flex flex-row justify-center items-center px-4 md:px-5 py-3 md:py-4 font-semibold text-[14px] md:text-[16px] rounded-lg border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer">
              <PiCardsFill className="text-emerald-500 text-[18px] md:text-[20px]"/> Modern Cards 
            </button>

            <button className="w-full sm:w-auto bg-emerald-950 gap-2 outline-dotted outline-emerald-500 outline-2 outline-offset-2 text-white flex flex-row justify-center items-center px-4 md:px-5 py-3 md:py-4 font-semibold text-[14px] md:text-[16px] rounded-lg border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer">
              <IoAddCircle className="text-emerald-500 text-[18px] md:text-[20px]"/> Much More 
            </button>
          </div>

          <div className="bg-emerald-950/50 w-full max-w-5xl mt-10 md:mt-14 border border-emerald-800/60 rounded-2xl h-75 md:h-135 flex justify-center items-center text-emerald-800 font-black text-2xl md:text-5xl tracking-widest shadow-2xl">
            SCREEN!
          </div>

        </div>


        {/* --------- CARDS SECTION --------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto p-4 mt-20 md:mt-32 mb-20">
        
          <div className="flex flex-col bg-[#0a0f0d] border border-emerald-900/30 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors group">
            <div className="p-6 grow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">Lightning Fast</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                Experience zero-latency rendering with our highly optimized edge network architecture.
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-[#0a0f0d] border border-emerald-900/30 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors group">
            <div className="p-6 grow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">Secure Vault</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                Enterprise-grade encryption ensures your component data remains completely private.
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-[#0a0f0d] border border-emerald-900/30 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors group">
            <div className="p-6 grow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">Database Sync</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                Seamlessly connect your UI states directly to your preferred backend databases.
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-[#0a0f0d] border border-emerald-900/30 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors group">
            <div className="p-6 grow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">Clean Code</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                Export production-ready, highly readable React code without any bloat or dependencies.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

    
  );
};

export default Home;