import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Components", path: "/components" },
    { label: "AI Lab",     path: "/lab" },
    { label: "Profile",    path: "/profile" },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/Tanishk-0x",
      icon: (
        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tanishk-namdev",
      icon: (
        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com/",
      icon: (
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-[95%] bg-[#020403]  border-t border-emerald-900/25 px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

          <div className="flex flex-col items-center md:items-start gap-2 footer-brand">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-blink inline-block"></span>
              <span className="text-xl font-black text-white tracking-tight">
                Component<span className="text-emerald-500">.io</span>
              </span>
            </div>
            <p className="text-gray-600 text-xs max-w-50 text-center md:text-left leading-relaxed">
              AI-powered React + Tailwind component engine.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="text-gray-500 cursor-pointer text-sm font-semibold hover:text-emerald-500 transition-colors duration-200 footer-link"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-emerald-900/30 text-gray-500 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-200 active:scale-95 footer-social"
              >
                {s.icon}
              </a>
            ))}
          </div>

        </div>

        <div className="mt-8 mb-5 h-px bg-emerald-900/15 footer-divider" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-700 text-xs">
            © {year} <span className="text-gray-600 font-semibold">Component.io</span> — All rights reserved.
          </p>
          <p className="text-gray-800 text-xs tracking-widest uppercase font-black">
            Built With Component.io 
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;