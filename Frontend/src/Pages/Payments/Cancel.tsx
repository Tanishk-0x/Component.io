import { useState, useEffect } from "react";
import { MdOpenInNew } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Cancel = () => {

    const navigate = useNavigate(); 

    const [visible, setVisible] = useState(false);

       const storedData = localStorage.getItem('paymentDetails');

    let paymentDetails = null;

    if(storedData){
        const parsedData = JSON.parse(storedData);

        if(Date.now() < parsedData.expiry){
            paymentDetails = parsedData;
        }
        else{
            localStorage.removeItem('paymentDetails');
        }
    }

    const CurrentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) ; 


    useEffect(() => {
        setTimeout(() => setVisible(true), 80);
    }, []);

  return (
    <div className="min-h-screen w-full bg-[#000502] flex items-center justify-center px-4 font-sans relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/8 blur-[120px] rounded-full pointer-events-none" />

      <div className={`relative z-10 w-full max-w-sm transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>

        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent z-10" />

        <div className="bg-[#0a0000]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">

          <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-white/5">
            <MdErrorOutline className="text-5xl text-red-400 mb-3" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-red-400 to-orange-400">
              Payment Cancelled
            </h1>
            <p className="text-slate-500 text-xs mt-1">{CurrentDate}</p>
          </div>

          <div className="px-6 py-5 space-y-3 border-b border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Name</span>
              <span className="text-slate-200 text-sm font-medium">{paymentDetails.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Email</span>
              <span className="text-slate-300 text-sm">{paymentDetails.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Plan</span>
              <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-semibold">
                {paymentDetails.tier}
              </span>
            </div>
          </div>

          <div className="px-6 py-4 bg-red-500/5 border-b border-white/5">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Your payment was not completed. No charges were made to your account.
            </p>
          </div>

          <div className="px-6 py-5 flex flex-col gap-2.5">
            <button
              onClick={() => navigate('/') }
              className="w-full cursor-pointer bg-red-500 hover:bg-red-400 active:scale-[0.98] text-white font-black text-sm uppercase tracking-wide py-3 rounded-xl transition-all duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-transparent border-2 border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-400 text-xs font-semibold py-2.5 rounded-xl transition-all duration-200"
            >
              <MdOpenInNew className="text-sm" /> Back to Homepage
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cancel;