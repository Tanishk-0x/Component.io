import { useState } from 'react';

const AddComponent = () => {

    // Form Data 
    const [formData, setFormData] = useState({
        title: '',
        category: 'Cards',
        status: 'Public',
        modelUsed: 'Gemini 3.1 Pro',
        prompt: '',
        code: '<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">\n  <div>\n    <div class="text-xl font-medium text-black">ChitChat</div>\n    <p class="text-slate-500">You have a new message!</p>\n  </div>\n</div>'
    });

    const [activeTab, setActiveTab] = useState('preview');


  return (

    <div className="min-h-screen  text-white p-4 md:p-4 font-sans selection:bg-emerald-500/30">
      
        {/* ----- Header Section ----- */}
        <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-nowrap">
                <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                </span>
                Add New Component
                </h1>
                <p className="text-gray-400 mt-2 ml-14">Create and publish new UI components directly to the platform.</p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-emerald-500 font-mono bg-emerald-950/30 px-3 py-1.5 border border-emerald-900/50 rounded-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                SYSTEM ONLINE
            </div>
        </div>

        {/* ----- Main Content ----- */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* ----- Left Side (Input Fields) ----- */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#000f08] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    Component Details
                    </h2>
                    
                <form className="space-y-5">
                    {/* ----- Title ----- */}
                    <div>
                        <label className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                        Title
                        </label>
                        <input 
                        type="text" name="title" value={formData.title} required
                        placeholder="e.g. Neumorphic Login Form"
                        className="w-full bg-[#01180e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-gray-600"
                        />
                    </div>

                    {/* ----- Category & Status ----- */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            Category
                        </label>
                        <select 
                            name="category" value={formData.category}
                            className="w-full bg-[#01180e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                        >
                            <option value="Buttons">Buttons</option>
                            <option value="Cards">Cards</option>
                            <option value="Forms">Forms</option>
                            <option value="Navbars">Navbars</option>
                            <option value="Loaders">Loaders</option>
                        </select>
                        </div>
                        <div>
                        <label className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            Status
                        </label>
                        <select 
                            name="status" value={formData.status}
                            className="w-full bg-[#01180e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                        >
                            <option value="Public">Public</option>
                            <option value="Created">Created (Draft)</option>
                        </select>
                        </div>
                    </div>

                    {/* ----- Model Used ----- */}
                    <div>
                        <label className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
                        AI Model Used
                        </label>
                        <input 
                        type="text" name="modelUsed" value={formData.modelUsed}
                        placeholder="e.g. Gemini Pro"
                        className="w-full bg-[#01180e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-gray-600"
                        />
                    </div>

                    {/* ----- Prompt ----- */}
                    <div>
                        <label className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                        Generation Prompt
                        </label>
                        <textarea 
                        name="prompt" value={formData.prompt} required rows={3}
                        placeholder="Enter the prompt used to generate this component..."
                        className="w-full bg-[#01180e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none placeholder:text-gray-600"
                        ></textarea>
                    </div>

                    {/* ----- Submit Button ------ */}
                    <button 
                        type="submit"
                        className="cursor-pointer w-full mt-4 bg-emerald-600 hover:bg-emerald-600 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        Publish Component
                    </button>

                </form>

                </div>
            </div>

            {/* ----- Right Side (Code+Preview) ----- */}
            <div className="lg:col-span-7 h-full flex flex-col">
            <div className="bg-[#01180e] border border-white/10 rounded-2xl flex flex-col h-full backdrop-blur-md overflow-hidden">
                
                {/* ---- Tabs Header ----- */}
                <div className="flex items-center justify-between border-b border-white/10 p-2 bg-black/20">
                    <div className="flex gap-2">
                        <button 
                        onClick={() => setActiveTab('code')}
                        className={`flex justify-center items-center flex-row gap-1 text-nowrap cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-white/10 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                        Edit Code
                        </button>
                        <button 
                        onClick={() => setActiveTab('preview')}
                        className={`flex justify-center items-center flex-row gap-1 text-nowrap cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-white/10 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        Live Preview
                        </button>
                    </div>
                    <div className="flex gap-1.5 px-3">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                </div>

                {/* ----- Code / Preview Area ----- */}
                <div className="flex-1 min-h-125 relative">
                    {activeTab === 'code' ? (
                        
                        <div className="w-full h-full absolute inset-0 bg-[#01180e] p-4 flex items-center justify-center pattern-dots-sm pattern-white/5">
                            Code!
                        </div>
                    ) 
                    : 
                    (
                        <div className="w-full h-full absolute inset-0 bg-[#01180e] p-4 flex items-center justify-center pattern-dots-sm pattern-white/5">
                            Preview!
                        </div>
                    )}
                </div>
            </div>
            </div>

        </div>

    </div>

  );
};

export default AddComponent;