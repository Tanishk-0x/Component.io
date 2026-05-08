import { useState } from 'react';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { TbCopy } from 'react-icons/tb';
import { MdOutlineGridView, MdOutlineFolderOpen, MdOutlinePlayArrow, MdOutlineRocketLaunch } from 'react-icons/md';
import { FiTerminal } from 'react-icons/fi';
import { BsLightningChargeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: '01',
    icon: <MdOutlineGridView className="text-2xl" />,
    title: 'Browse & Select',
    subtitle: 'Pick your component',
    description:
      'Explore the library and click any component you like. The preview panel renders it live — check both Preview and Code tabs before deciding.',
    highlight: 'component-io.app/components',
    highlightLabel: 'Browse at',
    color: 'emerald',
  },
  {
    id: '02',
    icon: <FiTerminal className="text-2xl" />,
    title: 'Copy the Command',
    subtitle: 'One click, done',
    description:
      'Hit the NPX Import button on any component. A popup appears with your unique command — click the copy icon next to it.',
    highlight: 'npx component-io get <id>',
    highlightLabel: 'Command format',
    color: 'cyan',
    isCode: true,
  },
  {
    id: '03',
    icon: <MdOutlineFolderOpen className="text-2xl" />,
    title: 'Navigate to Your Project',
    subtitle: 'Open your terminal',
    description:
      'Open a terminal window and cd into the directory where you want the component to land — usually inside your src/components folder.',
    highlight: 'cd my-app/src/components',
    highlightLabel: 'Example path',
    color: 'emerald',
    isCode: true,
  },
  {
    id: '04',
    icon: <MdOutlinePlayArrow className="text-2xl" />,
    title: 'Execute & Done',
    subtitle: 'One command install',
    description:
      'Paste the command and hit Enter. The CLI fetches the component code from server and writes a ready-to-use .jsx file right there.',
    highlight: 'ComponentName.jsx created ✓',
    highlightLabel: 'Output',
    color: 'cyan',
  },
  {
    id: '05',
    icon: <MdOutlineRocketLaunch className="text-2xl" />,
    title: 'Import & Ship',
    subtitle: 'Zero extra setup',
    description:
      'Import the component into your file. It\'s pure React + Tailwind CSS — no extra dependencies, no config, ready to use out of the box.',
    highlight: "import MyComponent from './MyComponent'",
    highlightLabel: 'Import it',
    color: 'emerald',
    isCode: true,
  },
];

const Demo = () => {

    const navigate = useNavigate(); 

  const [activeStep, setActiveStep] = useState(0);

  return (

    <div className="min-h-screen w-full bg-[#000502] text-slate-200 font-sans overflow-x-hidden relative">

      {/* --- Background Glow Effect --- */}
      <div className="fixed top-[-15%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed top-[40%] left-[40%] w-[30%] h-[30%] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(16,185,129,0.8) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">

        {/* --------- Header --------- */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <BsLightningChargeFill className="text-xs" />
            Component-io
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Install Components
            <span className="block bg-clip-text text-transparent bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-300">
              via Terminal
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 px-2">
            Run a single{' '}
            <span className="text-emerald-400 font-mono font-semibold">npx</span> command and get a ready to use
            component file dropped straight into your project.
          </p>

          {/* -------- Command --------- */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#00140a] border border-emerald-800/60 rounded-2xl px-3 sm:px-5 py-3 sm:py-3.5 group max-w-full overflow-x-auto">
            <span className="text-emerald-600 select-none shrink-0">$</span>
            <code className="text-emerald-300 font-mono text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
              npx component-io get{' '}
              <span className="text-cyan-400">&lt;component-id&gt;</span>
            </code>
            <button
              className="ml-1 sm:ml-2 text-slate-600 hover:text-emerald-400 transition-colors shrink-0"
            >
                <TbCopy className="text-lg" />
            </button>
          </div>
        </div>

        {/* --------- Steps --------- */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <HiOutlineCommandLine className="text-emerald-500 text-xl shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-white">How it works</h2>
            <div className="flex-1 h-px bg-linear-to-r from-emerald-900/60 to-transparent" />
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {steps.map((step, index) => {

              const isActive = activeStep === index;
              const accentColor = step.color === 'cyan' ? 'cyan' : 'emerald';

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`group relative cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? accentColor === 'emerald'
                        ? 'bg-emerald-900/15 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.06)]'
                        : 'bg-cyan-900/15 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.06)]'
                      : 'bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/3'
                  }`}
                >
                  
                  {isActive && (
                    <div
                      className={`absolute top-0 left-0 right-0 h-[1.5px] ${
                        accentColor === 'emerald'
                          ? 'bg-linear-to-r from-transparent via-emerald-500 to-transparent'
                          : 'bg-linear-to-r from-transparent via-cyan-500 to-transparent'
                      }`}
                    />
                  )}

                  <div className="flex items-start gap-3 sm:gap-5 p-4 sm:p-5 md:p-6">

                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? accentColor === 'emerald'
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                              : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
                            : 'bg-white/5 border-white/10 text-slate-500 group-hover:text-slate-400'
                        }`}
                      >
                        {step.icon}
                      </div>
                      <span className={`text-[10px] font-black tracking-widest ${
                        isActive
                          ? accentColor === 'emerald' ? 'text-emerald-600' : 'text-cyan-600'
                          : 'text-slate-700'
                      }`}>
                        {step.id}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                          isActive ? 'text-white' : 'text-slate-300 group-hover:text-slate-200'
                        }`}>
                          {step.title}
                        </h3>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isActive
                            ? accentColor === 'emerald'
                              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                              : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
                            : 'text-slate-600 bg-white/5 border-white/5'
                        }`}>
                          {step.subtitle}
                        </span>
                      </div>

                      <p className={`text-xs sm:text-sm leading-relaxed mb-3 transition-colors ${
                        isActive ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {step.description}
                      </p>

                      <div className={`inline-flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 border text-xs transition-all max-w-full overflow-x-auto ${
                        isActive
                          ? accentColor === 'emerald'
                            ? 'bg-[#000502] border-emerald-900/50'
                            : 'bg-[#000502] border-cyan-900/50'
                          : 'bg-[#000502]/50 border-white/5'
                      }`}>
                        <span className="text-slate-600 text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap">
                          {step.highlightLabel}:
                        </span>
                        <code className={`font-mono font-medium transition-colors whitespace-nowrap ${
                          isActive
                            ? accentColor === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'
                            : 'text-slate-500'
                        }`}>
                          {step.highlight}
                        </code>
                        {step.isCode && (
                          <button
                            className="text-slate-700 hover:text-emerald-400 transition-colors ml-1 shrink-0"
                          >
                              <TbCopy className="text-sm" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={`hidden sm:block shrink-0 self-center transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}>
                      <div className={`w-1.5 h-8 rounded-full ${
                        accentColor === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'
                      }`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --------- Demo Video --------- */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <MdOutlinePlayArrow className="text-emerald-500 text-xl shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Live Demo</h2>
            <div className="flex-1 h-px bg-linear-to-r from-emerald-900/60 to-transparent" />
          </div>

          <div className="relative rounded-2xl border border-white/8 overflow-hidden bg-[#00140a]/60 backdrop-blur-sm">
            
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />
            
            <div className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-white/5 bg-black/20">
              <div className="w-3 h-3 rounded-full bg-red-500/70 shrink-0" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70 shrink-0" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70 shrink-0" />
              <div className="ml-2 sm:ml-4 flex-1 h-6 bg-white/5 rounded-md flex items-center px-3 overflow-hidden">
                <span className="text-slate-600 text-xs font-mono truncate">component-io.app — NPX Demo</span>
              </div>
            </div>

        
            <div className="relative w-full aspect-video bg-[#000a05]">
              
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-slate-700">
                <video
                className="w-full h-full"
                src="./npx-demo.mp4"
                autoPlay loop muted
              />
              </div>

            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
          </div>

          <p className="text-xs text-slate-600 text-center mt-3">
            Watch the full NPX workflow from component selection to import in under 30 seconds.
          </p>
        </div>

        {/* --------- Footer --------- */}
        <div className="relative rounded-2xl border border-emerald-900/30 bg-emerald-900/8 p-6 sm:p-8 text-center overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }} />

          <div className="relative z-10">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-base sm:text-lg font-black text-white mb-2">Ready to install your first component?</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-5 px-2">
              Requires Tailwind CSS in your project. Zero extra dependencies — pure React + Tailwind.
            </p>

            <button onClick={() => navigate('/components')}
            className="inline-flex items-center gap-3 bg-[#000502] border text-emerald-300 border-emerald-800/60 hover:text-cyan-300 hover:border-cyan-800/60 cursor-pointer rounded-xl px-5 py-3 group">
              <code className="font-mono text-xs sm:text-sm font-medium">
                Explore Components
              </code>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Demo;