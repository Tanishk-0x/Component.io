import { useState } from 'react';

// ------ Dummy Top Components Data --------
const TOP_COMPONENTS: any = [
  { id: 1, title: "Modern User Profile Card", category: "Cards", author: "@codeai_gen", likes: 12540, views: 45200, color: "from-emerald-400 to-cyan-500" },
  { id: 2, title: "Bento Box Dashboard", category: "Dashboards", author: "@ui_master", likes: 10230, views: 38100, color: "from-indigo-500 to-purple-500" },
  { id: 3, title: "Holographic Credit Card", category: "Cards", author: "@tanishk_dev", likes: 9850, views: 34000, color: "from-fuchsia-500 to-rose-500" },
  { id: 4, title: "Glassmorphism Login", category: "Forms", author: "@react_ninja", likes: 8400, views: 29500, color: "from-blue-400 to-emerald-400" },
  { id: 5, title: "Pill-Shaped Navbar", category: "Navbars", author: "@frontend_pro", likes: 7600, views: 22000, color: "from-amber-400 to-orange-500" },
  { id: 6, title: "Neon Music Player", category: "Widgets", author: "@codeai_gen", likes: 6200, views: 18400, color: "from-pink-500 to-violet-500" },
  { id: 7, title: "Animated Pricing Table", category: "Sections", author: "@design_god", likes: 5900, views: 16200, color: "from-cyan-400 to-blue-600" },
  { id: 8, title: "Expanding Image Gallery", category: "Galleries", author: "@tanishk_dev", likes: 5100, views: 14800, color: "from-teal-400 to-emerald-600" },
  { id: 9, title: "Dark Mode Hero Section", category: "Heroes", author: "@ui_master", likes: 4800, views: 12000, color: "from-slate-400 to-gray-600" },
  { id: 10, title: "Table with Action Menu", category: "Tables", author: "@react_ninja", likes: 4200, views: 11500, color: "from-yellow-400 to-emerald-500" },
];

const Top = () => {

  // ---------- UseStates -------------
  const [filter, setFilter] = useState('likes'); // 'likes' or 'views'

  // ----- Sort Based On Filter (likes/views) -----
  const sortedComponents = [...TOP_COMPONENTS].sort((a, b) => b[filter] - a[filter]);

  // ----- Format Number (e.g., 12540 -> 12.5k) -----
  const formatNumber = (num: number) => {
    return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
  };

  // ---- Function For Ranked Based Styling ----
  const getRankStyle = (index: number) => {
    if (index === 0) return { text: "text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600", border: "border-yellow-500/50 bg-yellow-500/10", shadow: "shadow-[0_0_30px_rgba(234,179,8,0.2)]" }; // Gold
    if (index === 1) return { text: "text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-500", border: "border-slate-400/50 bg-slate-400/10", shadow: "shadow-[0_0_20px_rgba(148,163,184,0.15)]" }; // Silver
    if (index === 2) return { text: "text-transparent bg-clip-text bg-gradient-to-b from-amber-600 to-orange-800", border: "border-amber-700/50 bg-amber-700/10", shadow: "shadow-[0_0_20px_rgba(180,83,9,0.15)]" }; // Bronze
    return { text: "text-slate-600", border: "border-white/5 bg-white/[0.02] hover:bg-white/5", shadow: "" }; // Normal
  };

  return (

    <div className="min-h-screen w-full bg-[#000502] text-slate-200 font-sans overflow-y-auto relative flex flex-col py-10 md:py-16">
      
      {/* --- Background Glow Effect --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* -------- Main Section -------- */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 z-10 flex flex-col gap-8">
        
        {/* ----- Header Section ----- */}
        <header className="flex flex-col items-center text-center gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg>
            Wall of Fame
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-slate-100 to-slate-400">
            Top 10 Components
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl">
            The most loved and widely used AI-generated Tailwind components by our developer community.
          </p>
          
          {/* --- Toggles Button - (likes/views) --- */}
          <div className="flex bg-[#00140a] p-1 border border-white/10 rounded-xl mt-4">
            <button 
              onClick={() => setFilter('likes')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${filter === 'likes' ? 'bg-white/10 text-emerald-400 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Most Liked
            </button>
            <button 
              onClick={() => setFilter('views')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${filter === 'views' ? 'bg-white/10 text-cyan-400 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Most Viewed
            </button>
          </div>

        </header>

        {/* ------ Lists Of Components ----- */}
        {/* ------- LEADERBOARD LIST ------- */}
        <div className="flex flex-col gap-3 md:gap-4">
          {sortedComponents.map((comp, index) => {
            const rankStyle = getRankStyle(index);
            const isTop3 = index < 3;

            return (

              <div 
                key={comp.id} 
                className={`group flex flex-col sm:flex-row items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${rankStyle.border} ${rankStyle.shadow} hover:-translate-y-1`}
              >
                {/* ----- Rank Number ----- */}
                <div className="flex justify-center shrink-0 w-full sm:w-auto text-center sm:text-left border-b sm:border-b-0 border-white/5 pb-2 sm:pb-0 mb-2 sm:mb-0">
                  <span className={`text-4xl md:text-5xl font-black italic ${rankStyle.text}`}>
                    #{index + 1}
                  </span>
                </div>

                {/* ---- Abstract Thumbnail ----- */}
                <div className="w-full sm:w-28 md:w-32 h-20 shrink-0 rounded-xl overflow-hidden relative border border-white/10">
                  <div className={`absolute inset-0 bg-linear-to-tr ${comp.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center">
                    {/* UI Icon Inside Thumbnail */}
                    <div className="w-10 h-6 bg-white/10 rounded border border-white/20 shadow-sm"></div>
                    </div>
                </div>


                {/* ---- Component Details ----- */}
                <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded tracking-wider border border-white/5">{comp.category}</span>
                    {isTop3 && <span className="text-[10px] uppercase font-bold text-emerald-900 bg-emerald-400 px-2 py-0.5 rounded tracking-wider shadow-[0_0_10px_rgba(52,211,153,0.5)]">Trending</span>}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{comp.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">by <span className="text-emerald-500/80">{comp.author}</span></p>
                </div>

                {/* ---- Stats: Likes & Views ----- */}
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  
                  {/* Stats */}
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg> 
                        Likes
                      </span>
                      <span className={`text-lg font-bold ${filter === 'likes' ? 'text-emerald-400' : 'text-slate-300'}`}>{formatNumber(comp.likes)}</span>
                    </div>
                    <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        Views
                      </span>
                      <span className={`text-lg font-bold ${filter === 'views' ? 'text-cyan-400' : 'text-slate-300'}`}>{formatNumber(comp.views)}</span>
                    </div>
                  </div>

                  {/* ---- View Button ---- */}
                  <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-bold text-slate-300 group-hover:bg-emerald-500 group-hover:text-[#000502] group-hover:border-emerald-400 transition-all shadow-lg flex items-center justify-center gap-2">
                    Open <span className="hidden sm:inline">Component</span>
                    <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
                
              </div>

            );

          })}

        </div>

      </div>

    </div>

  );
};

export default Top; 