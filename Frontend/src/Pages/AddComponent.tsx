import { useState, useEffect } from 'react';
import { useSafeContext } from '../Hooks/UseSafeContext';
import { adminDataContext } from '../Context/AdminContext';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview, 
  useSandpack
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { VscPreview } from "react-icons/vsc";
import { IoCodeSlashSharp } from "react-icons/io5";



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
  }, [sandpack.files, currentCode, setFormData]);

  return null;
};

const AddComponent = () => {

  const { AddComponent, formData, setFormData, isAdding } = useSafeContext(adminDataContext); 
  
  const [activeTab, setActiveTab] = useState('preview');

  return (

    <div className="min-h-screen bg-[#020604] text-slate-200 font-sans pb-20 selection:bg-emerald-500/30">
      
      {/* ----- Header Section ----- */}
      <header className="sticky top-2 z-50 bg-[#020604]/90 backdrop-blur-xl border-b border-emerald-900/20 py-4">
        
        <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">Admin Panel</h1>
              <p className="text-[10px] text-emerald-500/60 font-mono tracking-tighter uppercase">Component Add Station</p>
            </div>
          </div>
          
          <button 
            className="w-full flex justify-center items-center flex-row gap-1 md:w-auto cursor-pointer bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#020604] font-semibold text-sm py-3 px-8 rounded-xl transition-all duration-300 shadow-[0_8px_30px_rgb(16,185,129,0.15)] active:scale-95"
          >
            <AiOutlineAppstoreAdd /> Add Component
          </button>
          
        </div>
      </header>

      {/* ----- Main Context Area ----- */}
      
      <main className="w-[90%] mx-auto py-8 space-y-8">
        
        {/* ----- Input Section ----- */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          <div className="xl:col-span-1 space-y-4">
            <div className="bg-[#0a0f0d] border border-white/5 rounded-2xl p-5">
              <h3 className="text-[11px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4">Identity</h3>
              
              <div className="space-y-4">
                {/* ------- Title ---------- */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Component Title</label>
                  <input 
                    onChange={(e) => setFormData((prev: any) => ({...prev, title: e.target.value}))}
                    type="text" 
                    value={formData.title}
                    placeholder="e.g. Modern Sidebar"
                    className="w-full bg-black/40 border border-emerald-600 rounded-xl px-4 py-3 text-sm focus:border-emerald-400 outline-none transition-all placeholder:text-slate-700"
                  />
                </div>
                
                {/* ------- Category ---------- */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Category Tag</label>
                  <input 
                    onChange={(e) => setFormData((prev: any) => ({...prev, category: e.target.value}))}
                    type="text" 
                    value={formData.category}
                    placeholder="e.g. Layout"
                    className="w-full bg-black/40 border border-emerald-600 rounded-xl px-4 py-3 text-sm focus:border-emerald-400 outline-none transition-all placeholder:text-slate-700"
                  />
                </div>
              </div>
              
            </div>
          </div>

          {/* -------- Prompt ---------- */}
          <div className="xl:col-span-2">
            <div className="bg-[#0a0f0d] border border-white/5 rounded-2xl p-5 h-full">
              <h3 className="text-[11px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4">Generation Prompt</h3>
              <textarea 
                onChange={(e) => setFormData((prev: any) => ({ ...prev, prompt: e.target.value}))}
                value={formData.prompt}
                className="w-full h-35.5 text-[16px] bg-black/40 border border-emerald-600 rounded-xl px-4 py-4 text-sm focus:border-emerald-400 outline-none transition-all resize-none font-mono text-emerald-100 leading-relaxed"
                placeholder="Enter the prompt that generated this code..."
              />
            </div>
          </div>
          
        </section>

        {/* ----- Main Canvas Section ----- */}
        <section className="bg-emerald-950/20 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          
          
          <div className="flex items-center justify-between px-6 py-3 bg-black/20 border-b border-white/5">
            
            <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-8 py-2.5 flex justify-center items-center flex-row gap-1 rounded-xl text-[14px] font-semibold transition-all cursor-pointer ${activeTab === 'preview' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <VscPreview /> Preview
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`px-8 py-2.5 flex justify-center items-center flex-row gap-1 rounded-xl text-[14px] font-semibold transition-all cursor-pointer ${activeTab === 'code' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <IoCodeSlashSharp /> Code
              </button>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="hidden sm:block text-[10px] font-mono text-slate-600">ADD COMPONENT</div>
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
               </div>
            </div>
            
          </div>

          {/* ----- Preview & Code Section ------- */}
          <div className="w-full min-h-200 flex flex-col relative overflow-hidden">
            <SandpackProvider
              template="react"
              theme={sandpackDark}
              files={{ "/App.js": formData.code || 'export default function App() { return <h1 className="text-white">Start Building...</h1> }' }}
              options={{
                externalResources: ["https://cdn.tailwindcss.com"],
              }}
              className="flex-1"
            >
              <SandpackLayout className="h-full min-h-200 border-none rounded-none bg-transparent">
                
                {activeTab === 'code' ? (
                  <div className="w-full h-full min-h-200 max-h-220 overflow-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* ----- Code ----- */}
                    <SandpackCodeEditor 
                      showLineNumbers 
                      showTabs={false}
                      className="h-full min-h-200 text-[14px]"
                      style={{ height: '100%', minHeight: '800px' }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full min-h-200 bg-[#050807] p-4 md:p-10 animate-in zoom-in-95 duration-500">
                    <div className="w-full h-full min-h-180 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-white/[0.02]">
                        {/* ----- Preview ----- */}
                        <SandpackPreview 
                          showRefreshButton={true}
                          showOpenInCodeSandbox={false}
                          className="h-full w-full"
                          style={{ height: '100%', width: '100%', minHeight: '720px' }}
                        />
                    </div>
                  </div>
                )}
                
              </SandpackLayout>
              
              {/* ----- Syncing Code ----- */}
              <SyncCode setFormData={setFormData} currentCode={formData.code}/>
              
            </SandpackProvider>
          </div>
          
        </section>

      </main>

    </div>

  );
};

export default AddComponent;