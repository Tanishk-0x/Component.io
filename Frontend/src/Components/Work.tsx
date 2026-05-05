
const Work = () => {

    const steps = [
    {
        num:   "01",
        title: "Browse or Describe",
        desc:  "Pick a ready-made component from the library, or describe what you need in plain English to the AI Lab.",
        delay: "0.2s",
        icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </svg>
        ),
    },
    {
        num:   "02",
        title: "AI Generates",
        desc:  "AI instantly writes clean, themed React + Tailwind code — no bloat, no extra dependencies, no boilerplate.",
        delay: "0.75s",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
        </svg>
        ),
    },
    {
        num:   "03",
        title: "Copy & Ship",
        desc:  "One click copies the code. Drop it into your project and it just works — fully styled and production-ready code in your hand.",
        delay: "1.3s",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        ),
    },
    ];

    const arrowDelays = ["0.95s", "1.5s"];

  return (

    <div>
      <section className="w-full flex flex-col items-center px-4 md:px-6 py-20 md:py-24">
          <div
            className="flex items-center justify-center gap-4 mb-5"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0s forwards" }}
          >
            <div
              className="w-2.5 h-2.5 bg-emerald-500 rounded-full"
              style={{ animation: "blink 1.2s infinite" }}
            />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-emerald-500">
              How It Works
            </span>
          </div>

          <h2
            className="text-[28px] md:text-[40px] font-black text-white text-center uppercase leading-tight mb-4"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0.07s forwards" }}
          >
            Three steps to your <span className="text-emerald-500">perfect component</span>
          </h2>

          <p
            className="text-gray-400 text-sm md:text-base text-center mb-14 max-w-lg"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0.13s forwards" }}
          >
            From idea to production-ready component in under a minute.
          </p>

          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-center flex-1">

                <div
                  className="flex flex-col items-center text-center w-full max-w-xs px-4"
                  style={{
                    opacity: 0,
                    animation: `fadeSlideUp 0.65s cubic-bezier(.22,1,.36,1) ${step.delay} forwards`,
                  }}
                >
                  <div className="relative mb-6 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-500 bg-[#020403] flex items-center justify-center relative">
                      <div className="absolute inset-1.5 rounded-full border border-dashed border-emerald-500/30"></div>
                      <span className="text-xl font-black text-emerald-500">{step.num}</span>
                    </div>
                  </div>

                  <div className="bg-[#0a0f0d] border border-emerald-900/40 hover:border-emerald-500/40 transition-colors rounded-2xl p-6 w-full text-left">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-4 mx-auto">
                      {step.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 text-center">{step.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed text-center">{step.desc}</p>
                  </div>
                </div>

                {i < 2 && (
                  <div
                    className="hidden md:flex shrink-0 items-center justify-center w-12 mt-8"
                    style={{
                      opacity: 0,
                      animation: `fadeIn 0.4s ease ${arrowDelays[i]} forwards`,
                    }}
                  >
                    <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                      <path d="M4 12H40M34 6L40 12L34 18" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

              </div>
            ))}
          </div>

        </section>
    </div>
  )
}

export default Work
