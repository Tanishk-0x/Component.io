import { useState } from 'react';
import { useSafeContext } from '../Hooks/UseSafeContext';
import { authDataContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import { SandpackProvider, SandpackLayout, SandpackPreview, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { componentDataContext } from '../Context/CompContext';
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbCopyCheck } from "react-icons/tb";
import { TbCopy } from "react-icons/tb";
import { RxComponent2 } from "react-icons/rx";

const Profile = () => {

    const navigate = useNavigate(); 

    const { userData , Logout } = useSafeContext(authDataContext); 
    const { RemoveSaved , removed , isRemoving } = useSafeContext(componentDataContext); 

    // ----------- UseStates -------------
    const [activeComponent, setActiveComponent] = useState(userData.savedComponents[0]);
    const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'code'

    const [copied , setCopied] = useState(false); 


  return (

    <div className="min-h-screen w-full bg-[#000502] text-slate-200 font-sans overflow-y-auto relative flex flex-col">
      
        {/* ----- Background Glow Effect ----- */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>


        {/* ------ Main Content Section ------- */}
        <div className="max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6 lg:gap-8 z-10 flex-1">
        
            {/* --- Profile Header Section --- */}
            <section className="bg-[#00140a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 shadow-2xl relative overflow-hidden">
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                {/* ---- User Left Info ----- */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full lg:w-auto text-center sm:text-left">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-linear-to-tr from-emerald-500 to-cyan-500 p-1 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <div className="w-full h-full bg-[#000502] rounded-full flex items-center justify-center text-3xl font-bold text-slate-100">
                            {userData?.name?.slice(0,1).toUpperCase()}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center h-full pt-1">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{userData?.name}</h1>
                            {userData.isVerified && (
                            <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                Verified
                            </span>
                            )}
                            {!userData.isVerified && (
                            <span onClick={() => navigate('/verify')}
                            className="flex items-center gap-1 bg-red-900/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                Not Verified
                            </span>
                            )}
                        </div>

                        <p className="text-slate-400 text-sm mb-4">{userData?.email}</p>
                    
                        <div className="flex items-center gap-3 justify-center sm:justify-start">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-slate-300"> Developer </span>
                            <button onClick={() => Logout()}
                            className="px-4 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 rounded-lg text-xs font-medium transition-colors flex items-center gap-2">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                Logout
                            </button>
                        </div>

                    </div>

                </div>

                {/* --- User Right Info (Stats) --- */}
                <div className='flex flex-col gap-2 '>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full lg:w-auto">
                        <div className="bg-[#000502]/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L5 14l3-4L6 17v7l8-11z"></path></svg> Credits</span>
                            <span className="text-2xl font-bold text-white">{userData?.credits}</span>
                        </div>
                        <div className="bg-[#000502]/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> API Calls</span>
                            <span className="text-2xl font-bold text-white"> 00 </span>
                        </div>
                        <div className="bg-[#000502]/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left col-span-2 sm:col-span-1">
                            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg> Saved</span>
                            <span className="text-2xl font-bold text-white">{userData?.savedComponents?.length}</span>
                        </div>
                    </div>

                    <div className='bg-[#000502]/50 border border-white/5 rounded-lg flex justify-center items-center flex-row text-emerald-600'>
                        <IoIosNotificationsOutline className='text-emerald-500 text-[20px] font-semibold'/> 
                        This is the dummy notification! real will appear
                    </div>
                </div>

            </section>

        
            {/* ------ Saved Components ------- */}
            {/* --- User's Saved Components --- */}
            <section className="flex flex-col h-full flex-1 min-h-150">
            
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                    My Saved Components
                    <span className="bg-white/10 text-slate-400 text-xs py-0.5 px-2 rounded-full font-medium">{userData.savedComponents?.length}</span>
                </h2>

                {/* ------ Components Main ------ */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1 h-full">
                    
                    {/* ---- Left Sidebar: Component List ---- */}
                    <aside className="w-full md:w-72 shrink-0 flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto custom-scrollbar pb-2 md:pb-0">
                    {userData?.savedComponents.map((comp: any) => (
                        <button
                        key={comp._id}
                        onClick={() => {
                            setActiveComponent(comp); 
                            console.log("CompActive: " , comp); 
                        }}
                        className={`shrink-0 w-64 md:w-full text-left p-4 rounded-2xl transition-all duration-300 border ${
                            activeComponent._id === comp._id 
                            ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                            : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                        }`}
                        >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] uppercase font-bold text-emerald-500/80 tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">{comp.category}</span>
                            <span className="text-[10px] text-slate-500">22-22-26</span>
                        </div>
                        <h3 className={`text-sm font-semibold mb-1 ${activeComponent.id === comp.id ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {comp.title}
                        </h3>
                        <p className="text-xs text-slate-500 truncate">Tap to view preview & code</p>
                        </button>
                    ))}
                    </aside>

                    {/* ---- Right Area: Preview & Code Detail ---- */}
                    { userData?.savedComponents?.length !== 0 && 
                    <main className="flex-1 bg-[#00140a]/40 border border-white/5 rounded-3xl backdrop-blur-xl flex flex-col overflow-hidden relative shadow-2xl min-h-100">
                    
                    {/* --- Code / Preview Header --- */}
                    <header className="px-6 py-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-white/2">
                        <div className="flex items-center gap-2 bg-[#000502] p-1 rounded-xl border border-white/10">
                            <button 
                                onClick={() => setActiveTab('preview')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-white/10 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Preview
                            </button>
                            <button 
                                onClick={() => setActiveTab('code')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-white/10 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Code
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => {
                                navigator.clipboard.writeText(activeComponent?.code || 'N/A') ; 
                                setCopied(true); 
                            }}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all tooltip-trigger" title="Copy Code">
                                {
                                    copied ? <TbCopyCheck /> : <TbCopy />
                                }
                            </button>

                            { !removed && 
                            <button onClick={() => RemoveSaved(activeComponent._id)}
                            className="px-4 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 text-sm font-medium transition-all flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                <span className="hidden sm:inline"> { isRemoving ? 'Removing..' : 'Remove' } </span>
                            </button>
                            }
                            { removed && !isRemoving && 
                            <button
                            className="px-4 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 text-sm font-medium transition-all flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                <span className="hidden sm:inline"> Removed </span>
                            </button>
                            }
                        </div>
                    </header>

                    {/* -------- Main Render Area ------- */}
                    {/* ---- Code / Preview Section ----- */}
                    <div className="w-full flex-1 flex flex-col overflow-hidden custom-sandpack bg-[#000502]/60">
                        
                        {/* Dot grid background for Preview */}
                        {activeTab === 'preview' && (
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                        )}

                        {/* --- Component Preview Section --- */}
                        {/* ------------- Preview ----------- */}
                        <SandpackProvider
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
                        >
                        {activeTab === 'preview' && (
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-1 overflow-auto">
                            <SandpackPreview 
                            showRefreshButton={true}
                            showOpenInCodeSandbox={false}
                            className="h-full w-full"
                            />
                        </div>
                        )}

                        {/* --- Component Code Section --- */}
                        {/* ------------- Code ----------- */}
                        {activeTab === 'code' && (
                        <div className="w-full max-h-125 h-full bg-[#0d1117] overflow-auto p-4 md:p-1 relative">
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
                    
                    </main>
                    }

                    { userData?.savedComponents?.length === 0 &&
                    <div className='flex-1 flex justify-center items-center bg-[#00140a]/40 border border-white/5 rounded-3xl backdrop-blur-xl flex-col overflow-hidden relative shadow-2xl min-h-100'>
                        <div className='text-[20px] font-semibold md:text-[34px] flex flex-col justify-center items-center text-slate-600'>
                            <RxComponent2 />
                            <p className='text-[16px] md:text-[20px]'> No Saved Component! </p>
                        </div>
                    </div>
                    }

                </div>

            </section>

        </div>

    </div>
    
  );
};

export default Profile;