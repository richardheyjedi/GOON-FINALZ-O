import React, { useState } from 'react';
import { ShoppingBag, Zap, Download, Shirt, Lock, Barcode, UserPlus, X, Check, EyeOff, ShieldAlert, Crosshair } from 'lucide-react';
import { content, ProductItem } from '../content';

const ShopPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [formStatus, setFormStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');

  const handleOpenWaitlist = (productName: string) => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
    setFormStatus('IDLE');
  };

  const handleJoinList = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('LOADING');
    // Simulate API call
    setTimeout(() => {
        setFormStatus('SUCCESS');
        setTimeout(() => {
            setIsModalOpen(false);
            setFormStatus('IDLE');
        }, 2000);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-retro-bg animate-slide-in-up overflow-x-hidden relative font-mono pb-24">
      
      {/* BACKGROUND WATERMARK */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.03]">
         <img 
            src="https://richardhey.com.br/wp-content/uploads/2026/01/logo-goon-provisoria.png" 
            className="w-[120vw] h-auto object-contain grayscale transform -rotate-12"
            alt=""
         />
      </div>

      {/* === BRANDED HERO HEADER === */}
      <div className="relative z-10 bg-black text-white border-b-4 border-black overflow-hidden">
         {/* Grid Pattern Overlay on Header */}
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
         
         <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
            <div className="flex flex-col items-center justify-center text-center gap-6">
               
               {/* TOP LABEL */}
               <div className="flex items-center gap-2 text-[#ccff00] border border-[#ccff00] px-3 py-1 bg-white/5 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Official_Supply_Drop</span>
               </div>

               {/* CENTRAL LOGO DISPLAY */}
               <div className="relative group">
                  <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full scale-150 opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
                  <img 
                     src="https://richardhey.com.br/wp-content/uploads/2026/01/logo-goon-provisoria.png" 
                     alt="GOON PROTOCOL"
                     className="h-24 md:h-40 w-auto object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-10"
                  />
               </div>

               {/* TITLE TEXT */}
               <div className="max-w-2xl mx-auto">
                  <h1 className="text-[12vw] md:text-6xl font-black uppercase font-pixel tracking-tighter leading-none mb-2">
                     STORE <span className="text-transparent stroke-text-white">FRONT</span>
                  </h1>
                  <p className="text-gray-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
                     Acesso exclusivo a equipamentos táticos, vestuário de elite e ferramentas digitais para operadores do protocolo.
                  </p>
               </div>
            </div>

            {/* DECORATIVE CORNERS */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30"></div>
         </div>

         {/* MARQUEE STRIP */}
         <div className="bg-[#ccff00] text-black py-2 border-t-4 border-black relative z-20 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-bold text-xs md:text-sm font-mono uppercase tracking-widest">
               {[...Array(10)].map((_, i) => (
                  <React.Fragment key={i}>
                     <span>/// RESTRICTED ACCESS</span>
                     <span className="text-white bg-black px-1">WAITLIST ONLY</span>
                     <span>/// NEW ASSETS INBOUND</span>
                  </React.Fragment>
               ))}
            </div>
         </div>
      </div>

      {/* === CONTENT CONTAINER === */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 relative z-10">
         
         {/* CONTROLS BAR */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 border-b-2 border-black/10 pb-6">
            <div className="flex items-center gap-4">
               <span className="font-mono text-xs font-bold uppercase bg-black text-white px-2 py-1">Filter_By:</span>
               <div className="flex gap-2">
                  <button className="text-xs font-bold uppercase hover:bg-[#ccff00] px-3 py-1 border border-black transition-colors bg-white shadow-[2px_2px_0_0_#000]">All</button>
                  <button className="text-xs font-bold uppercase hover:bg-[#ccff00] px-3 py-1 border border-black transition-colors bg-white">Gear</button>
                  <button className="text-xs font-bold uppercase hover:bg-[#ccff00] px-3 py-1 border border-black transition-colors bg-white">Digital</button>
               </div>
            </div>
            <div className="flex items-center gap-2 opacity-60">
               <ShieldAlert size={14} />
               <span className="font-mono text-[10px] uppercase font-bold">Secure_Connection_Verified</span>
            </div>
         </div>

         {/* PRODUCT GRID */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {content.shop.products.map((product) => (
               <div key={product.id} className="group flex flex-col relative bg-white border-4 border-black shadow-hard hover:shadow-[8px_8px_0_0_#ccff00] hover:-translate-y-1 transition-all duration-300">
                  
                  {/* CARD HEADER */}
                  <div className="bg-gray-100 border-b-4 border-black p-2 flex justify-between items-center z-20">
                     <div className="flex items-center gap-2">
                        <Barcode size={18} className="text-gray-500" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-600">{product.id}</span>
                     </div>
                     <div className="flex items-center gap-1 text-[9px] font-bold uppercase border border-black px-1 bg-white">
                        <Lock size={10} />
                        <span>CLASSIFIED</span>
                     </div>
                  </div>

                  {/* IMAGE AREA - CENSORED STYLE */}
                  <div className="relative aspect-square overflow-hidden border-b-4 border-black bg-gray-200">
                     
                     {/* The Censored Image */}
                     <img 
                       src={product.image} 
                       alt={product.name} 
                       loading="lazy"
                       decoding="async"
                       className="w-full h-full object-cover filter blur-md grayscale contrast-125 opacity-70 scale-110 group-hover:scale-105 transition-transform duration-700" 
                     />
                     
                     {/* Pixel/Noise Overlay */}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pixel-weave.png')] opacity-40 mix-blend-overlay pointer-events-none"></div>

                     {/* CROSSHAIR DECORATION */}
                     <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
                        <div className="absolute top-0 left-1/2 h-full w-px bg-white"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                           <Crosshair size={100} className="text-white" strokeWidth={0.5} />
                        </div>
                     </div>

                     {/* LAUNCH STRIP - CAUTION TAPE STYLE */}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
                        <div className="bg-yellow-400 border-y-4 border-black py-3 px-12 transform -rotate-12 shadow-xl w-[140%] flex justify-center relative">
                           {/* Stripes on tape */}
                           <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_12px)] opacity-10"></div>
                           <span className="font-black font-pixel text-black text-sm md:text-lg uppercase tracking-widest whitespace-nowrap animate-pulse drop-shadow-sm flex items-center gap-4">
                              <ShieldAlert size={16} /> LANÇAMENTO EM MAIO <ShieldAlert size={16} />
                           </span>
                        </div>
                     </div>

                     {/* Censored Icon */}
                     <div className="absolute top-3 right-3 z-20">
                         <div className="bg-black text-white p-2 border-2 border-white shadow-md">
                           <EyeOff size={16} />
                         </div>
                     </div>

                     {/* Pre-List Button Overlay - REMOVED */}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex-grow flex flex-col justify-between bg-white relative">
                     
                     <div className="mt-2">
                        <h3 className="text-lg font-black uppercase leading-none max-w-[90%] mb-2">{product.name}</h3>
                        <p className="font-mono text-[10px] text-gray-500 line-clamp-2">
                           Especificações técnicas ocultas. Disponível apenas para membros autorizados na data de lançamento.
                        </p>
                     </div>

                     <div className="mt-4 flex justify-between items-end border-t-2 border-dashed border-gray-300 pt-3">
                        <div className="flex flex-col">
                           <span className="text-[9px] font-mono text-gray-400 font-bold uppercase mb-0.5">MARKET VALUE</span>
                           <div className="bg-black/5 px-2 py-0.5 border border-black/10">
                              <span className="font-pixel text-sm text-gray-400 leading-none blur-[2px] select-none">R$ XXX,XX</span>
                           </div>
                        </div>
                        <div className="text-[9px] font-bold uppercase text-red-600 animate-pulse">
                           Awaiting_Drop
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* === WAITLIST MODAL === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
            
            <div className="bg-white border-4 border-black shadow-[15px_15px_0_0_#ccff00] w-full max-w-md relative z-10 animate-slide-in-up">
                
                {/* Modal Header */}
                <div className="bg-black text-white p-4 flex justify-between items-center border-b-4 border-black relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="bg-[#ccff00] text-black p-1 border border-white">
                           <Lock size={16} />
                        </div>
                        <div>
                           <div className="font-pixel text-xs text-[#ccff00] mb-0.5">SECURE_UPLINK</div>
                           <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Waitlist_Protocol_v1</div>
                        </div>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="hover:text-[#ccff00] transition-colors relative z-10"><X size={24} /></button>
                </div>

                {/* Modal Content */}
                <div className="p-8 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
                    {formStatus === 'SUCCESS' ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-20 h-20 bg-black text-[#ccff00] rounded-full flex items-center justify-center mb-6 border-4 border-[#ccff00] shadow-hard">
                                <Check size={40} />
                            </div>
                            <h3 className="font-pixel text-2xl uppercase mb-2">ACCESS GRANTED</h3>
                            <p className="font-mono text-xs text-gray-600 mb-6 max-w-xs mx-auto">
                                Sua posição na fila foi criptografada e salva. Aguarde o sinal de lançamento no seu terminal (email).
                            </p>
                            <div className="w-full bg-gray-200 h-1 mt-4 relative overflow-hidden">
                               <div className="absolute inset-0 bg-[#ccff00] animate-[draw_1s_ease-out_forwards]"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 border-l-4 border-[#ccff00] pl-4 bg-white/50 py-2">
                                <h3 className="font-black text-2xl uppercase font-sans leading-none mb-1">REQUISITAR ACESSO</h3>
                                <p className="font-mono text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                    Target Asset: <span className="text-black bg-[#ccff00] px-1">{selectedProduct}</span>
                                </p>
                            </div>

                            <form onSubmit={handleJoinList} className="flex flex-col gap-5">
                                <div className="space-y-1 group">
                                    <label className="font-mono text-[10px] font-bold uppercase flex justify-between">
                                       <span>Codename / Nome</span>
                                       <span className="text-[#ccff00] opacity-0 group-focus-within:opacity-100 transition-opacity">*REQUIRED</span>
                                    </label>
                                    <input required type="text" className="w-full border-2 border-black bg-white p-3 font-mono text-sm focus:border-[#ccff00] focus:shadow-[4px_4px_0_0_#ccff00] outline-none transition-all placeholder:text-gray-300" placeholder="SEU NOME" />
                                </div>
                                <div className="space-y-1 group">
                                    <label className="font-mono text-[10px] font-bold uppercase flex justify-between">
                                       <span>Encrypted Mail / Email</span>
                                       <span className="text-[#ccff00] opacity-0 group-focus-within:opacity-100 transition-opacity">*REQUIRED</span>
                                    </label>
                                    <input required type="email" className="w-full border-2 border-black bg-white p-3 font-mono text-sm focus:border-[#ccff00] focus:shadow-[4px_4px_0_0_#ccff00] outline-none transition-all placeholder:text-gray-300" placeholder="SEU@EMAIL.COM" />
                                </div>
                                <button 
                                    disabled={formStatus === 'LOADING'}
                                    type="submit" 
                                    className="mt-4 w-full bg-black text-white font-black uppercase py-4 hover:bg-[#ccff00] hover:text-black border-2 border-black transition-all flex justify-center items-center gap-2 shadow-hard active:shadow-none active:translate-x-1 active:translate-y-1 group"
                                >
                                    {formStatus === 'LOADING' ? 'PROCESSANDO...' : (
                                       <>
                                          <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                                          GARANTIR VAGA NA FILA
                                       </>
                                    )}
                                </button>
                            </form>
                            <div className="mt-6 text-center">
                                <p className="font-mono text-[9px] text-gray-400 uppercase flex items-center justify-center gap-2">
                                    <Lock size={10} /> LIMITED SLOTS AVAILABLE FOR THIS DROP
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
      )}

      <style>{`
         .animate-slide-in-up { animation: slide-in-up 0.5s ease-out forwards; }
         @keyframes slide-in-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
         .stroke-text-white { -webkit-text-stroke: 1px #fff; }
         @keyframes marquee {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
         .animate-marquee {
           animation: marquee 30s linear infinite;
         }
      `}</style>
    </div>
  );
};

export default ShopPage;