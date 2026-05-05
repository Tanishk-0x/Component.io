import Navbar from "../Components/Navbar";
import Pricing from "../Components/Pricing";
import Footer from "../Components/Footer";
import Faq from "../Components/Faq";
import Work from "../Components/Work";
import Selector from "../Components/Selector";
import MainSection from "../Components/MainSection";


const Home = () => {


  return (

    <div className="w-screen min-h-screen bg-[#020403] text-[#10b981] flex flex-col justify-start items-center selection:bg-[#10b981] selection:text-black overflow-x-hidden p-2 md:p-4">

      {/* --- BACKGROUND SCAN LINE --- */}
      <div className="scan-line"></div>

      
      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* ----- Navbar ----- */}
        <Navbar />

        {/* --- MAIN SECTION --- */}
        <MainSection />

        {/* ---------- SELECTOR SECTION ---------- */}
        <Selector />

        {/* ----- HOW IT WORKS SECTION ------ */}
        <Work />

        {/* --------- PRICING SECTION ----------- */}
        <Pricing />

        {/* --------- FOOTER SECTION ----------- */}
        <Faq />

        {/* --------- FOOTER SECTION ----------- */}
        <Footer />

      </div>

    </div>

    
  );
};

export default Home;