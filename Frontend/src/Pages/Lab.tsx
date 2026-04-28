import { useState } from "react";
import { HiOutlineChip } from "react-icons/hi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiZap, FiLayout } from "react-icons/fi";
import { RxComponent2 } from "react-icons/rx";
import { TbFaceIdError } from "react-icons/tb";
import { useSafeContext } from "../Hooks/UseSafeContext";
import { componentDataContext } from "../Context/CompContext";
import { authDataContext } from "../Context/AuthContext";
import Loader from "../Components/Loader";
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview 
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { RiSaveLine } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { SiGooglegemini } from "react-icons/si";
import { BsNvidia } from "react-icons/bs";
import { SiMeta } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdPublish } from "react-icons/md";


const Lab = () => {

    const navigate = useNavigate(); 

    // ----- Contexts -----
    const { 
        ResolveComponent,
        isLoading,
        errorMessage , 
        componentData , 
        source , 
        isSaved , 
        isSaving , 
        SaveComponent , 
    } = useSafeContext(componentDataContext);
    const { userData } = useSafeContext(authDataContext);

    // ----- UseStates -----
    const [prompt, setPrompt] = useState("");
    const [showCode, setShowCode] = useState(false);
    const [showPreview, setShowPreview] = useState(true);

    
    // ------ Swap Models ---------
    const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash-lite");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const AI_MODELS = [
        { id: "llama-3.3-70b-versatile", name: "Llama 3 (Meta)", icon: <SiMeta /> },
        { id: "gemini-2.5-flash-lite", name: "Flash (Gemini)", icon: <SiGooglegemini /> },
        { id: "nvidia/nemotron-3-super-120b-a12b:free", name: "Nemotron (NVIDIA)", icon: <BsNvidia /> },
    ];

  return (

    <div className="min-h-screen w-full text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden bg-[#000502]">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col items-center gap-8 md:gap-12">
        
        {/* --- Main Text Section --- */}
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


        {/* --- Main Working Section --- */}
        <div className="w-full flex flex-col gap-4 items-center">
          
            <div className="w-full flex justify-between items-center px-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm font-semibold">
                    <FiLayout className="xs:block" /> 
                    <span>Canvas Area</span>
                </div>

                <div className="group text-emerald-500 font-semibold flex items-center gap-2 bg-emerald-950/30 border-2 border-emerald-800/40 px-3 py-1.5 md:px-4 md:py-2 rounded-xl backdrop-blur-md transition-all hover:border-emerald-500/50">
                    <AiOutlineThunderbolt /> 
                    <span>Credits <span className="text-emerald-400 font-bold ml-1"> {userData?.credits || 0} </span></span>
                    <button className="bg-emerald-900/50 h-6 w-6 rounded-lg flex justify-center items-center cursor-pointer hover:bg-emerald-800 transition-colors">
                        +
                    </button> 
                </div>
            </div>

            {/* ----- Input Section ----- */}
            <div className="w-full relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition duration-1000"></div>
                
                <div className="relative">
                    <textarea 
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
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

                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex justify-center items-center flex-row gap-2">
                        
                        {/* --------- Model Selection ------- */}
                        <div className="w-full flex justify-end relative z-20">
                            <div className="relative w-full max-w-62.5">
                                {/* Selected Value Button */}
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full flex items-center justify-between outline-none border-2 border-emerald-800/50 rounded-xl bg-[#00140a]  text-emerald-100 backdrop-blur-xl px-4 py-2.5 text-sm font-medium hover:border-emerald-500/40 gap-2 transition-all shadow-lg cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{AI_MODELS.find(m => m.id === selectedModel)?.icon}</span>
                                        <span>{AI_MODELS.find(m => m.id === selectedModel)?.name}</span>
                                    </div>
                                    <span className={`text-[10px] text-emerald-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>

                                {/* Dropdown Options List */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#00140a] border border-emerald-800/50 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col z-50 backdrop-blur-xl animate-fade-in-down">
                                        {AI_MODELS.map((model) => (
                                            <button
                                                key={model.id}
                                                onClick={() => {
                                                    setSelectedModel(model.id);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all text-left w-full hover:bg-emerald-900/30 ${selectedModel === model.id ? 'text-emerald-400 bg-emerald-950/20' : 'text-slate-300'}`}
                                            >
                                                <span>{model.icon}</span>
                                                <span>{model.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => ResolveComponent(prompt , selectedModel)}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-5 py-2 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                        >
                            <FiZap className="fill-current hidden xs:block" />
                            { isLoading ? 'Loading..' : 'Generate' }
                        </button>
                    </div>

                    
                </div>

            </div>

            {/* ----- Output Section ----- */}
            { componentData && !isLoading && 
            <div className="w-full h-137.5 md:h-162.5 mt-2 flex flex-col items-center border-2 border-emerald-800/40 rounded-2xl bg-[#000a05]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            
                {/* ------ Tabs ------ */}
                <div className="w-full h-16 border-b border-emerald-900/40 px-4 md:px-6 flex justify-between items-center bg-emerald-950/20">
                    <div className="text-emerald-600 text-sm md:text-2xl font-bold flex items-center gap-2">
                        <RxComponent2 className="text-2xl md:text-3xl" />
                        <span className="tracking-tight uppercase"> {componentData?.title || 'Generated Component'} </span>
                    </div>

                    <div className="bg-emerald-950/80 p-1 rounded-xl border border-emerald-800/50 flex items-center gap-1">
                        <button 
                        onClick={() => { setShowPreview(false); setShowCode(true); }}
                        className={`px-4 py-1.5 rounded-lg text-emerald-600 text-sm font-bold transition-all shadow-lg cursor-pointer ${showCode && 'bg-emerald-600 text-emerald-950'}`}
                        >
                        Code
                        </button>

                        <button 
                        onClick={() => { setShowCode(false); setShowPreview(true); }}
                        className={`px-4 py-1.5 rounded-lg text-emerald-600 text-sm font-bold transition-all shadow-lg cursor-pointer ${showPreview && 'bg-emerald-600 text-emerald-950'}`}
                        >
                        Preview
                        </button>
                    </div>
                </div>

                {/* ------- Output Canvas Area ------- */}
                {/* ------------ Sandpack ------------ */}
                <div className="w-full flex-1 flex flex-col overflow-hidden custom-sandpack"> 
              
                <SandpackProvider
                    template="react"
                    theme={sandpackDark}
                    files={{ "/App.js": componentData?.code || '<h2>Component.io!</h2>' }}
                    options={{
                    externalResources: ["https://cdn.tailwindcss.com"],
                    }}
                    className="h-full flex-1 flex flex-col"
                >
                    <SandpackLayout 
                    className="h-full w-full border-none bg-transparent" 
                    >
                        {showCode && (
                            <SandpackCodeEditor 
                            showLineNumbers 
                            showTabs={false}
                            wrapContent={false}
                            className="h-full w-full"
                            />
                        )}

                        {showPreview && (
                            <SandpackPreview 
                            showRefreshButton={true}
                            showOpenInCodeSandbox={false}
                            className="h-full w-full"
                            />
                        )}
                    </SandpackLayout>

                </SandpackProvider>

                </div>

            </div>
            }

            {/* ------ Options Button ----- */}
            { !isLoading && componentData && 
            <div className="bg-[#001008] rounded-lg w-full h-25 flex justify-between items-center px-4">
    
                <div className="h-full flex flex-row gap-2 sm:gap-4 justify-center items-center">
                    <div className="bg-emerald-950 text-emerald-500 text-[16px] sm:text-[18px] font-semibold border-2 border-emerald-900 rounded-lg px-3 py-2">
                        Source: <span className="text-emerald-400">{source || null}</span>
                    </div>
                    { !isSaved && 
                    <button onClick={() => SaveComponent(componentData._id)}
                    className="bg-emerald-600 text-emerald-950 font-semibold px-3 py-2 rounded-lg cursor-pointer text-[16px] sm:text-[18px] flex justify-center items-center border border-emerald-900 flex-row gap-1 hover:border-emerald-700 hover:bg-emerald-500 transition-all">
                        <RiSaveLine /> 
                        <span className="hidden xs:block"> { isSaving ? 'Saving..' : 'Save Component' } </span>
                        <span className="xs:hidden"> { isSaving ? 'Saving..' : 'Save' } </span>
                    </button>
                    }
                    { isSaved && 
                    <button
                    className="bg-emerald-950 text-emerald-600 font-semibold px-3 py-2 rounded-lg cursor-pointer text-[16px] sm:text-[18px] flex justify-center items-center border border-emerald-600 flex-row gap-1 transition-all">
                        <AiFillCheckCircle />
                        Saved
                    </button> 
                    }
                    {/* ------- REQUEST TO PUBLISH -------- */}
                    { !isSaved && 
                    <button
                    className="bg-emerald-600 text-emerald-950 font-semibold px-3 py-2 rounded-lg cursor-pointer text-[16px] sm:text-[18px] flex justify-center items-center border border-emerald-900 flex-row gap-1 hover:border-emerald-700 hover:bg-emerald-500 transition-all">
                        <MdPublish />
                        Request To Publish
                    </button> 
                    }
                </div>

                { !isSaving && isSaved && 
                <div className="hidden sm:flex h-full flex-row justify-center items-center gap-2 lg:gap-4">
                    <button onClick={() => navigate('/')}
                    className="bg-emerald-900 text-emerald-500 px-3 py-2 rounded-lg font-semibold cursor-pointer flex justify-center items-center flex-row gap-1 hover:bg-emerald-950 transition-colors">
                        <IoMdArrowBack /> Back
                    </button>
                    
                    <button onClick={() => setPrompt('')}
                    className="bg-emerald-900 text-emerald-500 px-3 py-2 rounded-lg font-semibold cursor-pointer flex justify-center items-center flex-row gap-1 hover:bg-emerald-950 transition-colors">
                        <BiRefresh /> Generate New
                    </button>
                    
                    <button onClick={() => navigate('/profile')}
                    className="bg-emerald-900 text-emerald-500 px-3 py-2 rounded-lg font-semibold cursor-pointer flex justify-center items-center flex-row gap-1 hover:bg-emerald-950 transition-colors">
                        <FaSave /> Saved Component
                    </button>
                </div>
                }

            </div>
            }

            {/* ------ Loading Section ------ */}
            {isLoading && !componentData && (
                <div className="w-full h-25 flex justify-center items-start md:min-h-60 mt-18 bg-[#000a05]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <Loader />
                </div>
            )}

            {/* ------ Error Section ------ */}
            {errorMessage && !isLoading && !componentData && (
                <div className="w-full h-25 flex justify-center items-start md:min-h-60 mt-18 bg-[#000a05]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <div className="text-red-700 font-semibold text-[16px] flex justify-center items-center flex-col gap-1 text-center">
                        <TbFaceIdError className="text-[30px] font-semibold text-red-800"/>
                        <p> Error: {errorMessage} </p>
                    </div>
                </div>
            )}

        </div>

      </div>

    </div>

  );
};

export default Lab;