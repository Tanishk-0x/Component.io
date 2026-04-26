import { useState } from 'react';

// --- Dummy Data For Components ---
const ALL_COMPONENTS = [
  { id: 1, title: "Modern User Profile Card", category: "Cards", author: "@codeai_gen", likes: "2.1k", views: "8.5k", color: "from-emerald-500 to-teal-900" },
  { id: 2, title: "Pill-Shaped Navbar", category: "Navbars", author: "@frontend_pro", likes: "1.8k", views: "5.2k", color: "from-cyan-500 to-blue-900" },
  { id: 3, title: "Holographic Credit Card", category: "Cards", author: "@tanishk_dev", likes: "3.4k", views: "12k", color: "from-fuchsia-500 to-purple-900" },
  { id: 4, title: "Glassmorphism Login", category: "Forms", author: "@react_ninja", likes: "4.2k", views: "15k", color: "from-rose-500 to-pink-900" },
  { id: 5, title: "Neon Music Player", category: "Widgets", author: "@ui_master", likes: "2.9k", views: "9.1k", color: "from-violet-500 to-indigo-900" },
  { id: 6, title: "Bento Box Dashboard", category: "Dashboards", author: "@tanishk_dev", likes: "5.1k", views: "18k", color: "from-amber-500 to-orange-900" },
  { id: 8, title: "Expanding Image Gallery", category: "Galleries", author: "@codeai_gen", likes: "3.8k", views: "11k", color: "from-blue-400 to-indigo-800" },
  { id: 9, title: "Dark Mode Hero", category: "Heroes", author: "@frontend_pro", likes: "6.2k", views: "22k", color: "from-slate-400 to-slate-800" },
  { id: 10, title: "Interactive Sidebar Menu", category: "Navbars", author: "@react_ninja", likes: "2.4k", views: "7.3k", color: "from-teal-400 to-emerald-800" },
  { id: 11, title: "Smooth Dropdown Select", category: "Forms", author: "@ui_master", likes: "1.1k", views: "3.5k", color: "from-purple-400 to-fuchsia-800" },
  { id: 12, title: "Crypto Ticker Widget", category: "Widgets", author: "@tanishk_dev", likes: "4.7k", views: "14k", color: "from-yellow-400 to-amber-800" },
];

// ----- Categories ----- 
const CATEGORIES = ["All", "Cards", "Navbars", "Forms", "Widgets", "Dashboards", "Sections", "Galleries", "Heroes"];

const ComponentCards = () => {

    // ------------- UseStates ------------
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    // -------- Filter Components ----------
    const filteredComponents = ALL_COMPONENTS.filter(comp => {
        const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            comp.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || comp.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

  return (

    <div className="min-h-screen w-full bg-[#000502] text-slate-200 font-sans overflow-y-auto relative flex flex-col py-10 md:py-12">
      
        {/* --- Background Glow Effect --- */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>


        {/* ------- Main Section --------- */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 z-10 flex flex-col gap-8 md:gap-10">
        
            {/* --- Header Controller Section --- */}
            {/* ---------- Filter/Search  ------- */}
            <section className="flex flex-col items-center text-center gap-6">
                <div className="space-y-3 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500">
                    Discover Components
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base lg:text-lg">
                    Explore our massive library of AI-generated, production-ready Tailwind CSS components. Copy, paste, and ship faster.
                    </p>
                </div>

                {/* ----- Search Bar ----- */}
                <div className="relative w-full max-w-2xl mt-4 group">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative flex items-center bg-[#00140a]/80 backdrop-blur-xl border border-emerald-500/30 rounded-2xl overflow-hidden shadow-lg">
                    <svg className="w-5 h-5 text-emerald-500 ml-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input 
                        type="text" 
                        placeholder="Search components, authors, or categories..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent py-4 pl-4 pr-6 text-slate-200 placeholder-slate-500 focus:outline-none text-sm md:text-base"
                    />
                    </div>
                </div>

                {/* ----- Category Filters ----- */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 w-full">
                    {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                        activeCategory === category
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                        }`}
                    >
                        {category}
                    </button>
                    ))}
                </div>
            </section>

            {/* --- Component Cards Wrapper --- */}
            <section className="mt-4">
          
                {/* --- Results Count --- */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-slate-200">
                        {activeCategory === "All" ? "All Components" : `${activeCategory} Components`}
                        <span className="ml-2 text-sm font-normal text-slate-500">({filteredComponents.length} results)</span>
                    </h2>
                    
                    {/* Optional Sort Dropdown could go here */}
                    <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                        Sort by Newest
                    </button>
                </div>

                {/* --- Cards Gird Container --- */}
                {filteredComponents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredComponents.map((comp) => (
                    // ----- CARDS -----
                    <div 
                    key={comp.id} 
                    className="group relative flex flex-col bg-[#00140a]/30 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)]"
                    >
                    
                    {/* ------------------ PREVIEW -------------- */}
                    {/* ----- Card Image / Abstract Preview ----- */}
                    <div className="h-48 w-full relative overflow-hidden bg-[#000502]">
                        {/* Dynamic Gradient Background based on mock data color */}
                        <div className={`absolute inset-0 bg-linear-to-br ${comp.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105`}></div>
                        
                        {/* Glass Overlay & Abstract UI Element */}
                        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="w-24 h-16 bg-white/5 border border-white/10 rounded-lg shadow-2xl group-hover:bg-white/10 transition-colors flex flex-col gap-2 p-2">
                                <div className="w-1/2 h-2 bg-white/20 rounded-full"></div>
                                <div className="w-full h-8 bg-white/10 rounded"></div>
                            </div>
                        </div>

                        {/* Category Badge Floating */}
                        <div className="absolute top-3 left-3 bg-[#000502]/80 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-wider text-slate-300 px-2.5 py-1 rounded-md">
                            {comp.category}
                        </div>
                    </div>

                    {/* ----- Card Content (Bottom) ----- */}
                    <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {comp.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">by <span className="text-emerald-500/80">{comp.author}</span></p>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                            {/* ----- Likes/Views (Stats) ----- */}
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                                {comp.likes}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                {comp.views}
                                </span>
                            </div>

                            {/* --- Action Button --- */}
                            <button className="text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-[#000502] px-3 py-1.5 rounded-md transition-colors flex items-center gap-1">
                                View <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>

                    </div>

                </div>
                ))}
                </div>
                ) : (
                // -------- Empty State (If No Result) ------
                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/1">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-200">No components found</h3>
                    <p className="text-slate-500 mt-2 text-sm">We couldn't find anything matching "{searchQuery}" in {activeCategory}.</p>
                    <button 
                        onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                        className="mt-6 px-6 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 border border-emerald-500/20 hover:text-emerald-950 rounded-lg text-sm font-semibold transition-all"
                    >
                        Clear Filters
                    </button>
                </div>
                )}

                {/* ------ Load More Button -------- */}
                {filteredComponents.length > 0 && (
                    <div className="flex justify-center mt-12">
                    <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin hidden" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Load More Components
                    </button>
                    </div>
                )}

            </section>

        </div>

    </div>

  );
};

export default ComponentCards;