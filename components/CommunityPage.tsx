import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Globe, Lock, Terminal, ArrowRight, Zap } from 'lucide-react';
import { content } from '../content';

const CommunityPage: React.FC = () => {
  const [memberCount, setMemberCount] = useState(89);

  const galleryImages = [
    "https://aura360.com.br/wp-content/uploads/2026/03/ERICH-SHIBATA.png",
    "https://aura360.com.br/wp-content/uploads/2026/03/SERGIO-COSTA-1.png",
    "https://aura360.com.br/wp-content/uploads/2026/03/BRUNO-TATUAPE-CONCEITO.png",
    "https://aura360.com.br/wp-content/uploads/2026/03/ZHENG-LEE.png",
    "https://aura360.com.br/wp-content/uploads/2026/03/IGOR-KINGS.png",
    "https://aura360.com.br/wp-content/uploads/2026/03/GABI-LOPES.png",
  ];

  return (
    <div className="w-full min-h-screen bg-retro-bg p-4 md:p-12 animate-slide-in-up overflow-x-hidden">
      
      {/* === HEADER === */}
      <div className="mb-16 relative">
         <div className="max-w-6xl relative z-10 mx-auto text-center flex flex-col items-center">
            <div className="inline-block bg-black text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest mb-4 border border-black shadow-hard-sm">
               {content.community.header.tag}
            </div>
            <h1 className="text-[11vw] md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
               {content.community.header.titleLine1} <br/>
               <span className="bg-[#ccff00] text-black px-2 inline-block transform -skew-x-6 border-2 border-black shadow-hard my-2">
                 {content.community.header.highlight}
               </span> <br/>
               {content.community.header.titleLine2}
            </h1>
            <div className="flex flex-col gap-4 items-center">
               <p className="font-mono text-xs md:text-base max-w-xl text-gray-800 leading-relaxed font-bold">
                  {content.community.header.desc}
               </p>
            </div>
         </div>
      </div>

      {/* === TERMINAL & FEATURES === */}
      <div className="flex justify-center mb-20">
         <div className="w-full max-w-4xl flex flex-col gap-4">
            <div className="bg-black text-green-500 font-mono text-[10px] md:text-xs p-1 border-4 border-black shadow-hard h-64 md:h-96 flex flex-col relative overflow-hidden">
               <div className="bg-gray-900 text-gray-400 px-3 py-2 flex justify-between items-center border-b border-gray-800 shrink-0">
                  <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><div className="w-2 h-2 rounded-full bg-yellow-500"></div></div>
                  <span>{content.community.terminal.user}</span>
               </div>
               <div className="p-4 flex-1 overflow-hidden relative">
                  <div className="absolute inset-0 p-4 space-y-2 overflow-y-auto no-scrollbar">
                     {content.community.terminal.logs.map((log: any, i: number) => (
                        <div key={i} className={`${log.color || "text-white"} break-words`}>
                          {log.user && <span className={`font-bold ${log.color}`}>{log.user} </span>}
                          {log.user ? <span className="text-white">{log.text}</span> : log.text}
                        </div>
                     ))}
                     <div className="mt-2 animate-pulse">_</div>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-3 bg-white border-4 border-black p-2 md:p-4 shadow-sm gap-2">
               <div className="text-center border-r-2 border-black/10"><div className="font-black text-xl md:text-3xl font-pixel">{memberCount}</div><div className="text-[8px] md:text-[10px] font-mono uppercase text-gray-500 font-bold">Members</div></div>
               <div className="text-center border-r-2 border-black/10"><div className="font-black text-xl md:text-3xl font-pixel">24/7</div><div className="text-[8px] md:text-[10px] font-mono uppercase text-gray-500 font-bold">Uptime</div></div>
               <div className="text-center"><div className="font-black text-xl md:text-3xl font-pixel">98%</div><div className="text-[8px] md:text-[10px] font-mono uppercase text-gray-500 font-bold">NPS</div></div>
            </div>
         </div>
      </div>

      {/* === CTA === */}
      <div className="relative border-4 border-black bg-[#ccff00] p-6 md:p-12 shadow-hard mb-8">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
               <div className="flex items-center gap-2 mb-4"><div className="bg-black text-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase">System_Open</div></div>
               <h2 className="text-3xl md:text-6xl font-black uppercase font-pixel tracking-tighter mb-4 text-black">{content.community.cta.title} <span className="bg-black text-[#ccff00] px-1">{content.community.cta.highlight}</span></h2>
               {content.community.cta.desc && (
                  <p className="font-mono text-xs md:text-sm font-bold text-black border-l-4 border-black pl-4">{content.community.cta.desc}</p>
               )}
            </div>
            <a 
               href={content.community.cta.link}
               target="_blank"
               rel="noopener noreferrer"
               className="w-full md:w-auto bg-black text-white px-8 py-4 font-black font-mono uppercase text-lg border-4 border-white shadow-hard hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
               <span>{content.community.cta.button}</span><ArrowRight size={20} />
            </a>
         </div>
      </div>

      {/* === GALLERY === */}
      <section className="mb-20">
         <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-2">
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter">VISUAL DATABASE - HOTSEATS</h2>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
               <div key={i} className="relative border-2 border-black bg-white p-1">
                  <div className="relative overflow-hidden aspect-square">
                     <img 
                        src={img} 
                        alt="Gallery" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                     />
                  </div>
               </div>
            ))}
         </div>
      </section>


      <style>{`
        .animate-slide-in-up { animation: slide-in-up 0.5s ease-out forwards; }
        @keyframes slide-in-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default CommunityPage;