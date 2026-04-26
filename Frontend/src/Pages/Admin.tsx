import { useState } from 'react';

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

    // --------- UseStates ---------
    const [queue, setQueue] = useState(INITIAL_QUEUE);
    const [reviewingItem, setReviewingItem] = useState(null); 
    const [modalTab, setModalTab] = useState('preview'); 
    const [workType , setWorkType] = useState('reviews_queue'); 

    // --------- Approve Component -----------
    const handleApprove = (id: any) => {
        // Handle Approve Logic 
        setQueue(queue.filter(item => item.id !== id));
        setReviewingItem(null);
    };

    // --------- Reject Component -----------
    const handleReject = (id: any) => {
        // Handle Reject Logic 
        setQueue(queue.filter(item => item.id !== id));
        setReviewingItem(null);
    };

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
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-40 md:w-full shrink-0 text-sm font-semibold transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    Review Queue
                    <span className="ml-auto bg-emerald-500 text-[#000502] text-[10px] px-2 py-0.5 rounded-full">{queue.length}</span>
                </button>
                <button onClick={() => setWorkType('users_queue')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 w-40 md:w-full shrink-0 text-sm font-medium transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    Users Queue
                </button>
                <button onClick={() => setWorkType('components_queue')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 w-40 md:w-full shrink-0 text-sm font-medium transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    Components
                </button>
            </nav>
            
            <div className="mt-auto p-4 hidden md:block">
                <button className="w-full py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-sm font-medium transition-all">
                    Exit Admin
                </button>
            </div>
        </aside>

        {/* --- Main Dashboard Content --- */}
        {/* --------- Review Queue ------- */}
        { workType === 'reviews_queue' && 
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative custom-scrollbar">
            
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100">Component Review Hub</h1>
                <p className="text-slate-400 text-sm mt-1">Review user-generated components before they go live on the public explore page.</p>
            </header>

            {/* ---- Stats Options ---- */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg></div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Public</span>
                    <span className="text-3xl font-black text-white">8,402</span>
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
                    <span className="text-3xl font-black text-white">45.2k</span>
                    <span className="text-cyan-400 text-[10px] font-bold mt-2 bg-cyan-500/10 w-fit px-2 py-0.5 rounded">All time usage</span>
                </div>
            </section>

            {/* Review Queue List */}
            <section>
                <div className="flex items-center justify-between mb-4 clear-both">
                    <h2 className="text-lg font-bold text-slate-200">Action Required</h2>
                    <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Refresh Queue</button>
                </div>

                {/* --------- Items Listed Section -------- */}
                <div className="bg-[#000a05] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* ---------- Table Header ----------- */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
                        <div className="col-span-5">Component Details</div>
                        <div className="col-span-3">Author</div>
                        <div className="col-span-2">Date Generated</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* ----- Table Content / Items Lists ----- */}
                    {/* ------- Map To Render All Fields ------ */}
                    {queue.length > 0 ? queue.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                        
                        {/* Mobile Label & Details */}
                        <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-linear-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-sm md:text-base font-bold text-slate-200">{item.title}</h3>
                                <div className="flex md:hidden items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400">{item.author}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                    <span className="text-xs text-slate-500">{item.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- Author & Date --- */}
                        <div className="hidden md:block col-span-3 ">
                            <span className="text-sm text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{item.author}</span>
                        </div>
                        <div className="hidden md:block col-span-2 text-sm text-slate-500">
                            {item.date}
                        </div>

                        {/* ----- Action Button ------ */}
                        <div className="col-span-1 md:col-span-2 flex justify-end">
                            <button 
                                onClick={() => setReviewingItem(item)}
                                className="w-full md:w-auto px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-[#000502] rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                            >
                                Open Review <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </button>
                        </div>

                    </div>

                    )) : (

                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-200">Queue is Empty</h3>
                        <p className="text-slate-500 text-sm mt-1">All components have been reviewed. Great job admin!</p>
                    </div>

                    )}

                </div>

            </section>

        </main>
        }

        {/* ----- REVIEW MODAL (OVERLAY) ---- */}
        {reviewingItem && (
        <div className="fixed inset-0 z-50 bg-[#000502]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-12">
            
            <div className="bg-[#00140a] border border-white/10 rounded-3xl w-full max-w-5xl h-full max-h-[85vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
                
                {/* ----- PopUp Header ----- */}
                <header className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/2 shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">Pending Review</span>
                            <span className="text-xs text-slate-500 font-mono">ID: {reviewingItem.id}</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-100">{reviewingItem.title}</h2>
                        <p className="text-sm text-slate-400 mt-1">Generated by <span className="text-emerald-400">{reviewingItem.author}</span></p>
                    </div>
                
                    <button 
                        onClick={() => setReviewingItem(null)}
                        className="absolute sm:relative top-4 right-4 sm:top-auto sm:right-auto p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </header>

                {/* ----- Code / Preview Section ------- */}
                {/* ---------- Code & Preview ---------- */}
                <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-6 bg-[#000a05]">
                
                    {/* -- Toggle Tabs -- */}
                    <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit mb-4">
                        <button onClick={() => setModalTab('preview')} className={`px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${modalTab === 'preview' ? 'bg-white/10 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Visual Preview</button>
                        <button onClick={() => setModalTab('code')} className={`px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${modalTab === 'code' ? 'bg-white/10 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>Source Code</button>
                    </div>

                    {/* ----- Main WorkSpace ----- */}
                    <div className="flex-1 bg-[#000502]/50 border border-white/5 rounded-2xl overflow-hidden relative shadow-inner">
                        {/* ----- Preview Section ------ */}
                        {/* --------- Preview ---------- */}
                        {modalTab === 'preview' && (
                        <div className="absolute inset-0 flex items-center justify-center p-8 overflow-auto pattern-dots pattern-slate-700 pattern-bg-transparent pattern-size-4 pattern-opacity-20">
                            {reviewingItem.preview}
                        </div>
                        )}

                        {/* ------ Code Section ------- */}
                        {/* ----------- Code ---------- */}
                        {modalTab === 'code' && (
                        <div className="w-full h-full bg-[#0d1117] p-6 overflow-auto">
                            <pre className="text-sm font-mono text-emerald-300/80 whitespace-pre-wrap sm:whitespace-pre">
                            <code>{reviewingItem.code}</code>
                            </pre>
                        </div>
                        )}
                    </div>

                </div>

                {/* ------ PopUp Footer Section -------- */}
                <footer className="p-4 md:p-6 border-t border-white/5 bg-[#00140a] flex flex-col-reverse sm:flex-row justify-between items-center gap-4 shrink-0">
                    <p className="text-xs text-slate-500 text-center sm:text-left">By approving, this component will be visible to all users on the Explore page.</p>
                
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button 
                        onClick={() => handleReject(reviewingItem.id)}
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all font-bold text-sm"
                        >
                            Reject & Delete
                        </button>
                        <button 
                        onClick={() => handleApprove(reviewingItem.id)}
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-500 text-[#000502] hover:bg-emerald-400 transition-all font-black text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Approve & Publish
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
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100">Users Review Hub</h1>
                <p className="text-slate-400 text-sm mt-1">Review user-generated components before they go live on the public explore page.</p>
            </header>

            {/* ---- Stats Options ---- */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg></div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Public</span>
                    <span className="text-3xl font-black text-white">8,402</span>
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
                    <span className="text-3xl font-black text-white">45.2k</span>
                    <span className="text-cyan-400 text-[10px] font-bold mt-2 bg-cyan-500/10 w-fit px-2 py-0.5 rounded">All time usage</span>
                </div>
            </section>

            {/* Review Queue List */}
            <section>
                <div className="flex items-center justify-between mb-4 clear-both">
                    <h2 className="text-lg font-bold text-slate-200">Action Required</h2>
                    <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Refresh Queue</button>
                </div>

                {/* --------- Items Listed Section -------- */}
                <div className="bg-[#000a05] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* ---------- Table Header ----------- */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
                        <div className="col-span-5">Component Details</div>
                        <div className="col-span-3">Author</div>
                        <div className="col-span-2">Date Generated</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* ----- Table Content / Items Lists ----- */}
                    {/* ------- Map To Render All Fields ------ */}
                    {queue.length > 0 ? queue.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                        
                        {/* Mobile Label & Details */}
                        <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-linear-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-sm md:text-base font-bold text-slate-200">{item.title}</h3>
                                <div className="flex md:hidden items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400">{item.author}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                    <span className="text-xs text-slate-500">{item.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- Author & Date --- */}
                        <div className="hidden md:block col-span-3 ">
                            <span className="text-sm text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{item.author}</span>
                        </div>
                        <div className="hidden md:block col-span-2 text-sm text-slate-500">
                            {item.date}
                        </div>

                        {/* ----- Action Button ------ */}
                        <div className="col-span-1 md:col-span-2 flex justify-end">
                            <button 
                                onClick={() => setReviewingItem(item)}
                                className="w-full md:w-auto px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-[#000502] rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                            >
                                Open Review <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </button>
                        </div>

                    </div>

                    )) : (

                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-200">Queue is Empty</h3>
                        <p className="text-slate-500 text-sm mt-1">All components have been reviewed. Great job admin!</p>
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
                <p className="text-slate-400 text-sm mt-1">Review user-generated components before they go live on the public explore page.</p>
            </header>

            {/* ---- Stats Options ---- */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg></div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Public</span>
                    <span className="text-3xl font-black text-white">8,402</span>
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
                    <span className="text-3xl font-black text-white">45.2k</span>
                    <span className="text-cyan-400 text-[10px] font-bold mt-2 bg-cyan-500/10 w-fit px-2 py-0.5 rounded">All time usage</span>
                </div>
            </section>

            {/* Review Queue List */}
            <section>
                <div className="flex items-center justify-between mb-4 clear-both">
                    <h2 className="text-lg font-bold text-slate-200">Action Required</h2>
                    <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Refresh Queue</button>
                </div>

                {/* --------- Items Listed Section -------- */}
                <div className="bg-[#000a05] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* ---------- Table Header ----------- */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
                        <div className="col-span-5">Component Details</div>
                        <div className="col-span-3">Author</div>
                        <div className="col-span-2">Date Generated</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* ----- Table Content / Items Lists ----- */}
                    {/* ------- Map To Render All Fields ------ */}
                    {queue.length > 0 ? queue.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                        
                        {/* Mobile Label & Details */}
                        <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-linear-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-sm md:text-base font-bold text-slate-200">{item.title}</h3>
                                <div className="flex md:hidden items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400">{item.author}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                    <span className="text-xs text-slate-500">{item.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- Author & Date --- */}
                        <div className="hidden md:block col-span-3 ">
                            <span className="text-sm text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{item.author}</span>
                        </div>
                        <div className="hidden md:block col-span-2 text-sm text-slate-500">
                            {item.date}
                        </div>

                        {/* ----- Action Button ------ */}
                        <div className="col-span-1 md:col-span-2 flex justify-end">
                            <button 
                                onClick={() => setReviewingItem(item)}
                                className="w-full md:w-auto px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-[#000502] rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                            >
                                Open Review <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </button>
                        </div>

                    </div>

                    )) : (

                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-200">Queue is Empty</h3>
                        <p className="text-slate-500 text-sm mt-1">All components have been reviewed. Great job admin!</p>
                    </div>

                    )}

                </div>

            </section>

        </main>
        }

    </div>

  );
};

export default Admin;