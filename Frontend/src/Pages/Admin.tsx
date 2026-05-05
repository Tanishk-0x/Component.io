import { useEffect, useState } from 'react';
import { useSafeContext } from '../Hooks/UseSafeContext';
import { adminDataContext } from '../Context/AdminContext';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview ,
  useSandpack
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import type { ManagingComponentType, ReviewItemType } from '../Types/Types';
import { publishDataContext } from '../Context/PublishContext';
import { useNavigate } from 'react-router-dom';
import { MdFileDownloadDone } from "react-icons/md";
import { PiCheckFatLight } from "react-icons/pi";
import { PiCheckFatFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
{/* <PiCheckFatFill /> */}

// ----- Auto Sync Code ------
const SyncCode = ({ setFormData, currentCode }: any) => {
  const { sandpack } = useSandpack();
  
  useEffect(() => {
    const codeInEditor = sandpack.files[sandpack.activeFile].code;
    
    if (codeInEditor !== currentCode) {
      const timer = setTimeout(() => {
        setFormData((prev: any) => ({ ...prev, code: codeInEditor }));
      }, 500); 
      
      return () => clearTimeout(timer);
    }
  }, [sandpack.files, sandpack.activeFile]);

  return null;
};

// ----- Dummy Data For Admin -----
const INITIAL_QUEUE = [
  { 
    id: "rev-101", title: "Neumorphic Login Form", author: "@dev_rahul", date: "Apr 26, 2026", status: "pending",
    code: `// React Code for Neumorphic Form\n<div className="p-8 rounded-3xl bg-gray-100 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">\n  <h2 className="text-gray-700">Login</h2>\n</div>`,
    preview: <div className="p-8 rounded-3xl bg-slate-200 shadow-[10px_10px_30px_#b8b9be,-10px_-10px_30px_#ffffff] flex flex-col gap-4 w-72"><h3 className="text-slate-600 font-bold text-center">Neumorphic Login</h3><input type="text" placeholder="Username" className="p-3 rounded-xl bg-slate-200 shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] outline-none text-slate-600"/><button className="p-3 mt-2 rounded-xl bg-slate-200 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] text-emerald-600 font-bold hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all">Sign In</button></div>
  },
  { 
    id: "rev-102", title: "Cyberpunk Glitch Button", author: "@neon_ninja", date: "Apr 26, 2026", status: "pending",
    code: `/* CSS Only Glitch Button */\n<button className="relative px-8 py-3 bg-red-500 text-white font-bold uppercase tracking-widest skew-x-[-10deg] border-2 border-cyan-400 group">\n  <span className="group-hover:animate-pulse">Initialize</span>\n</button>`,
    preview: <button className="relative px-8 py-3 bg-rose-600 text-white font-black uppercase tracking-widest skew-x-[-15deg] border-l-4 border-cyan-400 shadow-[4px_4px_0px_#22d3ee] hover:translate-y-1 hover:shadow-none transition-all duration-150">Execute</button>
  },
  { 
    id: "rev-103", title: "Minimal Weather Widget", author: "@tanishk_dev", date: "Apr 25, 2026", status: "pending",
    code: `// Minimal Weather React Component\n<div className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-2xl">\n  <p>24°C - Sunny</p>\n</div>`,
    preview: <div className="bg-linear-to-br from-blue-400/20 to-cyan-300/20 backdrop-blur-md border border-white/20 p-6 rounded-3xl w-64 flex flex-col items-center gap-2 shadow-xl"><svg className="w-16 h-16 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg><h2 className="text-4xl font-light text-white mt-2">28°<span className="text-xl">C</span></h2><p className="text-cyan-100 text-sm font-medium tracking-wide">Clear Sky • Indore</p></div>
  }
];


const Admin = () => {

    const navigate = useNavigate(); 

    // -------- UseContexts ---------
    const {
        isGettingData ,
        GetAdminDashboardData ,
        totalUsers , 
        componentCount , 
        requestedComponents , 
        users , 
        components , 
        currentPage ,
        UpdateComponent , 
        isUpdating , 
        updated ,
        DeleteComponent , 
        isDeleting ,
        deleted , 
        DeleteUser , 
        isDeletingUser , 
        userDeleted ,
    } = useSafeContext(adminDataContext); 

    const { 
        RejectRequest , 
        isRejecting , 
        rejected , 
        AcceptRequest , 
        isAccepting , 
        accepted , 
        showPopup , 
        setShowPopup , 
    } = useSafeContext(publishDataContext); 


    // --------- UseStates ---------
    const [queue, setQueue] = useState(INITIAL_QUEUE);
    const [reviewingItem, setReviewingItem] = useState<ReviewItemType | null>(null); 
    const [managingItem , setManagingItem] = useState<ManagingComponentType | null>(null);
    const [showManagingPopUp , setShowManagingPopUp] = useState(false); 
    const [modalTab, setModalTab] = useState('preview'); 
    const [workType , setWorkType] = useState('reviews_queue'); 

    const [formData , setFormData ] = useState({
        title: managingItem?.title || 'Unknown' , 
        category: managingItem?.category || 'Unknown' , 
        prompt: managingItem?.prompt || 'Unknown' , 
        code: managingItem?.code || 'Unknown'
    }); 

    useEffect(() => {
        GetAdminDashboardData(1); 
    }, []); 

    useEffect(() => {
        if( managingItem ){
           setFormData({
            title: managingItem.title || '',
            category: managingItem.category || '',
            prompt: managingItem.prompt || '',
            code: managingItem.code || ''
        }); 
        }
    }, [managingItem]); 

    const HandleDeleteComponent = async (id: any) => {
        const res = await DeleteComponent( id ); 
        if( res ){
            setShowManagingPopUp(false); 
            GetAdminDashboardData(1); 
        }
    }

  return (

    <div className="flex flex-col md:flex-row h-dvh w-full bg-[#000502] text-slate-200 font-sans overflow-hidden relative">
      
        {/* --- Background Glow Effect --- */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* ---------- Sidebar ----------- */}
        {/* -------- Sidebar Section ----- */}
        <aside className="w-full md:w-64 h-auto md:h-full shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-[#00140a]/80 backdrop-blur-xl flex flex-col z-20">
            <div className="p-4 md:p-6 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-linear-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white leading-tight">Admin Portal</h2>
                    <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Superuser</p>
                </div>
            </div>

            {/* --- Sidebar Nav Option Buttons --- */}
            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible p-3 md:p-4 gap-2 custom-scrollbar">
                <button onClick={() => setWorkType('reviews_queue')}
                className={`flex items-center gap-3 px-4 cursor-pointer py-3 rounded-xl text-emerald-50  w-40 md:w-full shrink-0 text-sm font-semibold ${ workType === 'reviews_queue' && 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    Review Requests
                    <span className="ml-auto bg-emerald-500 text-[#000502] text-[10px] px-2 py-0.5 rounded-full">{queue.length}</span>
                </button>
                <button onClick={() => setWorkType('users_queue')}
                className={`flex items-center gap-3 px-4 cursor-pointer py-3 rounded-xl text-emerald-50  w-40 md:w-full shrink-0 text-sm font-semibold ${ workType === 'users_queue' && 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    Manage Users
                </button>
                <button onClick={() => setWorkType('components_queue')}
                className={`flex items-center gap-3 px-4 cursor-pointer py-3 rounded-xl text-emerald-50  w-40 md:w-full shrink-0 text-sm font-semibold ${ workType === 'components_queue' && 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    Manage Components
                </button>
            </nav>
            
            <div className="mt-auto p-4 hidden md:flex flex-col gap-2">
                <button onClick={() => navigate('/addcomponent')}
                className="w-full py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-sm font-medium transition-all cursor-pointer">
                    Add Component
                </button>
                <button className="w-full py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-sm font-medium transition-all cursor-pointer">
                    Exit Admin
                </button>
            </div>
            
        </aside>

        {/* --- Main Dashboard Content --- */}
        {/* --------- Review Queue ------- */}
        { workType === 'reviews_queue' && 
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative custom-scrollbar">
            
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100">All Components Hub</h1>
                <p className="text-slate-400 text-sm mt-1">Manage, organize, and control the entire catalog of platform components.</p>
            </header>

            {/* ---- Stats Options ---- */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg></div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Public</span>
                    <span className="text-3xl font-black text-white">{componentCount?.Public || 0}</span>
                    <span className="text-emerald-400 text-[10px] font-bold mt-2 bg-emerald-500/10 w-fit px-2 py-0.5 rounded">Publicly Available</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>Publish Requested</span>
                    <span className="text-3xl font-black text-white">{componentCount?.Requested || 0}</span>
                    <span className="text-slate-400 text-[10px] font-medium mt-2">Requires your attention</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Rejected</span>
                    <span className="text-3xl font-black text-white">{componentCount?.Rejected || 0}</span>
                    <span className="text-rose-400 text-[10px] font-bold mt-2 bg-rose-500/10 w-fit px-2 py-0.5 rounded">Did not meet UI standards</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Created</span>
                    <span className="text-3xl font-black text-white">{componentCount?.Total || 0}</span>
                    <span className="text-cyan-400 text-[10px] font-bold mt-2 bg-cyan-500/10 w-fit px-2 py-0.5 rounded">All Created</span>
                </div>
            </section>

            {/* Review Queue List */}
            <section>
                <div className="flex items-center justify-between mb-4 clear-both">
                    <h2 className="text-lg font-bold text-slate-200">Action Required</h2>
                    <button onClick={() => GetAdminDashboardData(1)}
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer">Refresh</button>
                </div>

                {/* --------- Items Listed Section -------- */}
                <div className="bg-[#000a05] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    
                    {/* ---------- Table Header (Fixed Grid 3+3+2+2+2 = 12) ----------- */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
                        <div className="col-span-3">Component Details</div>
                        <div className="col-span-3">Author</div>
                        <div className="col-span-2">Date Generated</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* ----- Table Content / Items Lists ----- */}
                    {/* ------- Map To Render All Fields ------ */}
                    {requestedComponents?.length > 0 ? requestedComponents.map((item: any) => (
                    <div key={item._id || item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                        
                        {/* Mobile Label & Details / Column 1 */}
                        <div className="col-span-1 md:col-span-3 flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center shrink-0">
                                {/* Component Icon */}
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-sm md:text-base font-bold text-slate-200 truncate">{item?.title || 'Untitled Component'}</h3>
                                <p className="text-[10px] text-slate-500 font-mono truncate">ID: {item?._id || item?.id || 'N/A'}</p>
                                
                                {/* Mobile Info Stack */}
                                <div className="flex md:hidden items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400 truncate max-w-[100px]">{item?.author?.name || item?.author || 'Unknown'}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full shrink-0"></span>
                                    <span className="text-xs text-emerald-400 font-medium shrink-0">{item?.status}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full shrink-0"></span>
                                    <span className="text-xs text-slate-500 shrink-0">{item?.createdAt?.split('T')[0] || item?.date || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- Author --- */}
                        <div className="hidden md:flex col-span-3 items-center min-w-0">
                            <span className="text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 truncate w-fit max-w-full">
                                {item?.author?.name || item?.author || 'Unknown'}
                            </span>
                        </div>

                        {/* --- Date --- */}
                        <div className="hidden md:flex col-span-2 items-center text-sm font-mono text-slate-400">
                            {item?.createdAt?.split('T')[0] || item?.date || 'N/A'}
                        </div>

                        {/* --- Status --- */}
                        <div className="hidden md:flex col-span-2 items-center">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-sm border ${
                                item?.status === 'Public' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                item?.status === 'Requested' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                                item?.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            }`}>
                                {item?.status || 'Draft'}
                            </span>
                        </div>

                        {/* ----- Action Button ------ */}
                        <div className="col-span-1 md:col-span-2 flex justify-end items-center">
                            <button 
                                onClick={() => {
                                    console.log("Reviewing Item: " , item);
                                    setReviewingItem(item);
                                    setShowPopup(true); 
                                }}
                                className="w-full md:w-auto px-4 py-2 bg-emerald-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500 hover:text-[#000502] rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Review <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </button>
                        </div>

                    </div>

                    )) : (

                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-200">No Components Found</h3>
                        <p className="text-slate-500 text-sm mt-1">The component database is currently empty.</p>
                    </div>

                    )}

                </div>

            </section>

        </main>
        }

        {/* ----- REVIEW MODAL (OVERLAY) ---- */}
        {showPopup && (
        <div className="fixed inset-0 z-50 bg-[#000502]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8">
            
            <div className="bg-[#00140a] border border-white/10 rounded-3xl w-full max-w-5xl h-full max-h-[95vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">        
                
                <header className="p-4 md:p-5 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/2 shrink-0 relative">  
                    
                    <div className="flex flex-col gap-2 min-w-75">
                        <div className="flex items-center gap-3">
                            <span className="bg-yellow-500/10 rounded-lg text-yellow-500 flex justify-center items-center h-7 px-3 border border-yellow-500/20">
                                { reviewingItem?.category || 'Unknown' }
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">ID: { reviewingItem?._id || 'N/A' }</span>
                        </div>

                        <p className='bg-transparent px-2 truncate -ml-2 w-full outline-none transition-all text-xl md:text-2xl font-bold text-slate-100 placeholder:text-slate-700'>
                            { reviewingItem?.title || 'Unknown' }
                        </p>

                        <p className="text-sm text-slate-400 ml-1">Generated by <span className="text-emerald-400">@{reviewingItem?.author?.name || 'Unknown'}</span></p>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2 ml-1">
                            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Generation Context / AI Prompt</label>
                        </div>
                        <textarea readOnly
                        value={ reviewingItem?.prompt || 'Unknown' }
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-slate-400 outline-none focus:border-emerald-500/40 focus:bg-emerald-500/5 transition-all resize-none min-h-20"
                        />
                    </div>
                    
                    <button 
                        onClick={() => setShowPopup(false)}
                        className="cursor-pointer absolute sm:relative top-4 right-4 sm:top-auto sm:right-auto p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                </header>

                {/* ----- Code / Preview Section ------- */}
                {/* ---------- Code & Preview ---------- */}
                <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-4 bg-[#000a05]">
                
                    {/* -- Toggle Tabs -- */}
                    <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit mb-4">
                        <button onClick={() => setModalTab('preview')} className={`cursor-pointer px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${modalTab === 'preview' ? 'bg-white/10 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Visual Preview</button>
                        <button onClick={() => setModalTab('code')} className={`cursor-pointer px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${modalTab === 'code' ? 'bg-white/10 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Source Code</button>
                    </div>

                    {/* ----- Main WorkSpace ----- */}
                    <div className="w-full flex-1 flex flex-col overflow-hidden custom-sandpack">
                        <SandpackProvider
                            key={reviewingItem?._id}
                            template="react"
                            theme={sandpackDark}
                            files={{ "/App.js": reviewingItem?.code ||  '<h2>Component.io!</h2>' }}
                            options={{
                            externalResources: ["https://cdn.tailwindcss.com"],
                            }}
                            className="h-full flex-1 flex flex-col"
                        >
                        <SandpackLayout 
                            className="h-full w-full border-none bg-transparent" 
                        >
                        {/* ----- Preview Section ------ */}
                        {/* --------- Preview ---------- */}
                        {modalTab === 'preview' && (
                        <div className="absolute inset-0 flex items-center justify-center p-0 overflow-auto pattern-dots pattern-slate-700 pattern-bg-transparent pattern-size-4 pattern-opacity-20">
                            <SandpackPreview 
                            showRefreshButton={true}
                            showOpenInCodeSandbox={false}
                            className="h-full w-full"
                            />
                        </div>
                        )}

                        {/* ------ Code Section ------- */}
                        {/* ----------- Code ---------- */}
                        {modalTab === 'code' && (
                        <div className="w-full h-full bg-[#0d1117] p-1 overflow-auto">
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

                </div>

                {/* ------ PopUp Footer Section -------- */}
                <footer className="p-4 md:p-6 border-t border-white/5 bg-[#00140a] flex flex-col-reverse sm:flex-row justify-between items-center gap-4 shrink-0">
                    <p className="text-xs text-slate-500 text-center sm:text-left"> Approve or reject the request to make it public or not? </p>
                
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        
                        <button onClick={() => {
                            if( reviewingItem?._id ){
                                RejectRequest( reviewingItem._id ); 
                            }
                        }}
                        className="flex justify-center items-center gap-1 flex-row cursor-pointer flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-rose-500 text-white border border-rose-500/30 hover:bg-rose-500/30 hover:text-rose-500 font-bold text-sm"
                        >
                            <RxCross2 /> Reject
                        </button>
                        
                        <button onClick={() => {
                            if( reviewingItem?._id ){
                                AcceptRequest(reviewingItem._id); 
                            }
                        }}
                        className="flex justify-center items-center gap-1 flex-row cursor-pointer flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-500 text-white border border-emerald-500/30 hover:bg-emerald-500/30 hover:text-emerald-500 font-bold text-sm"
                        >
                            <PiCheckFatLight /> Approve
                        </button>
                    </div>
                </footer>

            </div>

        </div>
        )}

        {/* --- Main Dashboard Content --- */}
        {/* --------- Users Queue -------- */}
        { workType === 'users_queue' && 
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative custom-scrollbar">
            
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100">Users Manage Hub</h1>
                <p className="text-slate-400 text-sm mt-1">Monitor, manage, and review registered user accounts and their platform activities.</p>
            </header>

            {/* ---- Stats Options ---- */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg></div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Users</span>
                    <span className="text-3xl font-black text-white">{totalUsers || 0}</span>
                    <span className="text-emerald-400 text-[10px] font-bold mt-2 bg-emerald-500/10 w-fit px-2 py-0.5 rounded">+124 this week</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Pending Review</span>
                    <span className="text-3xl font-black text-white">{queue.length}</span>
                    <span className="text-slate-400 text-[10px] font-medium mt-2">Requires your attention</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Rejected</span>
                    <span className="text-3xl font-black text-white">1,240</span>
                    <span className="text-rose-400 text-[10px] font-bold mt-2 bg-rose-500/10 w-fit px-2 py-0.5 rounded">Did not meet UI standards</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total AI Calls</span>
                    <span className="text-3xl font-black text-white">N/A</span>
                    <span className="text-cyan-400 text-[10px] font-bold mt-2 bg-cyan-500/10 w-fit px-2 py-0.5 rounded">All time usage</span>
                </div>
            </section>

            {/* Review Queue List */}
            <section>
                <div className="flex items-center justify-between mb-4 clear-both">
                    <h2 className="text-lg font-bold text-slate-200">Action Required</h2>
                    <button onClick={() => GetAdminDashboardData(1)} 
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Refresh Queue</button>
                </div>

                {/* --------- Items Listed Section -------- */}
                <div className="bg-[#000a05] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    
                    {/* ---------- Table Header (Fixed Grid 3+3+2+2+2 = 12) ----------- */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
                        <div className="col-span-3">User's Name</div>
                        <div className="col-span-3">Email Address</div>
                        <div className="col-span-2">Status & Credits</div>
                        <div className="col-span-2">Register Date</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* ----- Table Content / Items Lists ----- */}
                    {users.length > 0 ? users.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                        
                        {/* Mobile Label & Details / Column 1 */}
                        <div className="col-span-1 md:col-span-3 flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center shrink-0">
                                {/* User Icon */}
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-sm md:text-base font-bold text-slate-200 truncate">{item?.name || 'Unknown'}</h3>
                                <div className="flex md:hidden items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400 truncate max-w-[100px]">{item?.email || 'Unknown'}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full shrink-0"></span>
                                    <span className="text-xs text-emerald-400 font-medium shrink-0">{item?.credits || 0} cr</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full shrink-0"></span>
                                    <span className="text-xs text-slate-500 shrink-0">{item?.createdAt?.split('T')[0] || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- Email --- */}
                        <div className="hidden md:flex col-span-3 items-center min-w-0">
                            <span className="text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 truncate w-fit max-w-full">
                                {item?.email || 'Unknown'}
                            </span>
                        </div>

                        {/* --- Status & Credits --- */}
                        <div className="hidden md:flex col-span-2 items-center gap-2">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm border ${item?.isVerified ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                {item?.isVerified ? 'Verified' : 'Pending'}
                            </span>
                            <span className="text-sm font-bold text-slate-300 flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {item?.credits || 0}
                            </span>
                        </div>

                        {/* --- Date --- */}
                        <div className="hidden md:flex col-span-2 items-center text-sm font-mono text-slate-400">
                            {item?.createdAt?.split('T')[0] || 'N/A'}
                        </div>

                        {/* ----- Action Button ------ */}
                        <div className="col-span-1 md:col-span-2 flex justify-end items-center">
                            <button 
                                onClick={() => DeleteUser(item._id)}
                                className="w-full md:w-auto px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-[#000502] rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                { isDeletingUser ? 'Deleting..' : 'Delete'} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </button>
                        </div>

                    </div>

                    )) : (

                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-200">No Users Found</h3>
                        <p className="text-slate-500 text-sm mt-1">The user database is currently empty.</p>
                    </div>

                    )}

                </div>

            </section>

        </main>
        }  

        {/* --- Main Dashboard Content --- */}
        {/* ------ Component Queue ------- */}
        { workType === 'components_queue' && 
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative custom-scrollbar">
            
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100">All Components Hub</h1>
                <p className="text-slate-400 text-sm mt-1">Manage, organize, and control the entire catalog of platform components.</p>
            </header>

            {/* ---- Stats Options ---- */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg></div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Public</span>
                    <span className="text-3xl font-black text-white">{componentCount?.Public || 0}</span>
                    <span className="text-emerald-400 text-[10px] font-bold mt-2 bg-emerald-500/10 w-fit px-2 py-0.5 rounded">Publicly Available</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>Publish Requested</span>
                    <span className="text-3xl font-black text-white">{componentCount?.Requested || 0}</span>
                    <span className="text-slate-400 text-[10px] font-medium mt-2">Requires your attention</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Rejected</span>
                    <span className="text-3xl font-black text-white">{componentCount?.Rejected || 0}</span>
                    <span className="text-rose-400 text-[10px] font-bold mt-2 bg-rose-500/10 w-fit px-2 py-0.5 rounded">Did not meet UI standards</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Created</span>
                    <span className="text-3xl font-black text-white">{componentCount?.Total || 0}</span>
                    <span className="text-cyan-400 text-[10px] font-bold mt-2 bg-cyan-500/10 w-fit px-2 py-0.5 rounded">All Created</span>
                </div>
            </section>

            {/* Review Queue List */}
            <section>
                <div className="flex items-center justify-between mb-4 clear-both">
                    <h2 className="text-lg font-bold text-slate-200">Action Required</h2>
                    <button onClick={() => GetAdminDashboardData(1)}
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer">Refresh</button>
                </div>

                {/* --------- Items Listed Section -------- */}
                <div className="bg-[#000a05] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    
                    {/* ---------- Table Header (Fixed Grid 3+3+2+2+2 = 12) ----------- */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
                        <div className="col-span-3">Component Details</div>
                        <div className="col-span-3">Author</div>
                        <div className="col-span-2">Date Generated</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* ----- Table Content / Items Lists ----- */}
                    {/* ------- Map To Render All Fields ------ */}
                    {components.length > 0 ? components.map((item: any) => (
                    <div key={item._id || item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                        
                        {/* Mobile Label & Details / Column 1 */}
                        <div className="col-span-1 md:col-span-3 flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center shrink-0">
                                {/* Component Icon */}
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-sm md:text-base font-bold text-slate-200 truncate">{item?.title || 'Untitled Component'}</h3>
                                <p className="text-[10px] text-slate-500 font-mono truncate">ID: {item?._id || item?.id || 'N/A'}</p>
                                
                                {/* Mobile Info Stack */}
                                <div className="flex md:hidden items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400 truncate max-w-[100px]">{item?.author?.name || item?.author || 'Unknown'}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full shrink-0"></span>
                                    <span className="text-xs text-emerald-400 font-medium shrink-0">{item?.status}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full shrink-0"></span>
                                    <span className="text-xs text-slate-500 shrink-0">{item?.createdAt?.split('T')[0] || item?.date || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- Author --- */}
                        <div className="hidden md:flex col-span-3 items-center min-w-0">
                            <span className="text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 truncate w-fit max-w-full">
                                {item?.author?.name || item?.author || 'Unknown'}
                            </span>
                        </div>

                        {/* --- Date --- */}
                        <div className="hidden md:flex col-span-2 items-center text-sm font-mono text-slate-400">
                            {item?.createdAt?.split('T')[0] || item?.date || 'N/A'}
                        </div>

                        {/* --- Status --- */}
                        <div className="hidden md:flex col-span-2 items-center">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-sm border ${
                                item?.status === 'Public' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                item?.status === 'Requested' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                                item?.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            }`}>
                                {item?.status || 'Draft'}
                            </span>
                        </div>

                        {/* ----- Action Button ------ */}
                        <div className="col-span-1 md:col-span-2 flex justify-end items-center">
                            <button 
                                onClick={() => {
                                    console.log("MANAGING ITEM:" , item)
                                    setManagingItem(item);
                                    setFormData({
                                        title: item.title || '',
                                        category: item.category || '',
                                        prompt: item.prompt || '',
                                        code: item.code || ''
                                    });
                                    setShowManagingPopUp(true); 
                                }}
                                className="w-full md:w-auto px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-[#000502] rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                            >
                                Manage <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </button>
                        </div>

                    </div>

                    )) : (

                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-200">No Components Found</h3>
                        <p className="text-slate-500 text-sm mt-1">The component database is currently empty.</p>
                    </div>

                    )}

                </div>

            </section>

        </main>
        }

        {/* ----- Managing PopUp ---- */}
        {showManagingPopUp && (
        <div className="fixed inset-0 z-50 bg-[#000502]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8">
            
            <div className="bg-[#00140a] border border-white/10 rounded-3xl w-full max-w-5xl h-full max-h-[95vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
                
                
                <header className="p-4 md:p-5 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/2 shrink-0 relative">  
                    
                    <div className="flex flex-col gap-2 min-w-75">
                        <div className="flex items-center gap-3">
                            <span className="bg-yellow-500/10 rounded-lg text-yellow-500 flex justify-center items-center h-7 px-3 border border-yellow-500/20">
                                <input type="text" 
                                onChange={(e) => setFormData((prev) => ({ ...prev , category: e.target.value }))}
                                value={formData.category}
                                className='bg-transparent w-full h-full outline-none text-[10px] font-bold uppercase tracking-widest'
                                />
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">ID: {managingItem?._id}</span>
                        </div>

                        <input type="text" 
                        onChange={(e) => setFormData((prev) => ({ ...prev , title: e.target.value }))}
                        value={formData?.title}
                        className='bg-transparent border border-emerald-950 hover:bg-white/5 focus:bg-white/5 rounded-lg px-2 -ml-2 w-full outline-none transition-all text-xl md:text-2xl font-bold text-slate-100 placeholder:text-slate-700'
                        placeholder="Component Title"
                        />

                        <p className="text-sm text-slate-400 ml-1">Generated by <span className="text-emerald-400">@{managingItem?.author?.name || 'Unknown'}</span></p>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2 ml-1">
                            <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Generation Context / AI Prompt</label>
                        </div>
                        <textarea 
                        onChange={(e) => setFormData((prev) => ({ ...prev , prompt: e.target.value }))}
                        value={formData.prompt}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-slate-400 outline-none focus:border-emerald-500/40 focus:bg-emerald-500/5 transition-all resize-none min-h-20"
                        />
                    </div>
                    
                    <button 
                        onClick={() => setShowManagingPopUp(false)}
                        className="cursor-pointer absolute sm:relative top-4 right-4 sm:top-auto sm:right-auto p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                </header>

                {/* ----- Code / Preview Section ------- */}
                {/* ---------- Code & Preview ---------- */}
                <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-4 bg-[#000a05]">
                
                    {/* -- Toggle Tabs -- */}
                    <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit mb-4">
                        <button onClick={() => setModalTab('preview')} className={`cursor-pointer px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${modalTab === 'preview' ? 'bg-white/10 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Visual Preview</button>
                        <button onClick={() => setModalTab('code')} className={`cursor-pointer px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${modalTab === 'code' ? 'bg-white/10 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Source Code</button>
                    </div>

                    {/* ----- Main WorkSpace ----- */}
                    <div className="w-full flex-1 flex flex-col overflow-hidden custom-sandpack">
                        <SandpackProvider
                            key={managingItem?._id}
                            template="react"
                            theme={sandpackDark}
                            files={{ "/App.js": formData.code ||  '<h2>Component.io!</h2>' }}
                            options={{
                            externalResources: ["https://cdn.tailwindcss.com"],
                            }}
                            className="h-full flex-1 flex flex-col"
                        >
                        <SandpackLayout 
                            className="h-full w-full border-none bg-transparent" 
                        >
                        {/* ----- Preview Section ------ */}
                        {/* --------- Preview ---------- */}
                        {modalTab === 'preview' && (
                        <div className="absolute inset-0 flex items-center justify-center p-0 overflow-auto pattern-dots pattern-slate-700 pattern-bg-transparent pattern-size-4 pattern-opacity-20">
                            <SandpackPreview 
                            showRefreshButton={true}
                            showOpenInCodeSandbox={false}
                            className="h-full w-full"
                            />
                        </div>
                        )}

                        {/* ------ Code Section ------- */}
                        {/* ----------- Code ---------- */}
                        {modalTab === 'code' && (
                        <div className="w-full h-full bg-[#0d1117] p-1 overflow-auto">
                            <SandpackCodeEditor 
                            showLineNumbers 
                            showTabs={false}
                            wrapContent={false}
                            className="h-full w-full"
                            />
                        </div>
                        )}
                        </SandpackLayout>
                        {/* ----- Syncing Code ----- */}
                        <SyncCode setFormData={setFormData} currentCode={formData.code}/>
                        </SandpackProvider>
                    </div>

                </div>

                {/* ------ PopUp Footer Section -------- */}
                <footer className="p-4 md:p-6 border-t border-white/5 bg-[#00140a] flex flex-col-reverse sm:flex-row justify-between items-center gap-4 shrink-0">
                    <p className="text-xs text-slate-500 text-center sm:text-left">By deleting, this component will not be able to visible on any page.</p>
                
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        { !updated ? 
                        (<button onClick={() => {
                            UpdateComponent( managingItem?._id , formData );
                        }}
                        className="cursor-pointer flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-yellow-500 text-white border border-yellow-500/30 hover:bg-yellow-500/30 hover:text-yellow-500 font-bold text-sm"
                        >
                            Update
                        </button>) 
                        : 
                        (<button 
                        className="flex flex-row gap-1 justify-center items-center cursor-pointer flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-yellow-500/30 text-yellow-500 border-yellow-500/30  font-bold text-sm"
                        >
                            <MdFileDownloadDone /> Updated
                        </button>)
                        }
                        
                        <button onClick={() => {
                            HandleDeleteComponent( managingItem?._id )
                        }}
                        className="cursor-pointer flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-rose-500 text-white border border-rose-500/30 hover:bg-rose-500/30 hover:text-rose-500 font-bold text-sm"
                        >
                            { isDeleting ? 'Deleting..' : 'Delete' }
                        </button>
                    </div>
                </footer>

            </div>

        </div>
        )}

    </div>

  );
};

export default Admin;