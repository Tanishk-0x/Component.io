
export const DummyCode = `
    const ProductCard = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 p-6">
        <div className="group relative w-80">
            
            {/* 1. Animated Gradient Background (Glow) */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

            {/* 2. Main Card Container */}
            <div className="relative flex flex-col h-full w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
            
            {/* 3. Image Section with Overlay */}
            <div className="relative h-64 overflow-hidden">
                <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
                alt="Premium Headphones" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                20% OFF
                </div>
            </div>

            {/* 4. Content Section */}
            <div className="p-6 flex flex-col gap-3">
                <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Aether Flow</h3>
                <p className="text-slate-400 text-sm mt-1">Premium Wireless Noise Cancelling Headphones</p>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-white">$299.00</span>
                <div className="flex items-center gap-1 text-amber-400">
                    <span className="text-sm font-bold">4.9</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                </div>
                </div>

                {/* 5. Animated Add to Cart Button */}
                <button className="mt-4 relative group/btn overflow-hidden rounded-xl bg-white px-8 py-3 transition-all duration-300 active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-slate-900 transition-colors duration-300 group-hover/btn:text-white">
                    Add to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                </span>
                {/* Button Hover Slide-over Effect */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-600 to-purple-600 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0"></div>
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default ProductCard;
`; 

export const DummyCode1 = `
const ModernLandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent uppercase tracking-tighter">
            Nexus.AI
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Solutions</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a>
            <button className="px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-cyan-400 transition-all duration-300 font-bold">
              Launch App
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-8 animate-bounce">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              v2.0 is now live
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
              Engineer your <br />
              <span className="bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">Digital Future</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
              Experience the next generation of web development with our AI-driven 
              ecosystem. Build, deploy, and scale with unprecedented speed.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative px-8 py-4 bg-cyan-600 rounded-xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-slate-900 border border-slate-800 rounded-xl font-bold hover:bg-slate-800 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Neural Sync", desc: "Real-time synchronization across all global edge nodes." },
              { title: "Turbo Deploy", desc: "Ship code in milliseconds with our custom CI/CD pipeline." },
              { title: "Quantum Auth", desc: "Next-gen security protocols powered by biometric encryption." }
            ].map((feature, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2026 Nexus AI Architecture. Built for the modern web.</p>
      </footer>
    </div>
  );
};

export default ModernLandingPage;
`;