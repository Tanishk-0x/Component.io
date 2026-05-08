
export const Home_Dashboard = `
    import React, { useState, useEffect } from "react";

export default function EmeraldBarGraph() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger the bar growth animation smoothly after the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const graphData = [
    { label: "Mon", value: 35 },
    { label: "Tue", value: 65 },
    { label: "Wed", value: 45 },
    { label: "Thu", value: 90 },
    { label: "Fri", value: 75 },
    { label: "Sat", value: 100 },
    { label: "Sun", value: 55 },
  ];

  const maxValue = 100;

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4 font-sans w-full">
      <div className="w-full max-w-lg bg-[#00140a] rounded-3xl border border-emerald-900/40 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        
        {/* Ambient Corner Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Header Section */}
        <div className="flex items-end justify-between mb-8 relative z-10">
          <div>
            <h2 className="text-emerald-500/70 text-xs font-bold tracking-widest uppercase mb-1">Weekly Analytics</h2>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-white tracking-tight">8,459</span>
              <span className="flex items-center text-xs font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 shadow-inner">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                +24%
              </span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-zinc-900 border border-emerald-900/50 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-zinc-950 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8a2 2 0 11-4 0 2 2 0 014 0zM12 14a2 2 0 11-4 0 2 2 0 014 0zM12 20a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </button>
        </div>

        {/* Graph Section */}
        <div className="relative h-56 w-full flex items-end justify-between gap-2 sm:gap-3 z-10 mt-12">
          
          {/* Background Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="w-full h-px bg-zinc-600 border-b border-dashed border-zinc-600"></div>
            <div className="w-full h-px bg-zinc-600 border-b border-dashed border-zinc-600"></div>
            <div className="w-full h-px bg-zinc-600 border-b border-dashed border-zinc-600"></div>
            <div className="w-full h-px bg-zinc-600 border-b border-dashed border-zinc-600"></div>
          </div>

          {/* Render Bars */}
          {graphData.map((item, index) => {
            const heightPercentage = (item.value / maxValue) * 100;
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div 
                key={index} 
                className="relative flex flex-col items-center justify-end w-full h-full cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Floating Tooltip */}
                <div 
                  className={"absolute -top-12 flex flex-col items-center transition-all duration-300 z-20 " + (isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}
                >
                  <div className="bg-emerald-400 text-zinc-950 text-xs font-black px-3 py-1.5 rounded-lg shadow-[0_10px_20px_rgba(16,185,129,0.5)]">
                    {item.value}
                  </div>
                  <div className="w-2.5 h-2.5 bg-emerald-400 rotate-45 -mt-1.5"></div>
                </div>

                {/* The Animated Bar */}
                <div 
                  className={"w-full max-w-12 rounded-t-xl transition-all duration-1000 ease-out relative overflow-hidden " + (isAnyHovered && !isHovered ? "bg-zinc-800" : "bg-linear-to-t from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]")}
                  style={{ 
                    height: isLoaded ? heightPercentage + "%" : "0%"
                  }}
                >
                  {/* Inner shine effect on hover */}
                  <div className={"absolute inset-0 bg-white/20 transition-opacity duration-300 " + (isHovered ? "opacity-100" : "opacity-0")}></div>
                </div>

                {/* X-Axis Day Label */}
                <span className={"mt-4 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 " + (isHovered ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "text-zinc-500")}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
` ; 

export const Home_LandingPage = `
import React, { useState, useEffect } from "react";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const baseAnim = "transition-all duration-1000 ease-out transform ";
  const animateUp = baseAnim + (isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0");
  const animateRight = baseAnim + (isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0");
  const animateLeft = baseAnim + (isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0");

  return (
    <div className="relative min-h-screen bg-zinc-950 text-slate-200 font-sans overflow-hidden flex flex-col w-full">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-emerald-600/20 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-teal-600/20 blur-[150px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      {/* Navigation */}
      <nav className={"relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between " + animateUp}>
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 bg-linear-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <div className="w-3 h-3 bg-zinc-950 rounded-full"></div>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            Chrono<span className="text-emerald-500">X</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">Watches</a>
          <a href="#" className="text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors">Accessories</a>
          <a href="#" className="text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors">Our Story</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-emerald-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <button className="relative text-zinc-400 hover:text-emerald-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-center gap-12">
        
        {/* Left Typography Area */}
        <div className={"w-full lg:w-1/2 flex flex-col items-start " + animateRight}>
          <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            New Horizon Series
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
            Time, <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-600">Redefined.</span>
          </h1>
          
          <p className="text-zinc-400 text-lg mb-10 max-w-md leading-relaxed font-medium">
            Crafted with aerospace-grade titanium and an infinite-edge sapphire display. The ultimate smartwatch for the modern pioneer.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-zinc-950 font-black text-sm uppercase tracking-wide rounded-2xl hover:bg-emerald-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3">
              Shop Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold text-sm uppercase tracking-wide rounded-2xl border-2 border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300 flex items-center justify-center">
              Explore Specs
            </button>
          </div>
        </div>

        {/* Right Image/Showcase Area */}
        <div className={"w-full lg:w-1/2 relative flex items-center justify-center h-100 lg:h-150 " + animateLeft}>
          
          {/* Animated Background Circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-75 h-75 md:w-112.5 md:h-112.5 rounded-full border border-emerald-500/20 animate-[spin_20s_linear_infinite] flex items-center justify-center">
              <div className="w-[70%] h-[70%] rounded-full border border-dashed border-emerald-500/30"></div>
            </div>
          </div>

          {/* Product Image Container */}
          <div className="relative z-20 w-full max-w-87.5 md:max-w-100 transform transition-transform duration-700 hover:scale-105">
            <div className="animate-bounce" style={{ animationDuration: "3s" }}>
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" 
                alt="Premium Smartwatch" 
                className="w-full h-auto object-cover rounded-[3rem] shadow-[0_30px_60px_rgba(16,185,129,0.2)] -rotate-12"
              />
            </div>
            
            {/* Floating Price Tag */}
            <div className="absolute -left-4 md:-left-8 bottom-10 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 px-5 py-3 rounded-2xl shadow-2xl flex flex-col items-start">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Pre-Order Price</span>
              <span className="text-2xl font-black text-white">$299.00</span>
            </div>
          </div>

        </div>
      </main>

      {/* Feature Footer */}
      <footer className={"relative z-20 w-full border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-xl py-8 mt-auto " + animateUp}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
          
          <div className="flex items-center gap-4 sm:px-4 md:px-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">2-Year Warranty</h3>
              <p className="text-zinc-500 text-xs mt-1">Full coverage on all parts.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:px-4 md:px-6 pt-6 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Free Shipping</h3>
              <p className="text-zinc-500 text-xs mt-1">Delivered securely to you.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:px-4 md:px-6 pt-6 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">30-Day Returns</h3>
              <p className="text-zinc-500 text-xs mt-1">Not satisfied? Return it.</p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
` ; 

export const Home_Card = `
import React from "react";

export default function EmeraldProductCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4 w-full">
      <div className="w-64 bg-zinc-900 rounded-3xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] p-3 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="relative w-full h-48 rounded-2xl bg-zinc-800 overflow-hidden mb-4">
          <img
            src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop"
            alt="Emerald Sneakers"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
          <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500 text-zinc-950 text-[10px] font-black rounded-md uppercase tracking-wider animate-pulse shadow-lg">
            New Drop
          </div>
          <button className="absolute bottom-2 right-2 w-8 h-8 bg-zinc-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-emerald-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-500 hover:text-zinc-950">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
        </div>
        <div className="px-1">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-emerald-400 text-xs">★</span>
            <span className="text-zinc-300 text-xs font-bold">4.9</span>
            <span className="text-zinc-500 text-[10px]">(128)</span>
          </div>
          <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-emerald-400 transition-colors duration-300">
            AeroX Emerald
          </h3>
          <p className="text-zinc-400 text-xs line-clamp-2 mb-4">
            Premium lightweight sneakers engineered for urban exploration and ultimate daily comfort.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[10px] line-through decoration-emerald-500/50">$189.00</span>
              <span className="text-emerald-400 font-black text-lg">$149.00</span>
            </div>
            <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold transition-all duration-300 hover:bg-emerald-500 hover:text-zinc-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 flex items-center gap-2 group/btn">
              <span>Add</span>
              <svg className="w-3 h-3 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
` ; 