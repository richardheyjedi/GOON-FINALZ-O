import React, { useRef, useState, useEffect } from 'react';
import RetroWindow from './RetroWindow';
import { ArrowDown, Infinity, Crown, Play, Terminal, Database, ArrowRight, Maximize2, Barcode, CheckCircle2, Instagram, Youtube, ScanFace, Signal } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content, Testimonial } from '../content';

interface HeroSectionProps {
   onNavigate?: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const watermarkRef = useRef<HTMLDivElement>(null);
   const [showAllCases, setShowAllCases] = useState(false);

   const handleMentorshipClick = () => {
      if (onNavigate) onNavigate('mentorship');
   };

   const scrollToCases = () => {
      const casesSection = document.getElementById('cases-section');
      if (casesSection) {
         casesSection.scrollIntoView({ behavior: 'smooth' });
      }
   };

   useGSAP(() => {
      // 1. Initial Reveal Animation (Staggered)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".gsap-hero-item", {
         y: 30,
         opacity: 0,
         duration: 0.8,
         stagger: 0.1,
         delay: 0.1
      });

      // 2. Mouse Move Parallax Effect (Desktop Only & Optimized)
      const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
      if (isLargeScreen) {
         const contentX = gsap.quickTo(".gsap-parallax-content", "x", { duration: 1, ease: "power2.out" });
         const contentY = gsap.quickTo(".gsap-parallax-content", "y", { duration: 1, ease: "power2.out" });
         const waterX = gsap.quickTo(watermarkRef.current, "x", { duration: 1, ease: "power2.out" });
         const waterY = gsap.quickTo(watermarkRef.current, "y", { duration: 1, ease: "power2.out" });

         const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5);
            const yPos = (clientY / window.innerHeight - 0.5);

            waterX(xPos * 30);
            waterY(yPos * 30);
            contentX(xPos * -15);
            contentY(yPos * -15);
         };

         window.addEventListener('mousemove', handleMouseMove, { passive: true });
         return () => window.removeEventListener('mousemove', handleMouseMove);
      }

      // 3. ScrollTrigger for Video Section
      gsap.from(".gsap-video-card", {
         scrollTrigger: {
            trigger: ".gsap-video-section",
            start: "top 85%",
            onEnter: () => ScrollTrigger.refresh(),
         },
         y: 50,
         opacity: 0,
         stagger: 0.1,
         duration: 0.8,
         ease: "power2.out",
         onComplete: () => {
            gsap.set(".gsap-video-card", { opacity: 1, y: 0 });
         }
      });

      // 4. Bio Section Animation
      gsap.from(".gsap-bio-reveal", {
         scrollTrigger: {
            trigger: ".gsap-bio-section",
            start: "top 75%",
         },
         y: 30,
         opacity: 0,
         duration: 1,
         stagger: 0.1,
         ease: "power3.out"
      });

   }, { scope: containerRef });

   // ✅ FORA do useGSAP — fallback de segurança para mobile
   useEffect(() => {
      // Se após 2s os cards ainda estiverem invisíveis, força a visibilidade
      const safetyTimer = setTimeout(() => {
         gsap.set(".gsap-video-card", { opacity: 1, y: 0 });
         ScrollTrigger.refresh();
      }, 2000);

      // Recalcula posições quando todas as imagens terminam de carregar
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);

      return () => {
         clearTimeout(safetyTimer);
         window.removeEventListener('load', handleLoad);
      };
   }, []);

   return (
      <div ref={containerRef} className="w-full bg-retro-bg overflow-x-hidden">
         {/* === HERO CONTAINER === */}
         <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-20 lg:py-24 min-h-screen flex flex-col justify-center overflow-hidden">

            {/* === REFINED BACKGROUND LAYERS === */}
            <div className="absolute inset-0 pointer-events-none z-0">

               {/* 1. Technical Dotted Grid */}
               <div
                  className="absolute inset-0 opacity-15"
                  style={{
                     backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
                     backgroundSize: '24px 24px'
                  }}
               />

               {/* 2. Watermark - Scaled for better mobile fit */}
               <div ref={watermarkRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center overflow-hidden opacity-[0.04]">
                  <h1 className="text-[18vw] sm:text-[15vw] md:text-[20vw] font-black tracking-tighter text-black whitespace-nowrap rotate-[-12deg] select-none scale-150 transform-origin-center">
                     SYSTEM_OVERRIDE
                  </h1>
               </div>

               {/* 3. Corner Brackets - Sized responsively */}
               <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-24 md:h-24 border-l-4 border-t-4 border-black/80 gsap-hero-item"></div>
               <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-24 md:h-24 border-r-4 border-b-4 border-black/80 gsap-hero-item"></div>

               {/* 6. Vertical Data Line - Hidden on small mobile */}
               <div className="absolute top-0 bottom-0 left-4 md:left-8 lg:left-24 w-px bg-black/20 dashed-line hidden md:block"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">

               {/* LEFT COLUMN: Main Content */}
               <div className="lg:col-span-7 flex flex-col justify-center gap-6 md:gap-8 relative gsap-parallax-content mt-8 lg:mt-0">

                  {/* Main Title Window */}
                  <div className="bg-white border-4 border-black p-5 sm:p-6 md:p-8 lg:p-10 shadow-hard relative group gsap-hero-item">
                     {/* Decorative 'screws' */}
                     <div className="absolute top-2 left-2 w-1.5 h-1.5 border border-black rounded-full bg-gray-200"></div>
                     <div className="absolute top-2 right-2 w-1.5 h-1.5 border border-black rounded-full bg-gray-200"></div>
                     <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border border-black rounded-full bg-gray-200"></div>
                     <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border border-black rounded-full bg-gray-200"></div>

                     <div className="absolute -top-4 -left-2 bg-black text-white px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white shadow-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        System_Status: {content.hero.systemStatus}
                     </div>

                     <div className="flex flex-col items-start mb-6 md:mb-8 relative z-10 w-full select-none">

                        {/* HEADLINE - RESPONSIVE TYPOGRAPHY */}
                        <div className="flex flex-col items-start w-full relative z-10 overflow-visible pb-4">
                           {/* Line 1: FASHION & */}
                           <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 leading-none w-full">
                              <span
                                 className="font-black font-pixel uppercase tracking-tighter text-black whitespace-nowrap text-[10vw] sm:text-[3.5rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4.5rem] leading-none"
                              >
                                 {content.hero.titlePart1}
                              </span>
                              <span
                                 className="font-marker text-[#ccff00] drop-shadow-[2px_2px_0_#000] rotate-12 z-20 stroke-text whitespace-nowrap text-[7vw] sm:text-[2.5rem] md:text-[3rem] lg:text-[2.5rem] xl:text-[3rem] self-start md:self-center -mt-2 md:-mt-4"
                              >
                                 {content.hero.titlePart2}
                              </span>
                           </div>

                           {/* Line 2: BUSINESS */}
                           <div className="inline-block transform -rotate-1 origin-left mt-3 sm:mt-4">
                              <span
                                 className="font-black font-pixel uppercase tracking-tighter text-white bg-black px-3 py-2 sm:px-4 sm:py-3 border-4 border-transparent shadow-[4px_4px_0_0_#ccc] md:shadow-[6px_6px_0_0_#ccc] block leading-none whitespace-nowrap text-[8vw] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[3rem] xl:text-[4rem]"
                              >
                                 {content.hero.titlePart3}
                              </span>
                           </div>
                        </div>

                     </div>

                     <div className="relative mb-8 mt-2 lg:mt-6">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
                        <p className="text-[13px] sm:text-sm md:text-lg lg:text-xl font-mono pl-4 sm:pl-6 max-w-xl bg-retro-bg/50 py-2 pr-2 leading-relaxed text-gray-800 font-medium">
                           {content.hero.description}
                        </p>
                     </div>

                     {/* === BUTTONS - Stack on mobile, row on larger === */}
                     <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full">

                        {/* BUTTON 1 */}
                        <button
                           onClick={handleMentorshipClick}
                           className="group relative bg-black px-6 py-4 border-2 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all overflow-hidden w-full sm:w-auto sm:flex-1 md:flex-none"
                        >
                           <div className="absolute inset-0 bg-[#ccff00] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                           <div className="relative z-10 flex items-center justify-center gap-3">
                              <Terminal size={18} className="text-white group-hover:text-black transition-colors" />
                              <div className="flex flex-col items-start leading-none">
                                 <span className="text-[9px] font-mono text-gray-400 group-hover:text-black/60 uppercase tracking-widest mb-0.5">Run_System.exe</span>
                                 <span className="text-white group-hover:text-black font-black uppercase text-base tracking-wide transition-colors">
                                    {content.hero.buttons.primary}
                                 </span>
                              </div>
                           </div>
                        </button>

                        {/* BUTTON 2 */}
                        <button
                           onClick={scrollToCases}
                           className="group relative bg-white px-6 py-4 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all overflow-hidden w-full sm:w-auto sm:flex-1 md:flex-none"
                        >
                           <div className="relative z-10 flex items-center justify-center gap-3">
                              <span className="font-mono text-lg font-bold text-black group-hover:rotate-90 transition-transform duration-300">[</span>
                              <span className="text-black font-bold font-mono uppercase text-base tracking-tighter group-hover:underline decoration-2 underline-offset-4">
                                 {content.hero.buttons.secondary}
                              </span>
                              <span className="font-mono text-lg font-bold text-black group-hover:-rotate-90 transition-transform duration-300">]</span>
                           </div>
                        </button>

                     </div>
                  </div>

                  {/* Mobile Scroll Indicator */}
                  <div className="lg:hidden w-full flex flex-col items-center justify-center gap-2 animate-bounce-slow mt-4 opacity-70">
                     <ArrowDown size={24} className="text-black" />
                  </div>
               </div>

               {/* RIGHT COLUMN: Interactive Modules */}
               <div className="lg:col-span-5 relative flex flex-col gap-6 w-full lg:h-auto lg:justify-center mt-8 lg:mt-0 pb-12 lg:pb-0 gsap-parallax-content">

                  {/* Module 1 - INFINITY (Highlight) */}
                  <div
                     onClick={handleMentorshipClick}
                     className="group w-full relative z-30 lg:hover:z-40 transition-transform duration-300 hover:-translate-y-2 cursor-pointer gsap-hero-item flex-grow"
                  >
                     {/* Hard Shadow/Offset Background */}
                     <div className="absolute top-2 left-2 w-full h-full bg-black -z-10 border-2 border-black transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>

                     <RetroWindow title="Mentoria_Elite.mod" className="!bg-[#ccff00] h-full border-4 border-black relative overflow-hidden flex flex-col justify-between">

                        <div className="flex flex-col gap-5 relative z-10 flex-grow p-2">
                           {/* Header: Icon + Title */}
                           <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 flex-wrap sm:flex-nowrap w-full">
                              <div className="bg-black text-[#ccff00] p-3 shadow-[4px_4px_0_0_#fff] shrink-0 border-2 border-black">
                                 <Infinity size={32} strokeWidth={2.5} />
                              </div>
                              <div className="flex-1 min-w-0 pr-2">
                                 <div className="flex flex-wrap items-center gap-2 mb-2 w-full">
                                    <h3 className="font-black font-pixel uppercase leading-none text-black text-xl sm:text-2xl lg:text-xl xl:text-[1.7rem]">
                                       {content.hero.modules.elite.title}
                                    </h3>
                                    {content.hero.modules.elite.tag && (
                                       <span className="bg-black text-[#ccff00] text-[10px] sm:text-xs font-bold px-2 py-0.5 border-2 border-transparent animate-pulse whitespace-nowrap">
                                          {content.hero.modules.elite.tag}
                                       </span>
                                    )}
                                 </div>
                              </div>
                           </div>

                           {/* Primary Button */}
                           <button
                              onClick={(e) => { e.stopPropagation(); handleMentorshipClick(); }}
                              className="w-full bg-black text-[#ccff00] font-black uppercase text-base sm:text-lg py-4 md:py-5 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_#000] active:translate-y-0.5 active:shadow-none relative overflow-hidden group/btn mt-auto"
                           >
                              <span className="relative z-10">APLICAR AGORA</span>
                              <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                           </button>
                        </div>

                        {/* Status Bar at Bottom */}
                        <div className="bg-black h-6 w-[calc(100%+2rem)] -ml-4 -mb-4 mt-4 flex items-center px-4 relative">
                           <div className="w-1/2 h-2 bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full bg-[#ccff00] w-[85%] animate-pulse"></div>
                           </div>
                        </div>
                     </RetroWindow>
                  </div>

                  {/* Module 2 - Infinity */}
                  <div
                     onClick={handleMentorshipClick}
                     className="group w-full relative z-20 transition-transform duration-300 hover:-translate-y-1 cursor-pointer gsap-hero-item"
                  >
                     <RetroWindow title="Mentoria_Infinity.exe" className="bg-white group-hover:bg-blue-50 transition-colors h-full border-4">
                        <div className="flex flex-col gap-4 p-2 h-full">
                           <div className="flex items-start gap-4">
                              <div className="bg-blue-600 text-white p-3 shadow-sm shrink-0 border-2 border-black">
                                 <Crown size={32} />
                              </div>
                              <div className="flex-grow">
                                 <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="font-black font-pixel text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-[1.3rem] uppercase leading-tight group-hover:underline decoration-4 underline-offset-4 break-words text-black">
                                       {content.hero.modules.infinity.title}
                                    </h3>
                                 </div>
                                 <p className="text-xs sm:text-sm font-mono text-gray-600 font-bold leading-tight mb-4">
                                    {content.hero.modules.infinity.desc}
                                 </p>
                              </div>
                           </div>

                           {/* Apply Now Button for Infinity */}
                           <button
                              onClick={(e) => { e.stopPropagation(); handleMentorshipClick(); }}
                              className="w-full bg-black text-white font-black uppercase text-sm py-3 flex items-center justify-center gap-2 hover:bg-[#ccff00] hover:text-black transition-all border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_0_0_#000] active:translate-y-0.5 active:shadow-none mt-auto"
                           >
                              <span>APLICAR AGORA</span>
                              <ArrowRight size={16} />
                           </button>
                        </div>
                     </RetroWindow>
                  </div>
               </div>
            </div>
         </div>

         {/* === DISRUPTIVE VIDEO EVIDENCE SECTION === */}
         <section id="cases-section" className="border-t-4 border-black bg-white relative z-20 gsap-video-section">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">

               {/* SIDEBAR */}
               <div className="lg:col-span-4 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-retro-bg/30 p-6 md:p-8 flex flex-col relative sticky top-[70px] self-start h-auto lg:h-[calc(100vh-70px)] z-30">
                  <div className="relative z-10 flex flex-col h-full gap-8">

                     <div>
                        <div className="flex items-center gap-2 mb-4">
                           <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                           <h3 className="font-mono text-xs font-bold text-black uppercase tracking-widest">
                      /// LIVE_DATABASE:
                           </h3>
                        </div>

                        <div className="relative flex flex-col mt-4">
                           <h2 className="text-[13vw] sm:text-7xl md:text-8xl lg:text-[4rem] xl:text-[4.5rem] font-black uppercase leading-[0.8] tracking-tighter text-black z-10 whitespace-nowrap">
                              RESUL
                           </h2>

                           <div className="relative self-start ml-4 md:ml-6 lg:ml-2 -mt-1 md:-mt-2">
                              <h2 className="text-[13vw] sm:text-7xl md:text-8xl lg:text-[4rem] xl:text-[4.5rem] font-black uppercase leading-[0.8] tracking-tighter text-transparent stroke-text hover:text-[#ccff00] transition-colors duration-300 cursor-default relative z-10 whitespace-nowrap">
                                 TADOS
                              </h2>
                              <div className="absolute top-1/2 left-4 w-full h-4 bg-black/10 -z-0 skew-x-12"></div>
                              <div className="absolute -top-4 -right-8 md:-right-12 z-20 transform rotate-12">
                                 <div className="bg-[#ccff00] border-2 border-black px-2 py-1 text-[9px] md:text-[10px] font-bold font-mono shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                                    VERIFIED
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="relative w-full mt-10 mb-6 lg:mb-0 group">
                        <div className="absolute top-0 left-0 w-full h-full bg-red-600 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100 border-4 border-transparent"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-blue-600 -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100 border-4 border-transparent"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-black translate-x-3 translate-y-3 z-0"></div>

                        <div className="relative border-4 border-black bg-white p-8 md:p-10 flex flex-col items-center justify-center text-center overflow-hidden z-10 h-full">
                           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] pointer-events-none"></div>
                           <div className="absolute top-0 left-0 bg-black text-white px-3 py-1.5 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-b-2 border-r-2 border-black z-20">
                              TOTAL_REVENUE_VERIFIED
                           </div>
                           <div className="relative mt-8 mb-2 z-10 flex flex-col items-center">
                              <div className="relative">
                                 <span className="text-[6rem] sm:text-[7rem] md:text-[6.5rem] lg:text-[5.5rem] xl:text-[7.5rem] leading-[0.8] font-pixel text-black block tracking-tighter">
                                    100
                                 </span>
                                 <span className="absolute top-0 left-0 text-[6rem] sm:text-[7rem] md:text-[6.5rem] lg:text-[5.5rem] xl:text-[7.5rem] leading-[0.8] font-pixel text-[#ccff00] block tracking-tighter opacity-0 group-hover:opacity-100 mix-blend-multiply translate-x-[3px] translate-y-[3px] transition-all">
                                    100
                                 </span>
                              </div>
                           </div>
                           <div className="font-pixel text-3xl sm:text-4xl md:text-3xl lg:text-2xl xl:text-4xl uppercase tracking-widest mb-6 relative z-10 whitespace-nowrap">
                              MILHÕES
                              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-black"></div>
                           </div>
                           <p className="font-mono text-[10px] md:text-xs font-bold text-gray-800 leading-relaxed uppercase max-w-[260px] relative z-10">
                              {content.hero.stats.revenueDesc}
                           </p>
                           <div className="absolute bottom-3 right-3 transform -rotate-12 opacity-50 group-hover:opacity-100 transition-opacity">
                              <div className="border-2 border-black rounded-full p-1 bg-[#ccff00] shadow-[2px_2px_0_0_#000]">
                                 <CheckCircle2 size={20} className="text-black" />
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

               {/* MAIN CONTENT: THE VIDEO VAULT */}
               <div className="lg:col-span-8 bg-white relative">

                  {/* Vault Header */}
                  <div className="bg-black text-white p-3 flex justify-between items-center sticky top-0 z-40 border-b-4 border-white">
                     <div className="flex items-center gap-4">
                        <Database size={16} className="text-[#ccff00]" />
                        <span className="font-mono text-xs font-bold uppercase tracking-widest">EVIDENCE_LOG_V2.0</span>
                     </div>
                     <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-700"></div>
                        <div className="w-2 h-2 bg-gray-700"></div>
                        <div className="w-2 h-2 bg-gray-700"></div>
                     </div>
                  </div>

                  {/* The Grid */}
                  <div className="p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-gray-50 relative">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 relative z-10">
                        {(content.hero.testimonials as Testimonial[]).slice(0, showAllCases ? undefined : 6).map((t, i) => (
                           <div key={i} className="gsap-video-card group relative flex flex-col h-full bg-white border-4 border-black shadow-hard hover:shadow-[8px_8px_0_0_#ccff00] transition-all duration-300 cursor-pointer hover:-translate-y-1">

                              <div className="relative aspect-video overflow-hidden border-b-4 border-black bg-black">
                                 <img
                                    src={t.thumbnail}
                                    alt={t.subject}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                                 />
                                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 mix-blend-overlay"></div>
                              </div>

                              <div className="p-4 flex flex-col justify-between flex-grow bg-white relative">
                                 <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col pr-2">
                                       <span className="font-mono text-[9px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Subject_ID: {t.id}</span>
                                       <h3 className="text-black font-black font-sans text-lg uppercase leading-none">{t.subject}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <Maximize2 size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                                    </div>
                                 </div>

                                 <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300 flex justify-between items-end">
                                    <span className="font-mono text-[10px] uppercase bg-gray-200 px-2 py-0.5 text-gray-700 font-bold mb-1">{t.role}</span>
                                    <div className="flex flex-col items-end">
                                       {t.impactLabel && (
                                          <span className="font-mono text-[8px] uppercase text-gray-500 font-bold mb-1 tracking-wider">{t.impactLabel}</span>
                                       )}
                                       <span className="font-pixel text-xs font-bold uppercase bg-black text-[#ccff00] px-2 py-1 transform -rotate-1 shadow-sm">{t.impact}</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>

                     {!showAllCases && (
                        <div className="absolute bottom-[30px] left-0 w-full h-[450px] pointer-events-none z-20 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent"></div>
                     )}

                     <div className={`mt-8 flex justify-center relative z-30 transition-all duration-300 ${!showAllCases ? '-translate-y-8' : ''}`}>
                        <button
                           onClick={() => setShowAllCases((prev) => !prev)}
                           className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold uppercase py-3 px-6 bg-[#ccff00] border-4 border-black shadow-[6px_6px_0_0_#000] active:shadow-none active:translate-x-1.5 active:translate-y-1.5 hover:bg-black hover:text-[#ccff00] transition-colors"
                        >
                           <Barcode size={20} />
                           {showAllCases ? "VER MENOS" : "VER MAIS"}
                        </button>
                     </div>
                  </div>
               </div>

            </div>
         </section>

         {/* === BIOGRAPHY & SOCIAL MATRIX SECTION === */}
         <section className="relative py-12 md:py-24 border-t-4 border-black bg-[#e8e8e8] overflow-hidden gsap-bio-section">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">

               <div className="flex items-center gap-4 mb-12 gsap-bio-reveal">
                  <div className="bg-black text-white p-2 border-2 border-black">
                     <Terminal size={24} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase font-pixel tracking-tighter">
                     OPERATOR_<span className="text-gray-500">PROFILE</span>
                  </h2>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                  <div className="lg:col-span-5 relative group mx-auto w-full max-w-[400px] lg:max-w-none lg:mx-0 gsap-bio-reveal">
                     <div className="relative border-4 border-black bg-white p-2 md:p-3 z-10 shadow-hard transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="flex justify-between items-center mb-2 px-1">
                           <span className="font-mono text-[9px] font-bold uppercase">ID: 001-FOUNDER</span>
                           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        </div>

                        <div className="relative overflow-hidden grayscale aspect-[3/4] md:h-[500px] border-y-4 border-black bg-gray-200">
                           <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 pointer-events-none"></div>
                           <img
                              src="https://richardhey.com.br/wp-content/uploads/2026/01/freepik__enhance__95178.png"
                              alt="Giulliano Puga"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                           />
                           <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ScanFace size={64} className="text-[#ccff00] animate-pulse" strokeWidth={1} />
                           </div>
                           <div className="absolute bottom-4 left-4 z-30">
                              <div className="bg-black text-[#ccff00] px-3 py-1 font-pixel text-sm border border-white uppercase tracking-widest shadow-sm">
                                 Authorized
                              </div>
                           </div>
                        </div>

                        <div className="mt-2 flex justify-between items-end px-1 opacity-60">
                           <Barcode size={32} />
                           <span className="font-mono text-[9px] font-bold">SECURE_LEVEL_5</span>
                        </div>
                     </div>
                     <div className="absolute inset-0 border-4 border-dashed border-gray-400 transform -rotate-2 -z-10"></div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-center gsap-bio-reveal">

                     <div className="mb-8 relative w-full overflow-hidden">
                        <h2 className="font-mono text-xs sm:text-sm md:text-base font-bold text-gray-500 mb-2 tracking-widest uppercase">
                           {content.hero.bio.subtitle}
                        </h2>
                        <h1 className="flex flex-col font-black uppercase tracking-tighter leading-[0.85] relative z-10 w-full">
                           <span className="text-[15vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] whitespace-nowrap text-black mix-blend-darken">
                              {content.hero.bio.nameLine1}
                           </span>
                           <span className="text-[15vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] whitespace-nowrap text-transparent stroke-text hover:text-black transition-colors duration-300">
                              {content.hero.bio.nameLine2}
                           </span>
                        </h1>
                     </div>

                     <div className="bg-white border-l-8 border-black p-6 md:p-8 shadow-sm relative mb-10">
                        <div className="absolute -left-2 top-6 w-4 h-1 bg-[#ccff00]"></div>
                        <p className="font-mono text-sm md:text-base leading-relaxed text-gray-800 whitespace-pre-line relative z-10">
                           {content.hero.bio.text}
                        </p>
                     </div>

                     <div>
                        <div className="flex items-center gap-2 mb-4">
                           <Signal size={18} className="text-black animate-pulse" />
                           <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5">ESTABLISH_UPLINK</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           <a href="https://www.instagram.com/giulliano/" target="_blank" rel="noopener noreferrer" className="group relative bg-white border-4 border-black p-4 hover:bg-[#E1306C] hover:text-white transition-all shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden">
                              <div className="relative z-10 flex flex-col items-center gap-2">
                                 <Instagram size={28} />
                                 <span className="font-black font-mono text-xs uppercase tracking-widest">VISUAL_DB</span>
                                 <span className="font-bold text-[9px] opacity-60">@GIULLIANO</span>
                              </div>
                              <div className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                           </a>

                           <a href="https://www.tiktok.com/@__giulliano" target="_blank" rel="noopener noreferrer" className="group relative bg-white border-4 border-black p-4 hover:bg-black hover:text-[#ccff00] transition-all shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden">
                              <div className="relative z-10 flex flex-col items-center gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v2a7 7 0 0 1-7-7z" />
                                 </svg>
                                 <span className="font-black font-mono text-xs uppercase tracking-widest">VIRAL_FEED</span>
                                 <span className="font-bold text-[9px] opacity-60">@__GIULLIANO</span>
                              </div>
                              <div className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                           </a>

                           <a href="https://www.youtube.com/@GiullianoPuga" target="_blank" rel="noopener noreferrer" className="group relative bg-white border-4 border-black p-4 hover:bg-[#FF0000] hover:text-white transition-all shadow-hard active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden">
                              <div className="relative z-10 flex flex-col items-center gap-2">
                                 <Youtube size={28} />
                                 <span className="font-black font-mono text-xs uppercase tracking-widest">SINAL</span>
                                 <span className="font-bold text-[9px] opacity-60">@GIULLIANOPUGA</span>
                              </div>
                              <div className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                           </a>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </section>

         <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .dashed-line {
          background-image: linear-gradient(to bottom, #000 50%, transparent 50%);
          background-size: 1px 10px;
          background-repeat: repeat-y;
        }
        .retro-loading-bar {
          background-image: linear-gradient(45deg,rgba(255,255,255,0.3) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.3) 50%,rgba(255,255,255,0.3) 75%,transparent 75%,transparent);
          background-size: 20px 20px;
          animation: progress-stripes 1s linear infinite;
        }
        @keyframes progress-stripes {
          0% { background-position: 40px 0; }
          100% { background-position: 0 0; }
        }
         .stroke-text {
            -webkit-text-stroke: 2px #000;
         }
      `}</style>
      </div>
   );
};

export default HeroSection;