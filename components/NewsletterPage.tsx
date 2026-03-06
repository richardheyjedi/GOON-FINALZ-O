import React, { useState } from 'react';
import { Mail, Terminal, ArrowRight, Lock, FileText, Zap, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { content } from '../content';

const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('LOADING');
    
    // Simulate API call and save to localStorage
    setTimeout(() => {
      try {
        const existingEmails = JSON.parse(localStorage.getItem('goon_newsletter_emails') || '[]');
        const newEntry = {
          email,
          date: new Date().toISOString(),
          id: crypto.randomUUID()
        };
        localStorage.setItem('goon_newsletter_emails', JSON.stringify([...existingEmails, newEntry]));
        setStatus('SUCCESS');
        setEmail('');
      } catch (error) {
        console.error('Error saving email:', error);
        setStatus('IDLE'); // Reset on error
      }
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-retro-bg p-4 md:p-12 animate-slide-in-up overflow-x-hidden flex flex-col items-center justify-center relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-10 left-10 opacity-10 transform rotate-45">
            <Mail size={300} />
         </div>
         <div className="absolute bottom-10 right-10 opacity-10 transform -rotate-12">
            <Terminal size={300} />
         </div>
         {/* Grid */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border-2 border-black bg-[#ccff00] px-3 py-1 shadow-hard-sm transform -rotate-2 mb-6">
               <Zap size={14} className="fill-current" />
               <span className="font-mono text-xs font-bold uppercase tracking-widest">{content.newsletter.header.tag}</span>
            </div>
            
            <h1 className="text-[12vw] md:text-8xl font-black uppercase font-pixel tracking-tighter leading-none mb-4">
               {content.newsletter.header.title1} <span className="text-transparent stroke-text">{content.newsletter.header.title2}</span>
            </h1>
            
            <p className="font-mono text-sm md:text-base font-bold text-gray-700 max-w-lg mx-auto bg-white/50 backdrop-blur-sm p-2 border-l-4 border-black">
               {content.newsletter.header.desc}
            </p>
        </div>

        {/* MAIN TERMINAL CARD */}
        <div className="bg-black text-white border-4 border-black shadow-[12px_12px_0_0_#000] p-2 relative group">
           {/* Decorative Header of Terminal */}
           <div className="bg-gray-800 border-b border-gray-700 p-2 flex justify-between items-center mb-4">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="font-mono text-[10px] text-gray-400">secure_uplink_v4.exe</span>
              <div className="w-4"></div>
           </div>

           <div className="p-4 md:p-8">
              {status === 'SUCCESS' ? (
                 <div className="flex flex-col items-center justify-center py-10 text-center animate-pulse">
                    <CheckCircle2 size={64} className="text-[#ccff00] mb-4" />
                    <h3 className="font-pixel text-2xl text-[#ccff00] mb-2">ACCESS GRANTED</h3>
                    <p className="font-mono text-sm text-gray-400">Verifique sua caixa de entrada para confirmar o uplink.</p>
                    <button 
                       onClick={() => setStatus('IDLE')}
                       className="mt-6 text-xs font-mono underline decoration-dashed hover:text-white text-gray-500"
                    >
                       Cadastrar outro agente
                    </button>
                 </div>
              ) : (
                 <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-mono text-xs text-[#ccff00] uppercase font-bold flex items-center gap-2">
                          <Terminal size={14} /> {content.newsletter.form.label}
                       </label>
                       <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-gray-500 text-lg">{'>'}</span>
                          <input 
                             type="email" 
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             placeholder={content.newsletter.form.placeholder}
                             className="w-full bg-gray-900 border-2 border-gray-700 focus:border-[#ccff00] text-white font-mono text-lg py-4 pl-10 pr-4 outline-none transition-colors placeholder:text-gray-700"
                             required
                          />
                       </div>
                    </div>

                    <button 
                       type="submit"
                       disabled={status === 'LOADING'}
                       className="bg-[#ccff00] text-black font-black font-mono text-lg uppercase py-4 border-2 border-transparent hover:border-white hover:bg-black hover:text-[#ccff00] transition-all flex items-center justify-center gap-3 group/btn"
                    >
                       {status === 'LOADING' ? (
                          <span className="animate-pulse">ESTABLISHING CONNECTION...</span>
                       ) : (
                          <>
                             {content.newsletter.form.button} <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                          </>
                       )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                       <ShieldCheck size={12} />
                       <span>AES-256 Encrypted // No Spam Policy</span>
                    </div>
                 </form>
              )}
           </div>

           {/* Glitch Effect on Hover */}
           <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 pointer-events-none mix-blend-overlay transition-opacity"></div>
        </div>

        {/* FILE DIRECTORY / BENEFITS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
              { icon: FileText, title: "MARKET_DEEP_DIVE", desc: "Análises profundas de cases de 8 dígitos semanalmente." },
              { icon: AlertTriangle, title: "TREND_WARNINGS", desc: "Avisos antecipados sobre mudanças de algoritmo e mercado." },
              { icon: Lock, title: "BLACK_BOX_FILES", desc: "Scripts e templates exclusivos apenas para assinantes." }
           ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-black p-4 shadow-sm hover:shadow-hard transition-all cursor-default flex flex-col gap-3">
                 <div className="w-10 h-10 bg-gray-100 border border-black flex items-center justify-center">
                    <item.icon size={20} className="text-black" />
                 </div>
                 <div>
                    <h3 className="font-bold font-mono text-xs uppercase mb-1">{item.title}.pdf</h3>
                    <p className="font-mono text-[10px] text-gray-600 leading-relaxed">{item.desc}</p>
                 </div>
              </div>
           ))}
        </div>

      </div>

      <style>{`
        .stroke-text {
           -webkit-text-stroke: 2px #000;
        }
        @keyframes slide-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NewsletterPage;