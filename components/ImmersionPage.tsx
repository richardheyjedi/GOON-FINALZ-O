import React from 'react';
import { MapPin, Calendar, Zap, Target, Cpu, Layers, AlertTriangle, Crosshair, Lock, Database, Terminal, ChevronRight, Hash } from 'lucide-react';
import { content, ScheduleItem } from '../content';

// Helper to map icon names to components
const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={16} />,
  Target: <Target size={16} />,
  Zap: <Zap size={16} />,
  Crosshair: <Crosshair size={16} />,
  AlertTriangle: <AlertTriangle size={16} />,
  Lock: <Lock size={16} />
};

const ImmersionPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-retro-bg p-4 md:p-12 animate-slide-in-up overflow-x-hidden font-mono">
      
      {/* === HERO === */}
      <div className="relative mb-16 pt-6 md:pt-10">
        <div className="relative z-10 max-w-7xl mx-auto text-left">
           {/* Fluid text to prevent overflow */}
           <h1 className="text-[12vw] md:text-[10rem] leading-[0.85] font-black font-sans uppercase tracking-tighter text-black mix-blend-darken mb-6">
              {content.immersion.hero.title}
           </h1>
           
           {content.immersion.hero.tag && (
              <div className="inline-flex items-center gap-3 border-4 border-black bg-[#ccff00] px-6 py-2 shadow-[4px_4px_0_0_#000] mb-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                 <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
                 <span className="font-black font-pixel uppercase tracking-widest text-sm md:text-base text-black">{content.immersion.hero.tag}</span>
              </div>
           )}

           <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 border-l-4 md:border-l-8 border-black pl-4 md:pl-12 ml-1 md:ml-4">
              {(content.immersion.hero.subTitle1 || content.immersion.hero.subTitle2) && (
                 <div>
                    <h2 className="text-3xl md:text-6xl font-black font-pixel uppercase text-transparent stroke-text-lg">{content.immersion.hero.subTitle1}</h2>
                    <span className="text-4xl md:text-7xl font-marker text-[#ccff00] -rotate-2 block mt-1 drop-shadow-sm">{content.immersion.hero.subTitle2}</span>
                 </div>
              )}
              <p className="max-w-xl text-xs md:text-lg font-bold leading-relaxed text-gray-800 uppercase">
                 {content.immersion.hero.descLine1} <br/>
                 <span className="bg-black text-white px-1">{content.immersion.hero.descLine2}</span>
              </p>
           </div>
        </div>
      </div>

      {/* === DISRUPTIVE AGENDA === */}
      <div className="max-w-6xl mx-auto mb-20 relative">
         
         {/* Decorative Background Line */}
         <div className="absolute left-4 md:left-[8.5rem] top-0 bottom-0 w-1 bg-black/10 z-0"></div>

         <div className="flex items-center gap-4 mb-12 relative z-10">
            <div className="bg-black text-white p-2 border-2 border-black">
               <Hash size={24} />
            </div>
            <h2 className="text-3xl md:text-6xl font-black uppercase font-pixel tracking-tighter">
               EVENTOS_<span className="text-gray-400">LOG</span>
            </h2>
         </div>

         <div className="space-y-6 relative z-10">
            {(content.immersion.schedule as ScheduleItem[]).map((item, index) => (
               <div key={index} className={`group relative flex flex-col md:flex-row items-stretch ${item.type === 'secret' ? 'md:ml-12' : ''}`}>
                  
                  {/* TIME STAMP COLUMN */}
                  <div className="w-full md:w-32 bg-black text-white border-2 border-black p-3 flex flex-row md:flex-col justify-between md:justify-center items-center gap-4 md:gap-1 shrink-0 relative z-20 group-hover:bg-[#ccff00] group-hover:text-black transition-colors duration-300">
                     {item.day && item.month ? (
                        <div className="flex items-baseline md:flex-col md:items-center leading-none gap-2 md:gap-0">
                           <span className="font-pixel text-3xl md:text-4xl">{item.day}</span>
                           <span className="font-mono text-[10px] uppercase font-bold tracking-wider md:mt-1">{item.month}</span>
                        </div>
                     ) : (
                        <span className="font-pixel text-lg md:text-xl leading-none uppercase">{item.time}</span>
                     )}
                     
                     <div className="flex flex-col md:items-center text-right md:text-center">
                        {item.year && <span className="font-mono text-[10px] font-bold leading-none md:mt-1">{item.year}</span>}
                        
                        {item.originalTime ? (
                           <span className="font-mono text-[9px] uppercase opacity-60 md:mt-2">{item.originalTime}</span>
                        ) : (
                           <span className="font-mono text-[9px] uppercase opacity-60 md:mt-1">UTC-3</span>
                        )}
                     </div>
                     
                     {/* Connector Dot */}
                     <div className="absolute -right-[9px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-black rounded-full hidden md:block z-30 group-hover:scale-125 transition-transform">
                        <div className="absolute inset-0.5 bg-black rounded-full"></div>
                     </div>
                  </div>

                  {/* CONTENT CARD - WRAPPED IN LINK IF AVAILABLE */}
                  { item.link ? (
                     <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex-1 border-2 border-black border-t-0 md:border-t-2 md:border-l-0 bg-white p-6 relative overflow-hidden transition-all duration-300 block cursor-pointer
                        ${item.type === 'break' ? 'bg-[url("https://www.transparenttextures.com/patterns/diagmonds-light.png")]' : ''}
                        ${item.type === 'secret' ? 'bg-black text-white border-black' : 'hover:-translate-y-1 hover:translate-x-1 hover:shadow-hard'}
                     `}>
                        {/* Break/Secret Styling Overlays */}
                        {item.type === 'break' && (
                           <div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]"></div>
                        )}
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                 <span className={`p-1 border border-current text-[10px] font-bold uppercase flex items-center gap-1
                                    ${item.type === 'secret' ? 'text-red-500 border-red-500' : 'text-gray-500 border-gray-400'}
                                 `}>
                                    {iconMap[item.iconName] || <Terminal size={16} />}
                                    {item.type === 'break' ? 'SYSTEM_PAUSE' : item.type === 'secret' ? 'CLASSIFIED' : 'MODULE_0' + (index + 1)}
                                 </span>
                                 {item.exclusiveTag && (
                                    <span className="bg-black text-[#ccff00] text-[10px] md:text-xs font-black uppercase px-4 py-1.5 shadow-[3px_3px_0px_0px_#ccff00]">
                                       {item.exclusiveTag}
                                    </span>
                                 )}
                              </div>
                              
                              <h3 className={`text-xl md:text-3xl font-black uppercase font-sans mb-2 leading-none
                                 ${item.type === 'secret' ? 'blur-sm group-hover:blur-0 transition-all duration-500 text-red-500' : ''}
                              `}>
                                 {item.title}
                              </h3>
                              
                              <p className={`font-mono text-xs md:text-sm max-w-xl leading-relaxed whitespace-pre-line
                                 ${item.type === 'secret' ? 'text-gray-500' : 'text-gray-600'}
                              `}>
                                 {item.desc}
                              </p>
                              {item.location && (
                                 <div className="flex items-center gap-2 mt-3 text-xs md:text-sm font-bold font-mono text-black">
                                    <MapPin size={16} className="text-[#ccff00] fill-black" />
                                    <span>{item.location}</span>
                                 </div>
                              )}
                           </div>

                           {/* Action Icon / Status */}
                           <div className="md:border-l-2 md:border-black/10 md:pl-6 flex items-center justify-end shrink-0">
                              {item.type === 'secret' ? (
                                 <Lock size={24} className="text-red-500 animate-pulse" />
                              ) : item.link ? (
                                 <div className="flex items-center gap-2 bg-[#ccff00] text-black font-black uppercase text-xs md:text-sm px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-150 whitespace-nowrap">
                                    GARANTIR INGRESSO <ChevronRight size={16} />
                                 </div>
                              ) : null}
                           </div>
                        </div>
                     </a>
                  ) : (
                     <div className={`flex-1 border-2 border-black border-t-0 md:border-t-2 md:border-l-0 bg-white p-6 relative overflow-hidden transition-all duration-300
                        ${item.type === 'break' ? 'bg-[url("https://www.transparenttextures.com/patterns/diagmonds-light.png")]' : ''}
                        ${item.type === 'secret' ? 'bg-black text-white border-black' : 'hover:-translate-y-1 hover:translate-x-1 hover:shadow-hard'}
                     `}>
                        
                        {/* Break/Secret Styling Overlays */}
                        {item.type === 'break' && (
                           <div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]"></div>
                        )}
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                 <span className={`p-1 border border-current text-[10px] font-bold uppercase flex items-center gap-1
                                    ${item.type === 'secret' ? 'text-red-500 border-red-500' : 'text-gray-500 border-gray-400'}
                                 `}>
                                    {iconMap[item.iconName] || <Terminal size={16} />}
                                    {item.type === 'break' ? 'SYSTEM_PAUSE' : item.type === 'secret' ? 'CLASSIFIED' : 'MODULE_0' + (index + 1)}
                                 </span>
                                 {item.exclusiveTag && (
                                    <span className="bg-black text-[#ccff00] text-[10px] md:text-xs font-black uppercase px-4 py-1.5 shadow-[3px_3px_0px_0px_#ccff00]">
                                       {item.exclusiveTag}
                                    </span>
                                 )}
                              </div>
                              
                              <h3 className={`text-xl md:text-3xl font-black uppercase font-sans mb-2 leading-none
                                 ${item.type === 'secret' ? 'blur-sm group-hover:blur-0 transition-all duration-500 text-red-500' : ''}
                              `}>
                                 {item.title}
                              </h3>
                              
                              <p className={`font-mono text-xs md:text-sm max-w-xl leading-relaxed whitespace-pre-line
                                 ${item.type === 'secret' ? 'text-gray-500' : 'text-gray-600'}
                              `}>
                                 {item.desc}
                              </p>
                              {item.location && (
                                 <div className="flex items-center gap-2 mt-3 text-xs md:text-sm font-bold font-mono text-black">
                                    <MapPin size={16} className="text-[#ccff00] fill-black" />
                                    <span>{item.location}</span>
                                 </div>
                              )}
                           </div>

                           {/* Action Icon / Status */}
                           <div className="md:border-l-2 md:border-black/10 md:pl-6 flex items-center justify-end shrink-0">
                              {item.type === 'secret' ? (
                                 <Lock size={24} className="text-red-500 animate-pulse" />
                              ) : item.link ? (
                                 <div className="flex items-center gap-2 bg-[#ccff00] text-black font-black uppercase text-xs md:text-sm px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-150 whitespace-nowrap">
                                    GARANTIR INGRESSO <ChevronRight size={16} />
                                 </div>
                              ) : null}
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>

      <style>{`
        .stroke-text-lg { -webkit-text-stroke: 2px #000; }
        @keyframes slide-in-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-in-up { animation: slide-in-up 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ImmersionPage;