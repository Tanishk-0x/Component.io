import { MdDashboard } from "react-icons/md";
import { PiCardsFill } from "react-icons/pi";
import { SiHackthebox } from "react-icons/si";
import { IoAddCircle } from "react-icons/io5";

const Selector = () => {

  return (

    <>
      <div className="flex flex-col justify-center items-center w-full px-4 md:px-6">

          <div className="flex text-center flex-col max-w-2xl mx-auto">
            <p className="text-[28px] md:text-[36px] lg:text-[40px] text-white font-semibold leading-tight">
              The right template for your <br className="hidden md:block" />
              <span className="text-emerald-500 md:ml-2">
                specific use case
              </span>
            </p>
            <p className="text-[14px] md:text-[16px] text-gray-400 mt-4">
              A carefully curated collection of gorgeous, fully functional templates.
            </p>
          </div>

          <div className="w-full mt-8 md:mt-10 flex flex-wrap justify-center items-center gap-3 md:gap-6">
            <button className="w-full sm:w-auto bg-emerald-950 gap-2 text-white flex flex-row justify-center items-center px-4 md:px-5 py-3 md:py-4 font-semibold text-[14px] md:text-[16px] rounded-lg border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer">
              <MdDashboard className="text-emerald-500 text-[18px] md:text-[20px]"/> Dashboard 
            </button>

            <button className="w-full sm:w-auto bg-emerald-950 gap-2 text-white flex flex-row justify-center items-center px-4 md:px-5 py-3 md:py-4 font-semibold text-[14px] md:text-[16px] rounded-lg border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer">
              <SiHackthebox className="text-emerald-500 text-[18px] md:text-[20px]"/> Landing Page 
            </button>

            <button className="w-full sm:w-auto bg-emerald-950 gap-2 text-white flex flex-row justify-center items-center px-4 md:px-5 py-3 md:py-4 font-semibold text-[14px] md:text-[16px] rounded-lg border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer">
              <PiCardsFill className="text-emerald-500 text-[18px] md:text-[20px]"/> Modern Cards 
            </button>

            <button className="w-full sm:w-auto bg-emerald-950 gap-2 outline-dotted outline-emerald-500 outline-2 outline-offset-2 text-white flex flex-row justify-center items-center px-4 md:px-5 py-3 md:py-4 font-semibold text-[14px] md:text-[16px] rounded-lg border border-emerald-800 hover:bg-emerald-900 transition-colors cursor-pointer">
              <IoAddCircle className="text-emerald-500 text-[18px] md:text-[20px]"/> Much More 
            </button>
          </div>

          <div className="bg-emerald-950/50 w-full max-w-5xl mt-10 md:mt-14 border border-emerald-800/60 rounded-2xl h-75 md:h-135 flex justify-center items-center text-emerald-800 font-black text-2xl md:text-5xl tracking-widest shadow-2xl">
            SCREEN!
          </div>

        </div>
    </>

  )

}

export default Selector
