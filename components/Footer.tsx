import React from 'react';
import { ArrowRight, Instagram, Terminal, ExternalLink, Copyright, Code } from 'lucide-react';
import { content } from '../content';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black text-white border-t-4 border-black relative z-30 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start justify-between">
           
           {/* BRAND COLUMN */}
           <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-5 h-5 bg-[#ccff00] border-2 border-white animate-pulse shadow-[0_0_10px_rgba(204,255,0,0.5)]"></div>
                 <h2 className="font-pixel text-3xl uppercase tracking-tighter">{content.global.brandShort}<span className="text-gray-500">_PROTOCOL</span></h2>
              </div>
              
              <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-xs border-l-2 border-gray-700 pl-4">
                 Infraestrutura de escala e dominância de mercado para operadores de elite. <br/>
                 <span className="text-gray-600 mt-2 block">System Version 2.0.4</span>
              </p>

              {/* Only Instagram - Styled Button */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white text-black px-4 py-2 font-mono text-xs font-bold uppercase border-2 border-transparent hover:bg-[#ccff00] hover:border-white transition-all shadow-[4px_4px_0_0_#333] hover:shadow-[4px_4px_0_0_#fff] hover:-translate-y-0.5"
              >
                 <Instagram size={16} />
                 <span>Follow Protocol</span>
                 <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
              </a>
           </div>

           {/* NEWSLETTER COLUMN */}
           <div className="w-full max-w-md md:ml-auto bg-gray-900/50 p-6 border border-gray-800 relative group">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>

              <h3 className="font-bold font-mono text-sm uppercase mb-4 text-[#ccff00] flex items-center gap-2">
                 <Terminal size={14} /> NEWSLETTER
              </h3>
              <p className="font-mono text-xs text-gray-400 mb-6">
                 Receba intel estratégica direto no seu terminal. Sem spam, apenas sinais de mercado.
              </p>
              
              <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); onNavigate?.('newsletter'); }}>
                 <div className="relative">
                    <input 
                      type="email" 
                      placeholder="ENTER_EMAIL_ID..." 
                      className="w-full bg-black text-white font-mono text-base md:text-xs p-3 border-2 border-gray-700 focus:border-[#ccff00] outline-none placeholder:text-gray-700 uppercase transition-colors"
                    />
                 </div>
                 <button type="submit" className="bg-white text-black font-black font-mono text-xs uppercase py-3 hover:bg-[#ccff00] transition-colors flex justify-center gap-2 px-4 items-center group/btn border-2 border-transparent hover:border-white">
                    <span>[ INITIATE UPLINK ]</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </form>
           </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase text-gray-600">
           <div className="flex items-center gap-2">
              <Copyright size={10} />
              <span>{content.global.year} {content.global.brandName}. All Rights Reserved.</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 hover:text-[#ccff00] cursor-default transition-colors">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                 Systems Operational
              </span>
              <button onClick={() => onNavigate?.('admin')} className="flex items-center gap-1 hover:text-white transition-colors">
                 <Code size={10} />
                 <span>Admin</span>
              </button>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;