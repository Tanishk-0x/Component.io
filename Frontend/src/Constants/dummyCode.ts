
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
import React from "react";

export default function EmeraldLandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-150px] left-[-120px] w-[420px] h-[420px] bg-emerald-500/20 blur-[140px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-180px] right-[-100px] w-[420px] h-[420px] bg-emerald-400/10 blur-[140px] rounded-full animate-pulse"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_40%)]"></div>

      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 md:px-20 py-7">
        
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.7)]">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          </div>

          <h1 className="text-2xl font-bold tracking-wide">
            Emerald<span className="text-emerald-400">Store</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm text-zinc-300">
          <a href="#" className="hover:text-emerald-400 transition">
            Home
          </a>

          <a href="#" className="hover:text-emerald-400 transition">
            Shop
          </a>

          <a href="#" className="hover:text-emerald-400 transition">
            Collection
          </a>

          <a href="#" className="hover:text-emerald-400 transition">
            Contact
          </a>
        </div>

        <button className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 font-semibold shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105">
          Explore
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-20 px-8 md:px-20 pt-20 pb-32">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8 backdrop-blur-xl">
              
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>

              <span className="text-sm text-emerald-300 tracking-wide">
                NEXT GENERATION ECOMMERCE
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Premium
              <span className="block text-emerald-400">
                Shopping
              </span>
              Experience
            </h1>

            <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-xl">
              Discover futuristic fashion and premium products crafted
              for modern lifestyle. Elegant design meets powerful shopping
              experience with immersive interactions.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              
              <button className="group px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 font-semibold shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105">
                Shop Now
              </button>

              <button className="px-8 py-4 rounded-2xl border border-emerald-500/30 bg-white/5 backdrop-blur-xl hover:bg-emerald-500/10 transition-all duration-300 hover:border-emerald-400">
                Explore Collection
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mt-16">
              
              <div>
                <h2 className="text-4xl font-bold text-emerald-400">
                  50K+
                </h2>
                <p className="text-zinc-500 mt-2">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-emerald-400">
                  120+
                </h2>
                <p className="text-zinc-500 mt-2">
                  Premium Products
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-emerald-400">
                  4.9★
                </h2>
                <p className="text-zinc-500 mt-2">
                  Customer Rating
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex items-center justify-center">
            
            {/* Floating Glow */}
            <div className="absolute w-[420px] h-[420px] bg-emerald-500/20 blur-[120px] rounded-full animate-pulse"></div>

            {/* Product Card */}
            <div className="relative w-[340px] h-[480px] rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.25)] hover:scale-105 transition-all duration-500">
              
              {/* Top Blur */}
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-500/20 to-transparent"></div>

              {/* Product */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
                
                {/* Fake Shoe */}
                <div className="relative">
                  
                  <div className="w-64 h-40 bg-gradient-to-br from-emerald-300 to-emerald-600 rounded-[40px] rotate-[-20deg] shadow-[0_30px_60px_rgba(16,185,129,0.45)]"></div>

                  <div className="absolute top-8 left-10 w-40 h-8 bg-black/20 rounded-full blur-xl"></div>

                  <div className="absolute top-5 right-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20"></div>
                </div>

                <div className="mt-14 text-center">
                  
                  <h2 className="text-3xl font-bold">
                    Emerald Runner
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    Futuristic premium sneakers with ultra comfort
                    and modern design.
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    
                    <div className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-white"></div>

                    <div className="w-5 h-5 rounded-full bg-white/30"></div>

                    <div className="w-5 h-5 rounded-full bg-zinc-700"></div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    
                    <h3 className="text-3xl font-bold text-emerald-400">
                      $249
                    </h3>

                    <button className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute top-10 right-0 animate-bounce">
              <div className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <p className="text-sm text-zinc-300">
                  Free Shipping
                </p>
              </div>
            </div>

            <div className="absolute bottom-10 left-0 animate-pulse">
              <div className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <p className="text-sm text-zinc-300">
                  Premium Quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
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