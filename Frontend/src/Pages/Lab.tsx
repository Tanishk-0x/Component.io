import { HiOutlineChip } from "react-icons/hi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiZap, FiLayout } from "react-icons/fi";
import { RxComponent2 } from "react-icons/rx";


const Lab = () => {

  return (

    <div className="min-h-screen w-full text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden bg-[#000502]">
      
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col items-center gap-8 md:gap-12">
        
            {/* --- Text Section --- */}
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-bold tracking-widest uppercase animate-pulse">
                    <HiOutlineChip className="text-base md:text-lg" />
                    AI Component Generator
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase">
                    Build With <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-green-400">AI</span>
                </h1>

                <p className="max-w-2xl text-slate-400 text-base md:text-lg font-medium leading-relaxed px-2">
                    Describe your React component in plain English. Preview, Save, 
                    and publish - <span className="text-emerald-500 hidden sm:inline">all in one seamless workspace.</span>
                    <span className="text-emerald-500 sm:hidden"> effortlessly.</span>
                </p>
            </div>

            {/* --- Main WorkSpace Section --- */}
            <div className="w-full flex flex-col gap-4 items-center">
            
                <div className="w-full flex justify-between items-center px-1">
                    <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm font-semibold">
                    <FiLayout className="xs:block" /> 
                    <span>Canvas Area</span>
                    </div>

                    <div className="group text-emerald-500 font-semibold flex items-center gap-2 bg-emerald-950/30 border-2 border-emerald-800/40 px-3 py-1.5 md:px-4 md:py-2 rounded-xl backdrop-blur-md transition-all hover:border-emerald-500/50">
                    <AiOutlineThunderbolt /> 
                    <span>Credits <span className="text-emerald-400 font-bold ml-1">100</span></span>
                    <button className="bg-emerald-900/50 h-6 w-6 rounded-lg flex justify-center items-center cursor-pointer hover:bg-emerald-800 transition-colors">
                        +
                    </button> 
                    </div>
                </div>

                {/* Input Section */}
                <div className="w-full relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition duration-1000"></div>
                    
                    <div className="relative">
                        {/* ---- TextArea ---- */}
                        <textarea 
                            placeholder="Describe your component (e.g. 'A modern card component')..."
                            className="w-full h-40 md:h-44 outline-none border border-emerald-800/50 rounded-2xl bg-[#00140a] backdrop-blur-xl text-slate-200 px-10 md:px-14 py-5 md:py-6 text-base md:text-lg font-medium placeholder:text-emerald-900/50 focus:border-emerald-500/40 transition-all resize-none shadow-2xl"
                        />

                        <AiOutlineThunderbolt className="absolute top-5 left-4 md:top-6 md:left-5 text-emerald-500 text-xl md:text-2xl" />

                        <div className="absolute bottom-5 left-6 hidden md:flex items-center gap-2">
                            <div className="flex gap-1">
                            <span className="px-2 py-1 bg-[#061a14] border border-emerald-900/30 rounded text-[10px] text-slate-500 font-bold">CTRL</span>
                            <span className="text-slate-600 text-xs">+</span>
                            <span className="px-2 py-1 bg-[#061a14] border border-emerald-900/30 rounded text-[10px] text-slate-500 font-bold">ENTER</span>
                            </div>
                            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">to generate</span>
                        </div>

                        <button className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-5 py-2 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer">
                            <FiZap className="fill-current hidden xs:block" />
                            Generate
                        </button>

                    </div>
                </div>

                {/* --- Output Section --- */}
                <div className="w-full h-125 md:min-h-150 mt-2 flex flex-col items-center border-2 border-emerald-800/40 rounded-2xl bg-[#000a05]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
  
                    <div className="w-full h-16 border-b border-emerald-900/40 px-4 md:px-6 flex justify-between items-center bg-emerald-950/20">
                        
                        <div className="text-emerald-600 text-sm md:text-2xl font-bold flex items-center gap-2">
                        <RxComponent2 className="text-2xl md:text-3xl" />
                        <span className="tracking-tight uppercase">Generated Component</span>
                        </div>

                        <div className="bg-emerald-950/80 p-1 rounded-xl border border-emerald-800/50 flex items-center gap-1">
                            <button className="px-4 py-1.5 rounded-lg bg-emerald-600 text-emerald-950 text-sm font-bold transition-all shadow-lg cursor-pointer">
                                Code
                            </button>

                            <button className="px-4 py-1.5 rounded-lg text-emerald-600 hover:bg-emerald-900/30 text-sm font-semibold transition-all cursor-pointer">
                                Preview
                            </button>
                        </div>

                    </div>

                    {/* Output */}
                    <div className="w-full flex-1 relative bg-[#00140a] flex justify-center items-center overflow-hidden">
                        
                        <div className="relative z-10 w-full h-full flex justify-center items-center p-6 md:p-4">
                        
                            {/* --- Main Display Section --- */}
                            <div className="w-full h-full flex justify-center items-center border-2 border-emerald-950/30 rounded-xl ">
                                <p className="text-emerald-600 font-mono text-sm">
                                Preview!
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

  );
};

export default Lab;