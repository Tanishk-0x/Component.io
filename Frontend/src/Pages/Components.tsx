import { useCallback, useState } from 'react';
import { useSafeContext } from '../Hooks/UseSafeContext';
import { componentDataContext } from '../Context/CompContext';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview, 
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { FaRegSave } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { TbCopy } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";
import { AiOutlineSave } from "react-icons/ai";
import { MdExpandMore } from "react-icons/md";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { VscRefresh } from "react-icons/vsc";
import { PiNotchesBold } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";


const Components = () => {

    const { 
        components ,
        LikeComponent ,
        isLiked ,
        likesCount , 
        isGetting , 
        GetComponents , 
        currentPage , 
        setCurrentPage ,
        SaveComponent ,
        isSaving , 
        isSaved ,
        savedCount , 
        activeComponent , 
        setActiveComponent , 
        SearchComponent ,  
     } = useSafeContext(componentDataContext); 

    // ------------- UseStates ---------------
    
    const [activeTab, setActiveTab] = useState('preview'); 
    const [copied , setCopied] = useState(false); 
    const [cliPopUp ,setCliPopUp] = useState(false); 
    const [query , setQuery] = useState(''); 
    const [zoom , setZoom] = useState(1) ; 


    const HandleCommandCopy = async () => {
        const command = `npx component-io get ${activeComponent._id}` ; 
        await navigator.clipboard.writeText(command); 
        setCopied(true); 

        setTimeout(() => {
            setCopied(false); 
        }, 2000); 
    }

    // ---------- Debounce -------------
    const Debounce = (fn: any , delay: number) => {
        let timer: any ; 

        return function( ...args: any ){
            clearTimeout(timer); 
            timer = setTimeout(() => {
                fn(...args); 
            }, delay); 
        } 
    }

    const SearchWithDebounce = useCallback(
        Debounce((val: string) => SearchComponent(val) , 500 ),
        [SearchComponent]
    ); 


  return (

    <div className="flex flex-col md:flex-row h-dvh w-full bg-[#000502] text-slate-200 font-sans overflow-hidden relative">
      
        {/* ------- Background Glow Effect ------- */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* ------------ SIDEBAR ----------------- */}
        {/* -Sidebar with components & search bar- */}
        <aside className="w-full md:w-80 h-auto md:h-full shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-[#00140a]/40 backdrop-blur-xl flex flex-col z-10">
            
            <div className="p-4 md:p-6 border-b border-white/5">
                
                <div className='flex justify-between items-center'>
                    <h2 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-cyan-400 mb-3 md:mb-4">
                        Component.io
                    </h2>
                    
                    <div onClick={() => {
                        GetComponents(currentPage);
                    }}
                    className='text-[14px] cursor-pointer text-emerald-400 flex justify-center items-center flex-row gap-0'> 
                        <VscRefresh className='text-[12px]'/> refresh
                    </div>
                </div>
                {/* ----- Search Bar ------ */}
                <div className="relative flex items-center gap-1">
                    <input 
                    onChange={(e) => {
                        const val = e.target.value ; 
                        setQuery(val); 
                        SearchWithDebounce(val); 
                    }}
                    type="text" 
                    placeholder="Search components..." 
                    className="w-full bg-[#000502] border border-emerald-900/50 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder-slate-600"
                    />
                    <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

                    <button onClick={() => SearchComponent(query)}
                        className="cursor-pointer shrink-0 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-[#000502] rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>

            </div>

            {/* -------- Components Lists ------- */}
            {/* ----------- Components ---------- */}
            <div className="flex md:flex-1 overflow-x-auto md:overflow-y-auto flex-row md:flex-col p-3 md:p-4 gap-3 md:gap-0 md:space-y-2 custom-scrollbar">
                {/* ---- Map to render all components ---- */}
                {components?.map((comp: any) => (
                    
                    <button
                    key={comp._id}
                    onClick={() => setActiveComponent(comp)}
                    className={`shrink-0 cursor-pointer w-64 md:w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex flex-col gap-1 border ${
                        activeComponent?._id === comp?._id 
                        ? 'bg-emerald-900/20 border-emerald-500/30 shadow-[inset_4px_0_0_0_#10b981]' 
                        : 'bg-transparent border-white/5 md:border-transparent hover:bg-white/5'
                    }`}
                    >
                    <span className={`text-sm font-semibold truncate ${activeComponent?._id === comp?._id ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {comp?.title || 'Untitled Component'}
                    </span>
                    <span className="text-xs text-slate-500">{comp?.category || 'UnCategorized'}</span>
                    </button>
                ))}

                {/* ------ LOAD_MORE --------- */}
                { components.length > 8 && 
                <button onClick={() => {
                    GetComponents(currentPage + 1); 
                    setCurrentPage(currentPage + 1); 
                }}
                className='px-4 flex justify-center items-center flex-row gap-1 py-2 bg-emerald-950 border-2 border-emerald-800 text-emerald-600 font-semibold text-[18px] rounded-lg cursor-pointer hover:border-emerald-600 hover:text-emerald-500'>
                    <MdExpandMore />{ isGetting ? 'Loading..' : 'Load More' } <span className='text-emerald-600 text-xs'>{ components?.length || 0 }</span>
                </button>
                }

                { components.length === 0 && 
                    <div className='border-2 py-3 flex justify-center flex-row gap-1 items-center font-semibold text-[16px] rounded-lg  border-emerald-700 text-emerald-600'>
                        <PiNotchesBold /> No Result Found!
                    </div>
                }
            </div>


        </aside>

        {/* --------- Main Content Area ---------- */}
        {/* --------- Header/Code/Preview -------- */}
        <main className="flex-1 overflow-hidden flex flex-col z-10 relative">

            {/* -------- Main Content Header -------- */}
            <header className="mt-2 h-auto md:h-20 border-b border-white/5 p-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 bg-[#00140a]/20 backdrop-blur-md shrink-0">
                <div className="w-full md:w-auto">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-100 truncate">{activeComponent?.title || 'Untitled Component'}</h1>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 md:mt-1 text-xs font-medium text-slate-400">
                        <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">{activeComponent?.category || 'UnCategorized'}</span>
                        <span className="flex items-center gap-1"> <FaHeart />{ isLiked ? likesCount : activeComponent?.likeCount || 0 }</span>
                        <span className="flex items-center gap-1"> <AiOutlineSave />{ isSaved ? savedCount : activeComponent?.savedCount || 0 }</span>
                    </div>
                </div>
            
                <div className="flex gap-2 md:gap-3 w-full md:w-auto mt-2 md:mt-0">
                    <button onClick={() => LikeComponent( activeComponent?._id )}
                    className='text-emerald-500 cursor-pointer text-[24px] font-semibold hover:text-emerald-400 flex justify-center items-center'>
                        {
                            isLiked ? <BiSolidLike /> : <BiLike />
                        }
                    </button>
                    
                    { !copied ? 
                    (<button onClick={() => {
                        navigator.clipboard.writeText(activeComponent?.code); 
                        setCopied(true); 

                        setTimeout(() => {
                            setCopied(false); 
                        }, 5000); 
                    }}
                    className="flex-1 text-emerald-500 md:flex-none cursor-pointer justify-center text-nowrap py-2 px-2 md:px-4 md:py-2 rounded-lg bg-emerald-950 border-2 border-emerald-800 text-xs md:text-sm font-medium hover:bg-emerald-800 transition-colors flex items-center gap-1 md:gap-2">
                        <TbCopy /> Copy Code
                    </button>)
                    :
                    (<button className="flex-1 text-emerald-500 md:flex-none cursor-pointer justify-center text-nowrap py-2 px-2 md:px-4 md:py-2 rounded-lg bg-emerald-950 border-2 border-emerald-800 text-xs md:text-sm font-medium hover:bg-emerald-800 transition-colors flex items-center gap-1 md:gap-2">
                        <TbCopyCheck /> Copied
                    </button>)
                    }

                    { isSaved ? 
                        (<button onClick={() => SaveComponent(activeComponent?._id)}
                        className="flex-1 text-emerald-500 md:flex-none cursor-pointer justify-center text-nowrap py-2 px-2 md:px-4 md:py-2 rounded-lg bg-emerald-950 border-2 border-emerald-800 text-xs md:text-sm font-medium hover:bg-emerald-800 transition-colors flex items-center gap-1 md:gap-2">
                            <AiFillCheckCircle /> Saved
                        </button>)
                        : 
                        (<button onClick={() => SaveComponent(activeComponent?._id)}
                        className="flex-1 text-emerald-500 md:flex-none cursor-pointer justify-center text-nowrap py-2 px-2 md:px-4 md:py-2 rounded-lg bg-emerald-950 border-2 border-emerald-800 text-xs md:text-sm font-medium hover:bg-emerald-800 transition-colors flex items-center gap-1 md:gap-2">
                            <FaRegSave /> { isSaving ? 'Saving..' : 'Save' }
                        </button>)
                    }

                    <button onClick={() => setCliPopUp(true)}
                        className="flex-1 text-sky-500 md:flex-none cursor-pointer justify-center px-3 py-2 md:px-4 md:py-2 rounded-lg bg-sky-950 border-2 border-sky-800 text-nowrap text-xs md:text-sm font-medium hover:bg-sky-800 transition-colors flex items-center gap-1 md:gap-2">
                            <HiOutlineCommandLine /> NPX Import
                    </button>

                </div>
            </header>


            {/* ------- Main WorkSpace Area -------- */}
            {/* ------ Code / Preview / Footer ----- */}
            <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-6">
            
                {/* ----- Tabs ----- */}
                <div className="flex gap-1 md:gap-2 p-1 bg-[#00140a] border border-white/10 rounded-xl w-fit mb-3 md:mb-4 mx-auto md:mx-0">
                    <button 
                    onClick={() => setActiveTab('preview')}
                    className={`px-5 cursor-pointer md:px-6 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-white/10 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Preview
                    </button>
                    <button 
                    onClick={() => setActiveTab('code')}
                    className={`px-5 cursor-pointer md:px-6 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-white/10 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Code
                    </button>
                </div>

                {/* -------- Render Area --------- */}
                {/* -------- Code & Preview ------ */}
                <div className="relative w-full flex-1 flex flex-col overflow-hidden custom-sandpack">
                    
                    {/* --- Background Effect --- */}
                    {activeTab === 'preview' && (
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    )}


                    <SandpackProvider
                        key={activeComponent._id}
                        template="react"
                        theme={sandpackDark}
                        files={{ "/App.js": activeComponent?.code || '<h2>Component.io!</h2>' }}
                        options={{
                        externalResources: ["https://cdn.tailwindcss.com"],
                        }}
                        className="h-full flex-1 flex flex-col"
                    >
                    <SandpackLayout 
                        className="h-full w-full border-none bg-transparent" 
                        style={{ backgroundColor: '#000502' }}
                    >
                    {/* ------- Preview Area ------ */}
                    {/* ---- Component Preview ---- */}
                    {activeTab === 'preview' && (
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-1 md:p-1 overflow-auto">

                            {/* ----- Zoom Controls ----- */}
                            <div className='absolute top-2 right-2 z-20 flex flex-row gap-1'>
                                <button onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.3))}
                                className='w-7 h-7 cursor-pointer flex justify-center items-center rounded-md bg-[#00140a] border border-emerald-800 text-emerald-400 hover:bg-emerald-800'>
                                    <AiOutlineMinus className='text-xs' />
                                </button>
                                <button onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
                                className='w-7 h-7 cursor-pointer flex justify-center items-center rounded-md bg-[#00140a] border border-emerald-800 text-emerald-400 hover:bg-emerald-800'>
                                    <AiOutlinePlus className='text-xs' />
                                </button>
                            </div>

                            <div style={{ width: `${100 / zoom}%`, height: `${100 / zoom}%`, transform: `scale(${zoom})`, transformOrigin: 'center center', backgroundColor: '#000502' }}>
                                <SandpackPreview 
                                showRefreshButton={true}
                                showOpenInCodeSandbox={false}
                                className="h-full w-full"
                                style={{ backgroundColor: '#000502' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ------- Code Area ---------- */}
                    {/* ------ Component Code ------ */}
                    {activeTab === 'code' && (
                    <div className="w-full h-full bg-[#0d1117] overflow-auto p-1 md:p-1 relative">
                        <SandpackCodeEditor 
                            showLineNumbers 
                            showTabs={false}
                            wrapContent={false}
                            className="h-full w-full"
                        />
                    </div>
                    )}

                    </SandpackLayout>
                    </SandpackProvider>

                </div>

                {/* -- Component Details Footer --- */}
                <div className="mt-3 md:mt-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row gap-3 md:gap-4 items-start sm:items-center">
                    <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-linear-to-tr from-emerald-500 to-cyan-500 p-px">
                        <div className="w-full h-full bg-[#000502] rounded-full flex items-center justify-center text-xs font-bold">AI</div>
                    </div>
                    <div>
                        <p className="text-xs md:text-sm text-slate-300 leading-snug">
                            Your ultimate hub for AI-generated Tailwind CSS components.
                        </p>
                        <p className="text-[10px] md:text-xs text-slate-500 mt-1 md:mt-1.5">Generated by <span className="text-emerald-500/80"> {activeComponent?.author?.name} </span> • Uses Tailwind CSS</p>
                    </div>
                </div>

            </div>

        </main>

        {cliPopUp && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
                onClick={() => setCliPopUp(false)}
            >
                <div
                className="w-full max-w-125 bg-[#00140a] border border-emerald-900/30 rounded-2xl p-7 shadow-2xl shadow-black/60 relative"
                onClick={(e) => e.stopPropagation()}
                >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-emerald-500 to-transparent rounded-t-2xl" />

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-blink inline-block" />
                    <h2 className="text-white font-black text-[15px] uppercase tracking-wide">Install Component</h2>
                    </div>
                    <button
                    onClick={() => setCliPopUp(false)}
                    className="text-slate-600 hover:text-white cursor-pointer transition-colors text-lg leading-none px-1"
                    >✕</button>
                </div>

                <div className="flex flex-col gap-4">

                    <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center shrink-0">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 text-xs font-black">1</div>
                        <div className="w-px h-10 bg-emerald-900/40 mt-1" />
                    </div>
                    <div className="pt-1 flex-1">
                        <p className="text-white text-sm font-bold mb-2">Copy the command</p>
                        <div className="bg-[#000502] border border-emerald-900/25 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3">
                        <code className="text-emerald-400 text-xs font-mono">
                            npx component.io add {activeComponent?.title?.split(' ').slice(0, 2).join(' ') + '...' || 'mycomponent'}
                        </code>
                        <button
                            onClick={() => {
                                HandleCommandCopy(); 
                            }}
                            className="text-slate-600 hover:text-emerald-400 transition-colors shrink-0"
                        >
                            { copied ? <TbCopyCheck className="text-base" /> : <TbCopy className="text-base" /> }
                        </button>
                        </div>
                    </div>
                    </div>

                    <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center shrink-0">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 text-xs font-black">2</div>
                        <div className="w-px h-10 bg-emerald-900/40 mt-1" />
                    </div>
                    <div className="pt-1 flex-1">
                        <p className="text-white text-sm font-bold mb-1.5">Move to the path</p>
                        <p className="text-gray-500 text-xs leading-relaxed">
                        Open your terminal and navigate to your project's directory where your you want to install the component.
                        </p>
                    </div>
                    </div>

                    <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center shrink-0">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 text-xs font-black">3</div>
                    </div>
                    <div className="pt-1 flex-1">
                        <p className="text-white text-sm font-bold mb-1.5">Execute &amp; import</p>
                        <p className="text-gray-500 text-xs leading-relaxed">
                        Run the command. The CLI drops the component into <span className="text-emerald-400/80 font-mono">/directory</span> <span className="text-sky-400/80 font-mono">Component.jsx</span> Created — no extra deps just use it.
                        </p>
                    </div>
                    </div>

                </div>

                <div className="mt-5 p-3.5 bg-emerald-500/5 border border-emerald-900/20 rounded-xl">
                    <p className="text-gray-600 text-[11.5px] leading-relaxed">
                    Requires <span className="text-emerald-400/80 font-mono">Tailwind CSS</span> configured in your project. All components are zero-dependency, production-ready React + Tailwind out of the box.
                    </p>
                </div>

                <button
                    onClick={() => setCliPopUp(false)}
                    className="cursor-pointer w-full mt-4 bg-emerald-500 text-black py-3 rounded-xl font-black text-sm uppercase tracking-wide hover:bg-emerald-400 active:scale-95 transition-all"
                >
                    Got it
                </button>

                </div>
            </div>
            )
        }

    </div>

  );
};

export default Components;