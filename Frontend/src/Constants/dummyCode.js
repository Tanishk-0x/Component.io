
const Home_Dashboard = `
    import React, { useState } from 'react';

const ResponsiveEmeraldDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const stats = [
    { label: 'Revenue', value: '$128.4k', change: '+14%', trend: 'up' },
    { label: 'Latency', value: '24ms', change: '-5ms', trend: 'down' },
    { label: 'Uptime', value: '99.99%', change: '+0.01%', trend: 'up' },
    { label: 'Errors', value: '0.02%', change: '-1.1%', trend: 'down' }
  ];

  return (
    <div className="flex h-screen bg-black text-emerald-50/80 font-sans selection:bg-emerald-500/30 overflow-hidden text-[13px]">
      <div className={
        "fixed inset-y-0 left-0 z-50 w-56 bg-emerald-950/40 backdrop-blur-2xl border-r border-emerald-900/30 transform transition-transform duration-300 lg:relative lg:translate-x-0 " + 
        (isSidebarOpen ? "translate-x-0" : "-translate-x-full")
      }>
        <div className="p-5 flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            Z
          </div>
          <span className="text-lg font-black tracking-tighter text-emerald-500">ZENITH</span>
        </div>
        
        <nav className="px-3 space-y-1">
          {['Overview', 'Analytics', 'Network', 'Vault', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => { setActiveTab(item); setSidebarOpen(false); }}
              className={"w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 " + 
                (activeTab === item 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner" 
                  : "text-emerald-900/50 hover:text-emerald-400 hover:bg-white/5")
              }
            >
              <div className={"w-1 h-1 rounded-full " + (activeTab === item ? "bg-emerald-400 shadow-[0_0_5px_#34d399]" : "bg-transparent")}></div>
              <span className="font-bold tracking-tight">{item}</span>
            </button>
          ))}
        </nav>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-950/20 via-black to-black">
        <header className="h-14 flex items-center justify-between px-4 lg:px-8 border-b border-emerald-900/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-emerald-500"
            >
              ☰
            </button>
            <h2 className="font-bold text-white tracking-tight hidden sm:block">{activeTab}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-emerald-950/30 border border-emerald-900/40 rounded-lg px-3 py-1 items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-mono text-emerald-500/80">CORE_SYNC_ACTIVE</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-emerald-600 to-emerald-400 border border-white/10"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-emerald-950/5 border border-emerald-900/20 p-4 rounded-2xl hover:bg-emerald-500/5 transition-all">
                <p className="text-emerald-800 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <span className={"text-[10px] font-bold " + (stat.trend === 'up' ? "text-emerald-500" : "text-rose-500")}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            <div className="lg:col-span-8 space-y-4 lg:space-y-6">
              <div className="bg-emerald-950/5 border border-emerald-900/20 rounded-4xl p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-emerald-100">Telemetry Stream</h3>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-emerald-800 rounded-full"></div>)}
                  </div>
                </div>
                
                <div className="h-48 flex items-end justify-between gap-1 sm:gap-2">
                  {[20, 40, 30, 70, 50, 90, 60, 80, 40, 95, 30, 50, 70, 40, 60].map((h, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div 
                        style={{ height: h + '%' }} 
                        className="w-full bg-emerald-500/10 border-t border-emerald-500/40 rounded-sm group-hover:bg-emerald-500/30 transition-all"
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-3xl p-5">
                  <h4 className="font-bold text-emerald-400 mb-4 text-[11px] uppercase tracking-widest">Active Threads</h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between bg-white/5 p-2 rounded-xl border border-white/5">
                        <span className="text-xs">Thread_{i}04</span>
                        <span className="text-[10px] text-emerald-600 font-mono">RUNNING</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-3xl p-5">
                  <h4 className="font-bold text-emerald-400 mb-4 text-[11px] uppercase tracking-widest">System Logs</h4>
                  <div className="font-mono text-[10px] text-emerald-900 leading-relaxed">
                    <p>{">"} INITIALIZING_SYSCALL...</p>
                    <p>{">"} KERNEL_OK [200ms]</p>
                    <p className="text-emerald-700">{">"} CONNECTION_ENCRYPTED</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-emerald-950/10 border border-emerald-900/20 rounded-4xl p-6">
              <h3 className="font-bold text-emerald-100 mb-6">Security Nodes</h3>
              <div className="space-y-4">
                {[
                  { id: 'Alpha', val: '98%', c: 'bg-emerald-500' },
                  { id: 'Sigma', val: '42%', c: 'bg-emerald-500' },
                  { id: 'Delta', val: '76%', c: 'bg-emerald-500' }
                ].map((node) => (
                  <div key={node.id} className="group">
                    <div className="flex justify-between text-[11px] mb-2 font-bold uppercase tracking-tighter">
                      <span>Node {node.id}</span>
                      <span className="text-emerald-500">{node.val}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={"h-full transition-all duration-1000 " + node.c} 
                        style={{ width: node.val }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-900/20">
                <div className="flex items-center gap-3 mb-6 p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                  <p className="text-[10px] font-black uppercase text-emerald-500">Firewall Secure</p>
                </div>
                <button className="w-full py-3 bg-emerald-500 text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                  SYSTEM OVERRIDE
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResponsiveEmeraldDashboard;
` ; 

const Home_LandingPage = `
    import React, { useState, useEffect } from 'react';

const AnimatedEmeraldLanding = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const fadeIn = loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
  const delay1 = loaded ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8';
  const delay2 = loaded ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8';
  const delay3 = loaded ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8';

  return (
    <div className="min-h-screen bg-black text-emerald-50/90 font-sans antialiased overflow-hidden selection:bg-emerald-500/30">
      
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-200 h-200 bg-emerald-950/20 rounded-full blur-[128px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-160 h-160 bg-emerald-900/10 rounded-full blur-[128px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIWMjB6TTAgMjBoMjB2MjBIMFYyMHoyMCAwaDIwdjIwSDIwVjB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-lg border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-md opacity-30"></div>
              <div className="relative w-9 h-9 bg-linear-to-br from-emerald-400 to-emerald-700 rounded-lg flex items-center justify-center text-black font-black text-lg">
                Z
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-emerald-500">ZENITH<span className='text-emerald-100/60'>.AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-emerald-100/70">
            {['Solutions', 'Technology', 'Company', 'Careers'].map(item => (
              <a key={item} href="#" className="hover:text-emerald-400 transition-colors duration-300">{item}</a>
            ))}
          </div>
          <button className="px-5 py-2.5 text-sm font-bold bg-emerald-950/50 text-emerald-300 rounded-full border border-emerald-900/50 hover:bg-emerald-900/50 transition-colors">
            Request Demo
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24 md:pt-40 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-6 space-y-8 text-center md:text-left">
            <div className={'inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 transition-all duration-1000 ' + fadeIn}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#34d399]"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Now in Public Beta</span>
            </div>
            
            <h1 className={'text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white transition-all duration-1000 ' + delay1}>
              Predictive <span className="text-emerald-500 relative">Intelligence
                <span className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full blur-[2px]"></span>
              </span> for Modern Enterprise
            </h1>
            
            <p className={'text-xl text-emerald-100/70 max-w-2xl mx-auto md:mx-0 transition-all duration-1000 ' + delay2}>
              Zenith.AI leverages autonomous neural agents to anticipate market shifts, optimize supply chains, and secure infrastructure before challenges arise. Experience the future of proactive decision making.
            </p>
            
            <div className={'flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start transition-all duration-1000 ' + delay3}>
              <button className="px-8 py-4 w-full sm:w-auto bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                Launch Platform
              </button>
              <button className="flex items-center gap-3 text-emerald-300 group hover:text-emerald-100 transition-colors duration-300">
                <span className="w-10 h-10 flex items-center justify-center rounded-full border border-emerald-800/60 group-hover:border-emerald-600 transition-colors">
                   ▶
                </span>
                <span className='font-bold text-sm'>Watch Overview</span>
              </button>
            </div>
          </div>

          <div className={'md:col-span-6 relative transition-all duration-1000 delay-500 ' + fadeIn}>
            <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-10 rounded-full scale-110"></div>
            <div className="relative bg-emerald-950/20 p-4 sm:p-6 rounded-3xl border border-emerald-900/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-5/4 flex flex-col group">
              
              <div className="flex items-center gap-2 mb-5">
                {[1, 2, 3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-emerald-900 group-hover:bg-emerald-700 transition-colors"></div>)}
                <div className="ml-2 px-3 py-1 text-[10px] font-mono text-emerald-600 bg-black/40 rounded-full border border-emerald-900/30 tracking-tight">ZENITH.PREDICTIVE_MODEL_v4.2</div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Neural Nodes</span>
                  <span className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">24.1k</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Sync Latency</span>
                  <span className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">0.8ms</span>
                </div>
                <div className="col-span-2 bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-emerald-100">Market Anticipation Curve</span>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    </div>
                    <div className="h-24 flex items-end gap-1.5">
                        {[20, 35, 25, 60, 45, 90, 65, 80, 50, 70].map((h, i) => (
                        <div 
                            key={i} 
                            style={{ height: h + '%' }} 
                            className="flex-1 bg-linear-to-t from-emerald-900 via-emerald-700 to-emerald-500 rounded-t-sm group-hover:brightness-110 transition-all duration-500"
                        ></div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <section className="relative z-10 bg-emerald-950/20 border-y border-emerald-900/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Fortune 500 Clients', value: '45+' },
            { label: 'Predictions Generated', value: '1.2B+' },
            { label: 'Avg. Efficiency Gain', value: '28%' },
            { label: 'System Uptime', value: '99.99%' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2 p-6 rounded-3xl border border-emerald-900/20 bg-black/40">
              <p className="text-4xl md:text-5xl font-black text-emerald-500 tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-emerald-100/60 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-emerald-900/10 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500 border border-emerald-900/50">Z</div>
                <span className="text-sm font-bold text-emerald-100/50 tracking-tight">© 2024 Zenith Intelligence, Inc. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-emerald-100/50">
                <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-emerald-400 transition-colors">Status</a>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default AnimatedEmeraldLanding;
` ; 

const Home_Card = `
    import React, { useState } from 'react';

const EmeraldProductCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-emerald-500/30">
      <div 
        className="relative group w-full max-w-70"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={"absolute inset-0 bg-emerald-500/20 rounded-[2.5rem] blur-2xl transition-opacity duration-500 " + (isHovered ? "opacity-100" : "opacity-0")}></div>
        
        <div className="relative bg-emerald-950/10 border border-emerald-900/30 rounded-[2.5rem] p-3 overflow-hidden backdrop-blur-xl transition-all duration-500 group-hover:border-emerald-500/40 group-hover:-translate-y-2">
          
          <div className="relative aspect-square overflow-hidden rounded-4xl bg-black/40 border border-emerald-900/20">
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-black/60 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                NEW RELEASE
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
              <div className="w-full h-full bg-linear-to-tr from-emerald-600/20 to-emerald-400/40 rounded-full blur-3xl absolute animate-pulse"></div>
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-full h-full text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                stroke="currentColor" 
                strokeWidth="1"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>

            <div className={"absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-emerald-950/90 to-transparent transition-all duration-500 translate-y-full group-hover:translate-y-0"}>
              <div className="flex justify-center gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button key={size} className="w-8 h-8 rounded-lg bg-black/50 border border-emerald-500/30 text-[10px] font-bold hover:bg-emerald-500 hover:text-black transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Hardware Series</p>
                <h3 className="text-emerald-50 font-bold text-lg tracking-tight">Cortex Node v2</h3>
              </div>
              <div className="text-right">
                <p className="text-emerald-500 font-black text-lg">$299</p>
                <p className="text-[10px] text-emerald-900 line-through">$450</p>
              </div>
            </div>

            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 shadow-[0_0_5px_#10b981]"></div>
              ))}
              <span className="text-[10px] text-emerald-800 font-bold ml-1">4.9/5.0</span>
            </div>

            <div className="pt-2 flex gap-2">
              <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black py-3 rounded-2xl transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                ADD TO CART
              </button>
              <button className="px-3 rounded-2xl border border-emerald-900/40 hover:border-emerald-500/50 text-emerald-500 transition-colors">
                ♥
              </button>
            </div>
          </div>

          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-colors"></div>
        </div>
      </div>
    </div>
  );
};

export default EmeraldProductCard;
` ; 