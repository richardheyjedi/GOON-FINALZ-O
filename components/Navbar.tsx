import React, { useState, useCallback, useMemo, memo } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { content, NavItem as NavItemType } from '../content';

interface NavbarProps {
  activeTab: string;
  onNavigate: (id: string) => void
}

const logoUrl = "https://richardhey.com.br/wp-content/uploads/2026/01/logo-goon-provisoria.png";

// Memoized Logo Component
const Logo = memo(({ isMobile = false }: { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <div className="h-10 w-10 relative flex items-center justify-center">
        <img 
          src={logoUrl}
          alt="GOON" 
          className="h-full w-full object-contain filter grayscale drop-shadow-sm" 
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative z-10 w-40 h-40 md:w-56 md:h-56 flex items-center justify-center perspective-[1000px] group">
      <img 
        src={logoUrl}
        alt="GOON Logo" 
        className="w-full h-full object-contain animate-spin-y filter grayscale contrast-150 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] image-rendering-pixelated"
        style={{ imageRendering: 'pixelated' }}
        loading="lazy"
      />
      
      {/* Glitch Overlay - using background for better performance */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-40 mix-blend-color-dodge transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundImage: `url(${logoUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px) brightness(1.5)',
        }}
      />
    </div>
  );
});

Logo.displayName = 'Logo';

// Memoized Navigation Item
const NavItemComponent = memo(({ 
  item, 
  index, 
  isActive, 
  onNavigate 
}: {
  item: NavItemType;
  index: number;
  isActive: boolean;
  onNavigate: (id: string) => void;
}) => {
  const Icon = item.icon;
  
  return (
    <button
      onClick={() => onNavigate(item.id)}
      className={`w-full text-left p-4 lg:p-5 border-b-2 border-black group transition-all duration-200 relative overflow-hidden shrink-0 ${isActive ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
    >
      <div className={`absolute inset-0 bg-black transform origin-left transition-transform duration-300 ease-out z-0 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
      <div className="relative z-10 flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <span className={`font-mono text-xs font-bold opacity-50 w-6 ${isActive ? 'text-white' : 'text-black group-hover:text-white'}`}>0{index + 1}</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Icon size={18} className={`transition-transform duration-300 group-hover:rotate-12 ${isActive ? 'text-white' : 'text-black group-hover:text-white'}`} strokeWidth={2.5} />
              <span className={`font-bold uppercase tracking-wider text-sm ${isActive ? 'text-white' : 'text-black group-hover:text-white'}`}>{item.name}</span>
            </div>
            <span className={`text-[10px] font-mono uppercase tracking-widest mt-0.5 ml-7 ${isActive ? 'text-gray-400' : 'text-gray-500 group-hover:text-gray-400'}`}>{item.desc}</span>
          </div>
        </div>
        <ArrowRight size={16} className={`transition-all duration-300 ${isActive ? 'text-white translate-x-0 opacity-100' : 'text-white opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100'}`} />
      </div>
    </button>
  );
});

NavItemComponent.displayName = 'NavItemComponent';

const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = useCallback((id: string) => {
    onNavigate(id);
    setIsOpen(false);
  }, [onNavigate]);

  const navItems = useMemo(() => (content.navbar as NavItemType[]), []);

  const renderedNavItems = useMemo(() => 
    navItems.map((item, index) => (
      <NavItemComponent 
        key={item.id}
        item={item}
        index={index}
        isActive={activeTab === item.id}
        onNavigate={handleNavClick}
      />
    )),
    [navItems, activeTab, handleNavClick]
  );

  const SidebarContent = memo(({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-white text-black w-full">
      <div className={`${isMobile ? 'h-56' : 'h-80'} bg-black text-white flex flex-col items-center justify-center border-b-4 border-black p-6 relative overflow-hidden shrink-0`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <Logo isMobile={isMobile} />
        <div className="mt-4 text-[10px] font-mono tracking-[0.5em] text-white/50 opacity-80 uppercase border border-white/20 px-2 py-1 bg-black/50 backdrop-blur-sm">Est. {content.global.year}</div>
      </div>
      <nav className="flex-1 overflow-y-auto bg-white flex flex-col custom-scrollbar">{renderedNavItems}</nav>
      <div className="p-6 bg-retro-bg border-t-4 border-black shrink-0">
        <div className="border-2 border-black bg-white p-3 shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer group">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase mb-1 text-gray-500 group-hover:text-black">System Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
                <span className="text-xs font-mono font-bold">ONLINE_V2.0</span>
              </div>
            </div>
            <div className="text-[10px] font-mono font-bold group-hover:underline">100%</div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-72 flex-col border-r-4 border-black bg-white z-50 shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)]">
        <SidebarContent />
      </aside>
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b-4 border-black z-50 px-4 py-3 flex justify-between items-center h-[70px]">
        <div className="flex items-center gap-2">
          <Logo isMobile={true} />
          <span className="font-mono font-bold text-xs tracking-widest bg-black text-white px-1">SYS.ROOT</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 border-2 border-black shadow-hard-sm active:shadow-none active:translate-y-1 bg-retro-bg hover:bg-black hover:text-white transition-colors">
          <Menu size={24} />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-[85%] max-w-[320px] h-full border-r-4 border-black shadow-2xl animate-slide-in-left bg-white flex flex-col">
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 z-50 p-2 bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-colors shadow-sm">
              <X size={20} />
            </button>
            <SidebarContent isMobile={true} />
          </div>
        </div>
      )}
      <style>{`
        @keyframes slide-in-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .animate-slide-in-left { animation: slide-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #000; border-radius: 3px; }
      `}</style>
    </>
  );
};

export default Navbar;