import React from 'react';
import { Target, TrendingUp, Users, Shield, Hash, Github, Instagram, Linkedin, Star, Fingerprint } from 'lucide-react';
import { content, Mentor } from '../content';

const MentorsPage: React.FC = () => {
  
  const mentors: Mentor[] = [
    {
      id: "OP_01",
      name: "Giulliano Puga",
      role: "Lead Strategist",
      level: "LVL.99",
      image: "https://richardhey.com.br/wp-content/uploads/2026/01/freepik__enhance__95178.png",
      bio: "Especialista em escala de negócios digitais e arquitetura de comunidades. O arquiteto por trás do protocolo GOON.",
      stats: [
        { label: "Strategy", val: 98, color: "bg-blue-600" },
        { label: "Branding", val: 95, color: "bg-purple-600" },
        { label: "Chaos", val: 80, color: "bg-red-600" }
      ],
      tags: ["FOUNDER", "VISIONARY"],
      note: "THE BOSS",
      noteColor: "text-red-600",
      noteRotation: "-rotate-12"
    },
    {
      id: "OP_02",
      name: "Sarah Code",
      role: "Tech Lead",
      level: "LVL.85",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000",
      bio: "Mestre em automação e growth hacking. Transforma processos manuais em máquinas de imprimir dinheiro.",
      stats: [
        { label: "Coding", val: 100, color: "bg-green-600" },
        { label: "Auto", val: 92, color: "bg-yellow-500" },
        { label: "Logic", val: 90, color: "bg-blue-600" }
      ],
      tags: ["HACKER", "SYSTEMS"],
      note: "PURE LOGIC",
      noteColor: "text-blue-600",
      noteRotation: "rotate-6"
    },
    {
      id: "OP_03",
      name: "Marcus V.",
      role: "Sales Ops",
      level: "LVL.88",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
      bio: "Closer de alta performance. Desenvolveu scripts que converteram múltiplos 8 dígitos no último ano.",
      stats: [
        { label: "Sales", val: 99, color: "bg-red-600" },
        { label: "Speech", val: 95, color: "bg-orange-500" },
        { label: "CRM", val: 85, color: "bg-blue-600" }
      ],
      tags: ["CLOSER", "REVENUE"],
      note: "MONEY MAKER",
      noteColor: "text-green-600",
      noteRotation: "-rotate-6"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-retro-bg p-4 md:p-12 animate-slide-in-up overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <div className="mb-16 border-b-4 border-black pb-8 flex flex-col md:flex-row justify-between items-end gap-6 relative">
        <div className="absolute top-0 right-1/4 transform -translate-y-1/2 rotate-12 opacity-10 pointer-events-none">
           <Fingerprint size={200} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className="w-3 h-3 bg-black animate-pulse"></div>
             <span className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">System_Operators // Database</span>
          </div>
          <h1 className="flex flex-col md:flex-row items-start md:items-end gap-4">
             <span className="text-5xl md:text-7xl font-black uppercase font-pixel leading-none z-10">
               MENTORES
             </span>
             <span className="font-marker text-2xl md:text-4xl text-blue-600 transform -rotate-6 -translate-y-2 z-20 drop-shadow-sm">
               #The_Squad
             </span>
          </h1>
        </div>
        
        <div className="flex flex-col items-end gap-2 font-mono text-xs md:text-sm z-10">
           <div className="bg-white border-2 border-black px-3 py-1 shadow-[4px_4px_0_0_#000] flex items-center gap-2">
              <Users size={14} />
              ACTIVE_AGENTS: <span className="font-bold text-lg">03</span>
           </div>
        </div>
      </div>

      {/* OPERATORS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
         {mentors.map((mentor, index) => (
            <div key={mentor.id} className="group relative bg-white border-4 border-black shadow-hard hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col">
               
               {/* HANDWRITTEN NOTE (Absolute) */}
               <div className={`absolute -top-6 -right-4 z-40 transform ${mentor.noteRotation} pointer-events-none`}>
                  <div className={`font-marker text-2xl md:text-3xl ${mentor.noteColor} drop-shadow-md whitespace-nowrap bg-white/80 px-2`}>
                     {mentor.note}
                  </div>
                  {/* Underline scribble */}
                   <svg className={`w-full h-4 ${mentor.noteColor}`} viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="4" />
                   </svg>
               </div>

               {/* Decorative Paper Clip / Tape */}
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-yellow-200 opacity-90 shadow-sm transform rotate-1 z-30 border border-yellow-300/50"></div>

               {/* ID BADGE */}
               <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-mono px-2 py-1 z-30 border border-white">
                  ID: {mentor.id}
               </div>

               {/* IMAGE SECTION */}
               <div className="w-full h-72 bg-gray-200 border-b-4 border-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  
                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>

                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  
                  {/* Level Badge */}
                  <div className="absolute bottom-0 right-0 bg-black text-white border-t-2 border-l-2 border-white px-4 py-2 z-30 font-black font-pixel text-xs tracking-widest">
                     {mentor.level}
                  </div>
               </div>

               {/* CONTENT SECTION */}
               <div className="p-6 flex-grow flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]">
                  
                  <div className="mb-6 relative">
                     <h2 className="text-3xl font-black uppercase tracking-tighter mb-1 font-sans italic">{mentor.name}</h2>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <p className="font-mono text-xs font-bold uppercase tracking-widest text-gray-600">
                           {mentor.role}
                        </p>
                     </div>
                  </div>

                  <p className="font-mono text-sm text-gray-700 mb-6 leading-relaxed border-l-4 border-black pl-4 py-1 bg-white/50">
                     {mentor.bio}
                  </p>

                  {/* STATS BARS */}
                  <div className="space-y-4 mb-8 font-mono text-[10px] uppercase font-bold">
                     {mentor.stats.map((stat, i) => (
                        <div key={i}>
                           <div className="flex justify-between mb-1 items-end">
                              <span className="bg-black text-white px-1">{stat.label}</span>
                              <span className="font-marker text-sm text-gray-600">{stat.val}/100</span>
                           </div>
                           <div className="w-full h-3 bg-gray-300 border-2 border-black relative shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]">
                              <div 
                                className={`h-full ${stat.color} absolute top-0 left-0 border-r-2 border-black transition-all duration-1000 ease-out`}
                                style={{ width: `${stat.val}%` }}
                              >
                                 {/* Stripe pattern for bar */}
                                 <div className="w-full h-full opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,0.5)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0.5)_75%,transparent_75%,transparent)] bg-[length:4px_4px]"></div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  
                  {/* TAGS FOOTER */}
                  <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-400 flex flex-wrap gap-2">
                     {mentor.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold border border-black bg-white px-2 py-1 hover:bg-black hover:text-white transition-colors cursor-default shadow-[2px_2px_0_0_#ccc]">
                           #{tag}
                        </span>
                     ))}
                  </div>
               </div>

               {/* HOVER ACTION OVERLAY */}
               <button className="absolute inset-x-0 bottom-0 bg-blue-600 text-white py-3 text-center font-mono text-sm font-bold uppercase translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 z-50 shadow-hard flex items-center justify-center gap-2 hover:bg-blue-700">
                  <Target size={16} />
                  Initiate_Contact
               </button>

            </div>
         ))}
      </div>

      {/* BOTTOM INFO */}
      <div className="mt-24 border-t-4 border-black pt-8 flex justify-between items-center font-mono text-xs text-gray-500">
         <p>/// SYSTEM_NOTE: DATA REFRESHED EVERY 24H</p>
         <p>SECURE_CONNECTION_ESTABLISHED</p>
      </div>
    </div>
  );
};

export default MentorsPage;