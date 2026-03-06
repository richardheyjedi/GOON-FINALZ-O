import React from 'react';
import { Target, Cpu, TrendingUp, Terminal, ChevronRight, Hash, Zap } from 'lucide-react';
import { content, ProductItem } from '../content';

// Helper to map icon names to components
const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={16} />,
  Target: <Target size={16} />,
  Cpu: <Cpu size={16} />,
  TrendingUp: <TrendingUp size={16} />,
  Zap: <Zap size={16} />
};

const ProductsPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-retro-bg p-4 md:p-12 animate-slide-in-up overflow-x-hidden font-mono">
      
      {/* === HERO === */}
      <div className="relative mb-16 pt-6 md:pt-10">
        <div className="relative z-10 max-w-7xl mx-auto text-left">
           {/* Fluid text to prevent overflow */}
           <h1 className="text-[12vw] md:text-[10rem] leading-[0.85] font-black font-sans uppercase tracking-tighter text-black mix-blend-darken mb-6">
              {content.products_page.hero.title}
           </h1>
           
           {content.products_page.hero.tag && (
              <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-3 py-1 shadow-hard-sm mb-8">
                 <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                 <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs">{content.products_page.hero.tag}</span>
              </div>
           )}

           {(content.products_page.hero.subTitle1 || content.products_page.hero.subTitle2 || content.products_page.hero.descLine1 || content.products_page.hero.descLine2) && (
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 border-l-4 md:border-l-8 border-black pl-4 md:pl-12 ml-1 md:ml-4">
                 {(content.products_page.hero.subTitle1 || content.products_page.hero.subTitle2) && (
                    <div>
                       <h2 className="text-3xl md:text-6xl font-black font-pixel uppercase text-transparent stroke-text-lg">{content.products_page.hero.subTitle1}</h2>
                       <span className="text-4xl md:text-7xl font-marker text-[#ccff00] -rotate-2 block mt-1 drop-shadow-sm">{content.products_page.hero.subTitle2}</span>
                    </div>
                 )}
                 {(content.products_page.hero.descLine1 || content.products_page.hero.descLine2) && (
                    <p className="max-w-xl text-xs md:text-lg font-bold leading-relaxed text-gray-800 uppercase">
                       {content.products_page.hero.descLine1} {content.products_page.hero.descLine1 && content.products_page.hero.descLine2 && <br/>}
                       <span className="bg-black text-white px-1">{content.products_page.hero.descLine2}</span>
                    </p>
                 )}
              </div>
           )}
        </div>
      </div>

      {/* === PRODUCTS LIST === */}
      <div className="max-w-6xl mx-auto mb-20 relative">
         
         {/* Decorative Background Line */}
         <div className="absolute left-4 md:left-[8.5rem] top-0 bottom-0 w-1 bg-black/10 z-0"></div>

         <div className="flex items-center gap-4 mb-12 relative z-10">
            <div className="bg-black text-white p-2 border-2 border-black">
               <Hash size={24} />
            </div>
            <h2 className="text-3xl md:text-6xl font-black uppercase font-pixel tracking-tighter">
               PRODUCT_<span className="text-gray-400">LOG</span>
            </h2>
         </div>

         <div className="space-y-6 relative z-10">
            {(content.products_page.items as ProductItem[]).map((item, index) => (
               <div key={index} className="group relative flex flex-col md:flex-row items-stretch">
                  
                  {/* ID COLUMN */}
                  <div className={`w-full md:w-32 bg-black text-white border-2 border-black p-3 flex flex-row md:flex-col justify-center items-center gap-3 md:gap-1 shrink-0 relative z-20 transition-colors duration-300 ${item.duration ? 'group-hover:bg-[#ccff00] group-hover:text-black' : ''}`}>
                     {item.duration && (
                        <>
                           <div className="flex flex-col items-center leading-none text-center">
                              <span className="font-pixel text-lg md:text-xl">{item.duration}</span>
                           </div>
                           <span className="font-mono text-xs md:text-sm uppercase font-bold mt-1 leading-tight">{item.durationLabel}</span>
                        </>
                     )}
                     
                     {/* Connector Dot */}
                     <div className="absolute -right-[9px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-black rounded-full hidden md:block z-30 group-hover:scale-125 transition-transform">
                        <div className="absolute inset-0.5 bg-black rounded-full"></div>
                     </div>
                  </div>

                  {/* CONTENT CARD */}
                  <div className="flex-1 border-2 border-black border-t-0 md:border-t-2 md:border-l-0 bg-white p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-hard">
                     <div className="relative z-10 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                        <div className="flex-1">
                           <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="p-1 border border-current text-[10px] font-bold uppercase flex items-center gap-1 text-gray-500 border-gray-400">
                                 {iconMap[item.iconName] || <Terminal size={16} />}
                                 {item.id}
                              </span>
                              {item.dateTag && (
                                 <span className="bg-black text-[#ccff00] text-sm font-black uppercase px-4 py-1.5 shadow-[4px_4px_0px_0px_#ccff00]">
                                    {item.dateTag}
                                 </span>
                              )}
                           </div>
                           
                           <h3 className="text-xl md:text-3xl font-black uppercase font-sans mb-2 leading-none">
                              {String(index + 1).padStart(2, '0')}. {item.title}
                           </h3>
                           
                           <p className="font-mono text-xs md:text-sm max-w-xl leading-relaxed text-gray-600 whitespace-pre-line">
                              {item.desc.split(/\[\[(.*?)\]\]/g).map((part, i) => (
                                 i % 2 === 1 ? (
                                    <span key={i} className="bg-black text-[#ccff00] font-black px-1 shadow-[2px_2px_0px_0px_#ccff00] box-decoration-clone">
                                       {part}
                                    </span>
                                 ) : part
                              ))}
                           </p>
                        </div>

                        {/* Buy Button & Prices */}
                        <div className="md:border-l-2 md:border-black/10 md:pl-6 flex flex-col items-center justify-center shrink-0 gap-3">
                           {/* Rectangular Buy Button */}
                           {item.link ? (
                              <a
                                 href={item.link}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 onClick={(e) => e.stopPropagation()}
                                 className="flex items-center gap-2 bg-[#ccff00] text-black font-black uppercase text-sm md:text-base px-8 py-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 whitespace-nowrap"
                              >
                                 {item.id === 'PROD_04' ? 'PRÉ-VENDA' : 'R$897,00'} <ChevronRight size={18} />
                              </a>
                           ) : (
                              <div className="flex items-center gap-2 bg-[#ccff00] text-black font-black uppercase text-sm md:text-base px-8 py-4 border-2 border-black opacity-50 cursor-not-allowed whitespace-nowrap">
                                 {item.id === 'PROD_04' ? 'PRÉ-VENDA' : 'R$897,00'} <ChevronRight size={18} />
                              </div>
                           )}

                           {/* Price Information */}
                           {item.price && (
                              <div className="flex flex-col items-center leading-tight">
                                 {item.originalPrice && (
                                    <span className="text-[10px] md:text-xs text-gray-400 line-through font-bold">
                                       {item.originalPrice}
                                    </span>
                                 )}
                                 <div className="flex flex-col items-center mt-0.5">
                                    <span className="text-[9px] uppercase font-black text-red-600 tracking-tighter">Pré-venda</span>
                                    <span className={`font-black text-black -mt-1 ${item.id === 'PROD_04' ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'}`}>
                                       {item.price}
                                    </span>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
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

export default ProductsPage;
