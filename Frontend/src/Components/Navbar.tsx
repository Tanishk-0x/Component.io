import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSafeContext } from '../Hooks/UseSafeContext';
import { authDataContext } from '../Context/AuthContext';


const Navbar = () => {

  const navigate = useNavigate(); 

  // --------- UserData ---------
  const { userData } = useSafeContext(authDataContext); 

  const [isOpen, setIsOpen] = useState(false);


  return (

    <header className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl px-4 md:px-6 h-16 rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md flex justify-between items-center shadow-lg shadow-emerald-950/30 transition-all duration-300">
      
      {/* --- LOGO SECTION --- */}
      <div className="flex items-center gap-2 shrink-0 cursor-pointer group">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform group-hover:rotate-12">
          <span className="text-black font-mono font-bold text-lg">{"<C>"}</span>
        </div>
        <div className="text-[22px] md:text-[26px] font-mono font-bold text-white tracking-tighter">
          Component<span className="text-emerald-400">.io</span>
        </div>
      </div>


      {/* --- NAVIGATION (Desktop Only) --- */}
      <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <ul className="flex flex-row items-center gap-8">
          
          <li onClick={() => navigate('/')}
          className="relative text-neutral-400 hover:text-emerald-400 font-mono text-[16px] cursor-pointer transition-all duration-200 group">
            Components
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li onClick={() => navigate('/')}
          className="relative text-neutral-400 hover:text-emerald-400 font-mono text-[16px] cursor-pointer transition-all duration-200 group">
            AiLab
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li onClick={() => navigate('/')} 
          className="relative text-neutral-400 hover:text-emerald-400 font-mono text-[16px] cursor-pointer transition-all duration-200 group">
            Upgrade
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li onClick={() => navigate('/verify')} 
          className="relative text-neutral-400 hover:text-emerald-400 font-mono text-[16px] cursor-pointer transition-all duration-200 group">
            Verify
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </li>

        </ul>
      </nav>

      {/* --- RIGHT ACTION --- */}
      <div className="flex items-center gap-4">
        
        {/* ------ Toggle Based On UserData --------- */}
        {
          !userData && 
          <button onClick={() => navigate('/login')}
          className="bg-emerald-500 text-neutral-950 px-5 py-1.5 font-bold rounded-lg cursor-pointer hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all active:scale-95 hidden sm:block">
            LogIn
          </button>
        }
        {
          userData && 
          <button onClick={() => navigate('/')}
          className="text-emerald-500 text-[36px] cursor-pointer hover:text-emerald-400 transition-all active:scale-95 hidden sm:block">
            <FaCircleUser />
          </button>
        }

        

        {/* Hamburger Icon (Mobile Only) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-1 cursor-pointer focus:outline-none"
        >
          {
            isOpen ? (
              <RxCross1 className='text-[24px]'/>
            ) : (
              <GiHamburgerMenu className='text-[24px]'/>
            )
          }
          
        </button>
      </div>


      {/* --- MOBILE DROPDOWN --- */}
      {isOpen && (
        <div className="absolute top-18 left-0 w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col gap-4 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
          <ul className="flex flex-col gap-4">
            <li className="text-white hover:text-emerald-400 font-mono text-[18px]">Components</li>
            <li className="text-white hover:text-emerald-400 font-mono text-[18px]">AiLab</li>
            <li className="text-white hover:text-emerald-400 font-mono text-[18px]">Upgrade</li>
            
            <li>
              {
                !userData && 
                <button onClick={() => navigate('/login')}
                className="w-full bg-emerald-500 text-neutral-950 py-2 font-bold rounded-lg">
                  LogIn
                </button>
              }
              {
                userData && 
                <button onClick={() => navigate('/')}
                className="w-full bg-emerald-500 text-neutral-950 py-2 font-bold rounded-lg">
                  Profile
                </button>
              }
            </li>

          </ul>
        </div>
      )}

    </header>
  );
};

export default Navbar;