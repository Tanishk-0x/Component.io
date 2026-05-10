import { pricingDataContext } from "../Context/PricingContext";
import { useSafeContext } from "../Hooks/UseSafeContext";

const Pricing = () => {

    const { HandleCheckout } = useSafeContext(pricingDataContext); 

    const PricingCards = [
        {
            tier: "Free", price: "$0", sub: "Perfect for Side Projects", delay: "0.2s", pro: false,
            tierId: '00' , 
            features: [
                { on: true,  text: "Get 100 Free Credits" },
                { on: true,  text: "Verify to get credits" },
                { on: true,  text: "Copy-paste ready code" },
                { on: false, text: "Community Support" },
            ],
                cta: "Get started free",
        },
        {
            tier: "Pro", price: "$12", sub: "For Consistent Developers", delay: "0.35s", pro: true,
            tierId: '01' ,
            features: [
                { on: true, text: "Get 200 Credits" },
                { on: true, text: "Access to components" },
                { on: true, text: "Copy-paste ready code" },
                { on: true, text: "Community Support" },
            ],
            cta: "Start Pro",
        },
        {
            tier: "Ultimate", price: "$20", sub: "For Serious Builders", delay: "0.5s", pro: false,
            tierId: '02' ,
            features: [
                { on: true, text: "Everything in Pro" },
                { on: true, text: "Get 500 Credits" },
                { on: true, text: "Copy-paste ready code" },
                { on: true, text: "Priortize Community Support" },
            ],
            cta: "Start Premium",
        },
    ]; 

  return (
    <>
      {/* --------- PRICING SECTION --------- */}
        <section className="w-full flex flex-col items-center px-4 md:px-6 py-18 md:py-20">

        <div className="flex items-center gap-4 mb-5"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0s forwards" }}>
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" style={{ animation: "blink 1.2s infinite" }} />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-emerald-500">Pricing</span>
        </div>

        <h2 className="text-[28px] md:text-[40px] font-black text-white text-center uppercase leading-tight mb-3"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0.08s forwards" }}>
            Simple, <span className="text-emerald-500">transparent</span> pricing
        </h2>
        <p className="text-gray-400 text-sm md:text-base text-center mb-14 max-w-lg"
            style={{ opacity: 0, animation: "fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) 0.14s forwards" }}>
            Start free. Scale when you're ready. No lock-in, cancel anytime.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl items-stretch justify-center">
            {PricingCards.map((plan, i) => (
            <div key={i}
                className={`flex flex-col flex-1 bg-[#0a0f0d] rounded-2xl p-7 transition-colors
                ${plan.pro ? "border-2 border-emerald-500" : "border border-emerald-900/30 hover:border-emerald-500/40"}`}
                style={{ opacity: 0, animation: `fadeSlideUp 0.6s cubic-bezier(.22,1,.36,1) ${plan.delay} forwards` }}>

                {plan.pro && (
                <span className="self-start bg-emerald-950 text-emerald-500 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-md mb-3 border border-emerald-800">
                    Most popular
                </span>
                )}

                <p className={`text-[10px] font-black tracking-[0.2em] uppercase mb-2 ${plan.pro ? "text-emerald-500" : "text-gray-500"}`}>{plan.tier}</p>
                <p className="text-4xl font-black text-white mb-1">{plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">{plan.sub}</p>

                <div className="flex flex-col gap-2 mb-8 grow">
                {plan.features.map((f, j) => (
                    <div key={j} className={`flex items-center gap-2 text-sm pb-2 border-b border-emerald-900/10 last:border-0 ${f.on ? "text-gray-300" : "text-gray-600"}`}>
                    <span className={f.on ? "text-emerald-500" : "text-gray-700"}>{f.on ? "✓" : "✗"}</span>
                    {f.text}
                    </div>
                ))}
                </div>

                <button onClick={() => {
                    if( plan.tierId !== '00' ){
                        HandleCheckout( plan.tierId ); 
                    }
                }}
                className={`cursor-pointer w-full py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all active:scale-95
                    ${plan.pro ? "bg-emerald-500 text-black hover:bg-emerald-400" : "border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"}`}>
                {plan.cta}
                </button>
            </div>
            ))}
        </div>

        </section>
    </>
  )
}

export default Pricing
