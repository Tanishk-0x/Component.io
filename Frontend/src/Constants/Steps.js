export const Steps = [
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
      desc:  "Claude instantly writes clean, themed React + Tailwind code — no bloat, no extra dependencies, no boilerplate.",
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
      desc:  "One click copies the code. Drop it into your project and it just works — fully styled and production-ready.",
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

export const arrowDelays = ["0.95s", "1.5s"];
