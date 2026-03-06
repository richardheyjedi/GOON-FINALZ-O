import React from 'react';
import { Check, Zap, Crown, Infinity, ShieldAlert, Lock, AlertTriangle } from 'lucide-react';
import { content, Mentor } from '../content';

const MentorshipPage: React.FC = () => {
   return (
      <div className="w-full min-h-screen bg-retro-bg p-4 md:p-12 animate-slide-in-up overflow-x-hidden">

         {/* HEADER SECTION - RESPONSIVE LAYOUT */}
         <div className="mb-12 md:mb-24 relative">
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

            <div className="relative z-10 max-w-4xl mx-auto md:mx-0">

               <div className="flex flex-col md:flex-row items-start md:items-end gap-2 mb-4">
                  <div className="bg-black text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest transform -rotate-2">
                     {content.mentorship.header.tag}
                  </div>
                  <h1 className="font-pixel text-2xl md:text-4xl uppercase tracking-tighter leading-none opacity-80">
                     {content.mentorship.header.title}
                  </h1>
               </div>

               <div className="relative pl-0 md:pl-12 flex flex-col items-start">
                  <div className="transform -rotate-12 z-20 mb-2 md:mb-0 relative md:absolute md:-top-6 md:left-40 lg:left-48">
                     <span className="font-marker text-xl md:text-3xl text-blue-800 whitespace-nowrap">{content.mentorship.header.subTitle}</span>
                  </div>

                  <div className="relative inline-block mt-4 md:mt-8 transform rotate-1 self-center md:self-auto max-w-full">
                     {/* MESSY CIRCLE SVG */}
                     <svg className="absolute -top-[20%] -left-[10%] w-[120%] h-[140%] pointer-events-none text-black z-0 opacity-90 hidden sm:block" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <path d="M20,50 C20,20 80,10 150,10 C240,10 280,30 280,50 C280,80 220,90 150,90 C80,90 30,80 30,60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="animate-[draw_0.8s_ease-out_forwards]" />
                     </svg>
                     
                     <span className="font-marker text-[15vw] sm:text-6xl md:text-[7rem] leading-none text-black relative z-10 mix-blend-multiply break-words">
                        {content.mentorship.header.mainTitle}
                     </span>
                  </div>
               </div>
            </div>
         </div>

         {/* DUAL CARDS SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 relative z-10 items-center">

            {/* --- ELITE PROTOCOL (HIGHLIGHTED & FIRST) --- */}
            <div className="relative group order-1 lg:order-1 transform md:-translate-y-4 z-20">
               {/* Neon Shadow Effect */}
               <div className="absolute top-2 left-2 w-full h-full bg-[#ccff00] -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform border-2 border-black"></div>

               <div className="bg-black text-white border-4 border-black h-full flex flex-col relative overflow-hidden shadow-2xl">

                  {/* === REVENUE BADGE === */}
                  <div className="bg-[#ccff00] text-black w-full py-3 px-4 border-b-4 border-black flex items-center justify-center gap-2 animate-pulse">
                     <AlertTriangle size={18} fill="black" className="text-[#ccff00]" />
                     <span className="font-black font-mono text-[10px] md:text-xs uppercase tracking-tight">
                        APENAS PARA QUEM FATURA 1M POR ANO
                     </span>
                     <AlertTriangle size={18} fill="black" className="text-[#ccff00]" />
                  </div>

                  <div className="p-6 md:p-8 border-b-4 border-white/20 bg-gray-900/50 relative">
                     <div className="absolute top-4 right-4 p-2 opacity-20 text-[#ccff00]">
                        <Crown size={120} strokeWidth={1} />
                     </div>
                     <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 border border-white">
                        <ShieldAlert size={12} />
                        {content.mentorship.plans.elite.tag}
                     </div>
                     <h2 className="text-4xl md:text-5xl font-black uppercase font-pixel mb-2 text-white tracking-tight text-transparent stroke-text-white">
                        {content.mentorship.plans.elite.name}
                     </h2>
                  </div>

                  <div className="p-6 md:p-8 pt-0 mt-auto">
                     <a href="https://form.respondi.app/DdJzK3Xz" target="_blank" rel="noopener noreferrer" className="w-full bg-[#ccff00] text-black border-2 border-transparent py-4 md:py-5 font-black text-lg uppercase tracking-widest hover:bg-white hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_0px_#fff] hover:shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 group/btn flex items-center justify-center gap-2">
                        <span>{content.mentorship.plans.elite.cta}</span>
                        <Crown size={20} className="group-hover/btn:scale-110 transition-transform" />
                     </a>
                     <div className="mt-3 text-center flex justify-center items-center gap-2 text-[10px] font-mono uppercase text-gray-500">
                        <Lock size={10} />
                        {content.mentorship.plans.elite.vagas}
                     </div>
                  </div>
               </div>
            </div>

            {/* --- INFINITY PROTOCOL (SECOND) --- */}
            <div className="relative group order-2 lg:order-2 opacity-90 hover:opacity-100 transition-opacity">
               <div className="absolute top-2 left-2 w-full h-full border-2 border-dashed border-gray-400 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
               <div className="bg-white border-4 border-black h-full flex flex-col relative overflow-hidden">
                  <div className="p-6 md:p-8 border-b-4 border-black bg-gray-50 relative">
                     <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Infinity size={100} strokeWidth={1} />
                     </div>
                     <div className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                        {content.mentorship.plans.infinity.tag}
                     </div>
                     <h2 className="text-3xl md:text-4xl font-black uppercase font-pixel mb-2">{content.mentorship.plans.infinity.name}</h2>
                  </div>
                  <div className="p-6 md:p-8 flex-grow">
                     <ul className="space-y-3 font-mono text-xs md:text-sm">
                        {content.mentorship.plans.infinity.benefits.map((item, i) => (
                           <li key={i} className="flex items-start gap-3">
                              <div className="bg-blue-100 text-blue-700 border border-blue-700 p-0.5 mt-0.5"><Check size={10} /></div>
                              <span className="uppercase font-bold">{item}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  <div className="p-6 md:p-8 pt-0 mt-auto">
                     <a href="https://form.respondi.app/DdJzK3Xz" target="_blank" rel="noopener noreferrer" className="w-full bg-white border-2 border-black py-3 md:py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-hard active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center justify-center">
                        {content.mentorship.plans.infinity.cta}
                     </a>
                  </div>
               </div>
            </div>

         </div>

         {/* --- MENTORS SECTION (REFINED) --- */}
         <div className="border-t-4 border-black pt-16 pb-12 relative">
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-3 h-3 bg-black animate-pulse"></div>
                     <span className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">System_Operators</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black uppercase font-pixel leading-none z-10">
                     MEN<span className="text-transparent stroke-text-lg" style={{ WebkitTextStroke: '2px black' }}>TORES</span>
                  </h1>
               </div>
               <div className="w-full md:w-auto">
                  <div className="bg-black text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center md:justify-start gap-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                     <ShieldAlert size={14} />
                     Elite_Instructors_Active
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {(content.mentorship.mentors as Mentor[]).map((mentor) => (
                  <div key={mentor.id} className="group flex flex-col bg-white border-4 border-black hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000] transition-all duration-300">
                     {/* Image Area */}
                     <div className="relative aspect-[4/3] overflow-hidden border-b-4 border-black bg-gray-100">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                        <img
                           src={mentor.image}
                           alt={mentor.name}
                           className={`w-full h-full object-cover ${mentor.imagePosition || 'object-top'} filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500`}
                        />

                        {/* ID Tag */}
                        <div className="absolute bottom-0 left-0 bg-[#ccff00] text-black px-3 py-1 font-mono text-[10px] font-bold border-t-2 border-r-2 border-black z-20">
                           {mentor.id}
                        </div>
                     </div>


                        {/* Content Area */}
                        <div className="p-6 flex flex-col flex-grow relative overflow-hidden">
                           {/* Background noise */}
                           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

                           <div className="relative z-10">
                              <h2 className="text-2xl font-black uppercase leading-none mb-2 font-sans">{mentor.name}</h2>
                              <div className="flex items-center gap-2 mb-4">
                                 <div className="h-px w-4 bg-black"></div>
                                 <span className="text-xs font-mono font-bold uppercase text-gray-500 tracking-wider">{mentor.role}</span>
                              </div>

                              <p className="font-mono text-xs leading-relaxed text-gray-700 mb-6 border-l-2 border-gray-200 pl-3 line-clamp-3 group-hover:line-clamp-none transition-all">
                                 {mentor.bio}
                              </p>

                              {/* Stats / Skills Simple */}
                              <div className="flex flex-wrap gap-2 mt-auto">
                                 {mentor.tags.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="px-2 py-1 border border-black text-[9px] font-bold uppercase bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors cursor-default">
                                       {tag}
                                    </span>
                                 ))}
                              </div>
                           </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <style>{`
        .stroke-text-white { -webkit-text-stroke: 1px white; }
        @keyframes slide-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.5s ease-out forwards;
        }
        @keyframes draw {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
        .animate-\\[draw_0\\.8s_ease-out_forwards\\] {
           stroke-dasharray: 600;
           stroke-dashoffset: 600;
        }
      `}</style>
      </div>
   );
};

export default MentorshipPage;