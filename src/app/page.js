"use client";

import { useState, useEffect } from "react";

// Native SVG Icons for maximum compatibility and animation flexibility
const CopyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.309v-1.92a2.25 2.25 0 0 1 2.25-2.25h1.5m8.4 2.15V14.25a2.25 2.25 0 0 1-2.25 2.25h-1.5" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const SparklesIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.187.904zM18.007 7.007l-.425-2.582L15 4l2.582-.425.425-2.582L18.43 4.007 21 4l-2.582.425-.411 2.582zM20.25 12.5l-.26-1.59-1.59-.26 1.59-.26.26-1.59 1.59.26-1.59.26-.26 1.59z" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.602z" />
  </svg>
);

const UserGroupIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94-3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4 0 2.25 2.25 0 0 1 4 0Zm-13.5 0a2.25 2.25 0 1 1-4 0 2.25 2.25 0 0 1 4 0Z" />
  </svg>
);

export default function Home() {
  // Quiz states
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [vibeResult, setVibeResult] = useState(null); // 'F1', 'NBA', or 'HYBRID'
  const [showResult, setShowResult] = useState(false);
  const [currentTab, setCurrentTab] = useState("F1"); // Toggle for matched cards or sandbox

  // Sandbox states
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedText, setCopiedText] = useState(null);

  // Auto-eval quiz on selection changes
  useEffect(() => {
    if (q1 && q2) {
      setShowResult(true);
      if (q1 === "A" && q2 === "A") {
        setVibeResult("F1");
        setCurrentTab("F1");
      } else if (q1 === "B" && q2 === "B") {
        setVibeResult("NBA");
        setCurrentTab("NBA");
      } else {
        setVibeResult("HYBRID");
        setCurrentTab("F1"); // Default to F1 tab for hybrid, let them switch
      }
      
      // Smooth scroll to results
      setTimeout(() => {
        const resultSection = document.getElementById("matched-vibe-section");
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [q1, q2]);

  // Copy to clipboard helper
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Sandbox Questions Data
  const sandboxQuestions = [
    {
      id: "offside",
      category: "General",
      q: "What the hell is an offside?",
      a: "Imagine playing cherry-picker on a school playground by standing right next to the opponent's goal and waiting for someone to launch a long pass to you. It's cheap, right? The offside rule basically says you can't camp behind the last defender before the ball is kicked. You have to beat them with speed, timing, or clever passing—not just by lurking in the backyard.",
      icon: "⚽"
    },
    {
      id: "drs",
      category: "Formula 1",
      q: "What is DRS in racing?",
      a: "Imagine a runner folding their ears back to slice through the air. In F1, 'Drag Reduction System' (DRS) lets a driver open a physical flap on their rear wing. It sheds wind resistance, giving the car an instant 6–10 mph speed boost on straightaways. But there's a catch: you can only activate it if you're less than 1 second behind the car in front of you. It's basically a real-life Mario Kart mushroom to force high-speed overtakes.",
      icon: "🏎️"
    },
    {
      id: "f1name",
      category: "Formula 1",
      q: "Why is it called Formula 1?",
      a: "No chemistry labs here! The 'Formula' is just the massive, strict set of rules and designs that all teams must build their cars by (engine size, weight, aerodynamics). The '1' signifies that this is the absolute top tier, the pinnacle of motorsport. So, it literally translates to: 'The Number One Rulebook League.'",
      icon: "🏁"
    },
    {
      id: "tires",
      category: "Formula 1",
      q: "What is tire degradation?",
      a: "F1 tires aren't like your sedan's tires; they are made of hyper-sticky rubber that operates like hot chewing gum to glue the cars to the track through insane corners. Because they are so soft, they disintegrate rapidly. Think of them like giant pencil erasers—after 20 laps of hard scrubbing, they turn to dust, lose all grip, and the driver must pit for fresh ones or risk sliding off the track.",
      icon: "🛞"
    },
    {
      id: "clutch",
      category: "Basketball",
      q: "What does 'clutch' mean?",
      a: "When the game is on the line, the clock is ticking down to zero, and the arena is screaming, 'clutch' is the magical ability to block out the noise and hit the winning shot under extreme pressure. It's pure main-character energy. Think of it as answering the final question on a high-stakes exam in the last 2 seconds without sweat.",
      icon: "🏀"
    },
    {
      id: "freethrow",
      category: "Basketball",
      q: "Why do players bounce the ball before free throws?",
      a: "It's 90% a psychological security blanket. Standing alone at the line with thousands of fans staring is terrifying. Dribbling a set number of times is a rhythmic breathing exercise to reset their muscle memory and calm their heart rate. It also gets sweat off their palms so the ball doesn't slip during the release.",
      icon: "🤝"
    },
    {
      id: "doubledouble",
      category: "Basketball",
      q: "What is a 'double-double'?",
      a: "In basketball, there are five main stats: points, rebounds, assists, blocks, and steals. A player gets a 'double-double' when they record a double-digit number (10 or more) in two of those categories in a single game (e.g., 14 points and 11 rebounds). It's the basketball equivalent of getting straight A's on a hard report card.",
      icon: "📈"
    }
  ];

  // Filtered questions based on search
  const filteredQuestions = sandboxQuestions.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full bg-[#05050c] text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* Visual background ambient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-950/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[50%] rounded-full bg-blue-950/20 blur-[180px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-violet-950/10 blur-[160px] pointer-events-none" />

      {/* Modern Header Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-rose-500 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
            LACES
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Warmup
          </span>
        </div>
        <nav className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <a href="#vibe-quiz" className="hover:text-rose-400 transition-colors">Vibe Quiz</a>
          <a href="#cheat-sheets" className="hover:text-rose-400 transition-colors">Cheat Sheets</a>
          <a href="#sandbox" className="hover:text-rose-400 transition-colors">Alternative Search</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 z-10 flex flex-col items-center">
        
        <section className="text-center mt-12 mb-20 max-w-3xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-6 backdrop-blur-md">
            <SparklesIcon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Sports culture with zero judgment</span>
          </div>
          
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-[1.1] text-white">
            The Laces <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">Warmup</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl font-light">
            Ditch the dry spreadsheets and confusing jargon. We focus on the high-speed drama, superstar rivalries, and culture. Just pure vibes and human stories.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a 
              href="#vibe-quiz" 
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 font-semibold text-sm transition-all shadow-[0_4px_20px_-4px_rgba(226,29,72,0.5)] active:scale-[0.98]"
              id="btn-take-quiz"
            >
              Find Your Vibe Match
            </a>
            <a 
              href="#sandbox" 
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-sm transition-all backdrop-blur-sm"
              id="btn-stupid-questions"
            >
              Ask an Embarrassing Question
            </a>
          </div>
        </section>

        {/* Section divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-4" />

        {/* Pillar 1: The 'Vibe' Matchmaker Quiz */}
        <section id="vibe-quiz" className="w-full max-w-4xl py-16 flex flex-col items-center">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-widest font-extrabold uppercase text-rose-500">Pillar 01</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Find Your Narrative Matchmaker
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
              We'll translate your normal entertainment tastes into the sport that matches your dramatic frequency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            {/* Question 1 */}
            <div className="glass p-6 sm:p-8 rounded-3xl transition-all-custom flex flex-col">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-widest">Question 1</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-6">
                What's your ideal entertainment background noise?
              </h3>
              
              <div className="flex flex-col gap-4 mt-auto">
                <button
                  id="q1-option-a"
                  onClick={() => setQ1("A")}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all duration-300 flex items-start gap-3 ${
                    q1 === "A"
                      ? "bg-rose-500/10 border-rose-500 text-rose-200"
                      : "bg-white/2 border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs font-bold shrink-0 mt-0.5 ${
                    q1 === "A" ? "bg-rose-500 border-rose-500 text-white" : "border-slate-500 text-slate-400"
                  }`}>
                    A
                  </span>
                  <span>"Fast cars and ultra-rich people arguing in Europe"</span>
                </button>

                <button
                  id="q1-option-b"
                  onClick={() => setQ1("B")}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all duration-300 flex items-start gap-3 ${
                    q1 === "B"
                      ? "bg-rose-500/10 border-rose-500 text-rose-200"
                      : "bg-white/2 border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs font-bold shrink-0 mt-0.5 ${
                    q1 === "B" ? "bg-rose-500 border-rose-500 text-white" : "border-slate-500 text-slate-400"
                  }`}>
                    B
                  </span>
                  <span>"High-energy spectacles, fashion walks, and chaotic mic drops"</span>
                </button>
              </div>
            </div>

            {/* Question 2 */}
            <div className="glass p-6 sm:p-8 rounded-3xl transition-all-custom flex flex-col">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-widest">Question 2</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-6">
                What hooks you deepest into a television series?
              </h3>
              
              <div className="flex flex-col gap-4 mt-auto">
                <button
                  id="q2-option-a"
                  onClick={() => setQ2("A")}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all duration-300 flex items-start gap-3 ${
                    q2 === "A"
                      ? "bg-rose-500/10 border-rose-500 text-rose-200"
                      : "bg-white/2 border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs font-bold shrink-0 mt-0.5 ${
                    q2 === "A" ? "bg-rose-500 border-rose-500 text-white" : "border-slate-500 text-slate-400"
                  }`}>
                    A
                  </span>
                  <span>"Pettiness, behind-the-scenes political drama, and bitter rivalries"</span>
                </button>

                <button
                  id="q2-option-b"
                  onClick={() => setQ2("B")}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all duration-300 flex items-start gap-3 ${
                    q2 === "B"
                      ? "bg-rose-500/10 border-rose-500 text-rose-200"
                      : "bg-white/2 border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs font-bold shrink-0 mt-0.5 ${
                    q2 === "B" ? "bg-rose-500 border-rose-500 text-white" : "border-slate-500 text-slate-400"
                  }`}>
                    B
                  </span>
                  <span>"Mind-blowing superhuman physical feats and raw star power"</span>
                </button>
              </div>
            </div>

          </div>

          {/* Dynamic Result Indicator */}
          {!showResult && (
            <div className="mt-8 text-center text-xs text-slate-500 italic">
              Answer both questions to unlock your custom narrative deck below.
            </div>
          )}
        </section>

        {/* Pillar 2: The 'Watercooler' Cheat Sheets */}
        {showResult && (
          <section id="matched-vibe-section" className="w-full max-w-4xl py-12 scroll-mt-6">
            <div className="w-full text-center mb-10">
              <span className="text-[10px] tracking-widest font-extrabold uppercase text-rose-500">Pillar 02</span>
              
              {vibeResult === "F1" && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-f1/10 text-f1 border border-f1/20 text-xs font-bold mt-2">
                  🏁 Match Confirmed: Formula 1 Vibe
                </div>
              )}
              {vibeResult === "NBA" && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold mt-2">
                  🏀 Match Confirmed: NBA Narrative Vibe
                </div>
              )}
              {vibeResult === "HYBRID" && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-bold mt-2">
                  🏎️ 🏀 Match Confirmed: Dual-Agent Vibe (Hybrid Sport Fans)
                </div>
              )}
              
              <h2 className="font-display font-black text-3xl text-white mt-4">
                Your Watercooler Cheat Sheet
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                {vibeResult === "HYBRID" 
                  ? "You enjoy multiple dimensions of sports drama! Explore both F1 and NBA cheat sheets below."
                  : "Here is your quick breakdown to stand confident at social gatherings without studying a single statistic."
                }
              </p>
            </div>

            {/* Hybrid or toggle tabs */}
            {vibeResult === "HYBRID" && (
              <div className="flex justify-center gap-2 mb-8">
                <button
                  onClick={() => setCurrentTab("F1")}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    currentTab === "F1"
                      ? "bg-f1 text-white shadow-lg shadow-f1/30"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  🏎️ Formula 1 Drama
                </button>
                <button
                  onClick={() => setCurrentTab("NBA")}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    currentTab === "NBA"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  🏀 NBA Superstar Drama
                </button>
              </div>
            )}

            {/* Vibe Cards Container */}
            <div className="relative">
              
              {/* Formula 1 Vibe Card */}
              {currentTab === "F1" && (
                <div className="glass rounded-3xl overflow-hidden border-f1/20 shadow-2xl shadow-f1/5 glow-f1 transition-all duration-500 animate-fadeIn">
                  
                  {/* Decorative Banner */}
                  <div className="w-full bg-gradient-to-r from-f1/20 via-[#3a0606] to-[#0d0714] p-6 sm:p-8 border-b border-white/5 relative">
                    <div className="absolute top-4 right-4 text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-f1/20 text-f1 border border-f1/30">
                      High-Speed Reality TV
                    </div>
                    <span className="text-[10px] font-bold text-f1 uppercase tracking-widest">The Match</span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                      Formula 1: The Fast & The Petty
                    </h3>
                  </div>

                  <div className="p-6 sm:p-8 space-y-8">
                    
                    {/* 5-Year-Old Explanation */}
                    <div>
                      <h4 className="text-xs font-extrabold text-f1 uppercase tracking-wider mb-2">
                        🏎️ The 5-Year-Old Explanation
                      </h4>
                      <p className="text-base text-slate-300 leading-relaxed italic bg-white/2 p-4 rounded-2xl border border-white/5">
                        "20 drivers go 200mph in spaceships, but only 2 or 3 teams have enough cash to build cars that actually win. So, 90% of the show is drivers plotting behind-the-scenes betrayals against their own teammates to save their careers. It's basically high-speed reality TV."
                      </p>
                    </div>

                    {/* Current Gossip */}
                    <div>
                      <h4 className="text-xs font-extrabold text-f1 uppercase tracking-wider mb-3">
                        🍿 Current Gossip: The Bitter Rivalries
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-f1/10 transition-all">
                          <span className="text-xs font-bold text-white block">Musical Chairs</span>
                          <span className="text-xs text-slate-400 mt-1 block">
                            Drivers are constantly trying to slide into rival cars. Contracts are signed in complete secrecy, causing insane team-principal outbursts on camera.
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-f1/10 transition-all">
                          <span className="text-xs font-bold text-white block">Teammate Sabotage</span>
                          <span className="text-xs text-slate-400 mt-1 block">
                            Your teammate has the exact same car, so they are your ultimate enemy. Sharing data is technically mandatory, but 'misunderstandings' happen every weekend.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* The Script */}
                    <div className="p-5 rounded-2xl bg-f1/5 border border-f1/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-f1 animate-pulse" />
                          <h4 className="text-xs font-extrabold text-f1 uppercase tracking-wider">
                            The Smart Script (Copy & Sound Smart)
                          </h4>
                        </div>
                        <p className="text-sm text-slate-200 font-medium mt-2 leading-relaxed">
                          "Honestly, Red Bull's engineering edge is shrinking, which means the constructor's championship is finally pure cinema again."
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopy("Honestly, Red Bull's engineering edge is shrinking, which means the constructor's championship is finally pure cinema again.", "F1")}
                        className="px-4 py-2.5 rounded-xl bg-f1/20 hover:bg-f1/30 text-f1 border border-f1/30 text-xs font-bold flex items-center gap-2 shrink-0 transition-all active:scale-95"
                      >
                        {copiedText === "F1" ? (
                          <>
                            <CheckIcon className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-4 h-4" />
                            <span>Copy Script</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* NBA Vibe Card */}
              {currentTab === "NBA" && (
                <div className="glass rounded-3xl overflow-hidden border-blue-500/20 shadow-2xl shadow-blue-500/5 glow-nba transition-all duration-500 animate-fadeIn">
                  
                  {/* Decorative Banner */}
                  <div className="w-full bg-gradient-to-r from-blue-950/30 via-[#0b1029] to-[#050512] p-6 sm:p-8 border-b border-white/5 relative">
                    <div className="absolute top-4 right-4 text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Superstar Drama Hub
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">The Match</span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                      NBA: High Fashion & Petty Feuds
                    </h3>
                  </div>

                  <div className="p-6 sm:p-8 space-y-8">
                    
                    {/* 5-Year-Old Explanation */}
                    <div>
                      <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-2">
                        🏀 The 5-Year-Old Explanation
                      </h4>
                      <p className="text-base text-slate-300 leading-relaxed italic bg-white/2 p-4 rounded-2xl border border-white/5">
                        "It's a league of massive, high-fashion giants who are basically independent media companies. The post-game outfits and Instagram beefs matter just as much as the points. Star players force trades to play with friends, and the trash-talk is elite reality television."
                      </p>
                    </div>

                    {/* Current Gossip */}
                    <div>
                      <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-3">
                        🍿 Current Gossip: Superstar Chess
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-blue-500/10 transition-all">
                          <span className="text-xs font-bold text-white block">Vibe Checks & Fashion Walks</span>
                          <span className="text-xs text-slate-400 mt-1 block">
                            The tunnel entrance is literally a runway. Players draft outfit styling contracts before games, and a bad fit is meme'd as aggressively as a airballed shot.
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-blue-500/10 transition-all">
                          <span className="text-xs font-bold text-white block">Twitter Burners & Petty Likes</span>
                          <span className="text-xs text-slate-400 mt-1 block">
                            Superstars operate burner accounts to defend their play, and they will subtly like Instagram posts criticizing their front office to negotiate trades.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* The Script */}
                    <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                          <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">
                            The Smart Script (Copy & Sound Smart)
                          </h4>
                        </div>
                        <p className="text-sm text-slate-200 font-medium mt-2 leading-relaxed">
                          "The league parity is insane right now. Superteams are dead—it's all about who actually runs their bench deep enough in the clutch."
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopy("The league parity is insane right now. Superteams are dead—it's all about who actually runs their bench deep enough in the clutch.", "NBA")}
                        className="px-4 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-2 shrink-0 transition-all active:scale-95"
                      >
                        {copiedText === "NBA" ? (
                          <>
                            <CheckIcon className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-4 h-4" />
                            <span>Copy Script</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* Section divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-12" />

        {/* Pillar 3: The 'No Stupid Questions' Sandbox */}
        <section id="sandbox" className="w-full max-w-4xl py-12 scroll-mt-6">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-widest font-extrabold uppercase text-rose-500">Pillar 03</span>
            <h2 className="font-display font-extrabold text-3xl text-white mt-1">
              "No Stupid Questions" Sandbox
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
              Skip the dry, dense rulebooks and search results. Click an embarrassing question or search below to get a friendly, analogy-based explanation.
            </p>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8 flex flex-col gap-8">
            
            {/* Custom Search Box */}
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <SearchIcon className="w-5 h-5" />
              </span>
              <input
                id="search-stupid-questions"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search embarrassing questions (e.g. offside, DRS, tires)..."
                className="w-full bg-white/2 hover:bg-white/5 focus:bg-white/5 border border-white/10 hover:border-white/20 focus:border-rose-500/50 outline-none text-sm text-slate-100 rounded-2xl pl-12 pr-4 py-4 transition-all"
              />
            </div>

            {/* Empathy Chips / Grid */}
            <div className="flex flex-wrap gap-2.5">
              {filteredQuestions.map((q) => (
                <button
                  key={q.id}
                  id={`chip-${q.id}`}
                  onClick={() => setActiveQuestion(q.id === activeQuestion ? null : q.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeQuestion === q.id
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 hover:border-white/10"
                  }`}
                >
                  <span>{q.icon}</span>
                  <span>{q.q}</span>
                </button>
              ))}
              
              {filteredQuestions.length === 0 && (
                <div className="text-xs text-slate-500 italic py-4">
                  No embarrassing questions found matching "{searchQuery}". Try searching "offside" or "DRS".
                </div>
              )}
            </div>

            {/* Explanation Sandbox */}
            <div className="relative min-h-[140px] flex items-center justify-center p-6 rounded-2xl bg-white/2 border border-white/5 overflow-hidden">
              
              {/* Supportive Friend Profile Overlay */}
              {activeQuestion ? (
                <div className="w-full animate-fadeIn flex flex-col sm:flex-row gap-4 items-start">
                  
                  {/* Friend avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-violet-500 shrink-0 flex items-center justify-center font-display font-black text-sm text-white shadow-lg shadow-rose-500/20">
                    L
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-white">Your Supportive Friend</span>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        Zero Stats
                      </span>
                    </div>
                    
                    <p className="text-sm font-semibold text-slate-200 bg-white/5 py-1 px-3 rounded-lg border border-white/5 inline-block">
                      "{sandboxQuestions.find((q) => q.id === activeQuestion)?.q}"
                    </p>
                    
                    <p className="text-slate-300 text-sm leading-relaxed pt-2 font-medium">
                      {sandboxQuestions.find((q) => q.id === activeQuestion)?.a}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 max-w-sm flex flex-col items-center">
                  <UserGroupIcon className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">The Non-Judgmental Corner</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Select one of the chips above or search a sports term to see a slang-free explanation explained with daily analogies.
                  </p>
                </div>
              )}
              
            </div>

          </div>
        </section>

      </main>

      {/* Strategic Footer */}
      <footer className="w-full border-t border-white/5 bg-[#030308] mt-24 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-lg text-white">LACES SPORTS</span>
            <span className="text-slate-600">|</span>
            <span>Vibe Prototype 2026</span>
          </div>
          <div className="text-center sm:text-right">
            <p>Designed via Antigravity to address new sports fan imposter syndrome.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
