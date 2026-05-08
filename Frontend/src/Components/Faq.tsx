import { useState } from 'react'

const Faq = () => {

    const [openFaq, setOpenFaq] = useState<any | null>(null); 

    const faqs = [
    { q: "Is Component.io really free to start?",
        a: "Yes — the Free plan gives you 100 free credits. But you have to verify your email to claim those credits. No credit card required." },
    { q: "What frameworks do the generated components support?",
        a: "All components are React + Tailwind CSS. They work with Next.js, Vite, Remix, and any project that supports JSX." },
    { q: "How does the AI Lab actually work?",
        a: `You describe what you need in plain English — Eg: "a responsive pricing card with a toggle between monthly and annual billing" — and our model generates clean, themed React + Tailwind code on the spot.` },
    { q: "Do I have need to manually copy-paste every the code?",
        a: "Not at all! You can fetch any component instantly using `npx component-io get <id>`. Our CLI automatically create file contains component in the choosen path." },
    { q: "Do I need to install any dependencies?",
        a: "No external component library is required. The output is pure React + Tailwind — no extra packages. Just copy, paste, and it works." },
    ];

  return (
    <>
      {/* --------- FAQ SECTION --------- */}
        <section className="w-full flex flex-col items-center px-4 md:px-6 py-20 md:py-24">

        <div className="flex items-center gap-4 mb-5"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0s forwards" }}>
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ animation: "blink 1.2s infinite" }} />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-emerald-500">FAQ</span>
        </div>

        <h2 className="text-[28px] md:text-[40px] font-black text-white text-center uppercase leading-tight mb-3"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0.08s forwards" }}>
            Got <span className="text-emerald-500">questions?</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base text-center mb-14 max-w-lg"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0.14s forwards" }}>
            Everything you need to know before you start building.
        </p>

        <div className="w-full max-w-3xl flex flex-col gap-3">
            {faqs.map((faq, i) => (
            <div key={i}
                className={`bg-[#0a0f0d] border rounded-2xl overflow-hidden transition-colors
                ${openFaq === i ? "border-emerald-500/50" : "border-emerald-900/25 hover:border-emerald-500/35"}`}>
                <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left">
                <span className="text-white font-bold text-[15px]">{faq.q}</span>
                <span className={`w-7 h-7 rounded-full border border-emerald-500/40 flex items-center justify-center text-emerald-500 text-lg text-center shrink-0 ml-4 transition-transform
                    ${openFaq === i ? "rotate-45 bg-emerald-500/10" : ""}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48 pb-5" : "max-h-0"}`}>
                <p className="text-gray-400 text-sm leading-relaxed px-6">{faq.a}</p>
                </div>
            </div>
            ))}
        </div>

        </section>
    </>
  )
}

export default Faq
