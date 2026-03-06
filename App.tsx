import React, { useState, useRef } from 'react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import MentorshipPage from './components/MentorshipPage';
import ShopPage from './components/ShopPage';
import CommunityPage from './components/CommunityPage';
import ImmersionPage from './components/ImmersionPage';
import ProductsPage from './components/ProductsPage';
import NewsletterPage from './components/NewsletterPage';
import AdminPage from './components/AdminPage';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const contentRef = useRef<HTMLDivElement>(null);

  // Transition Logic
  const handleNavigate = (page: string) => {
    if (page === currentPage) return;
    
    // Performance optimization: refresh ScrollTrigger only when needed
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Request animation frame for smoother transition before refresh
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  };

  // Simple Router Switch
  const renderContent = () => {
    switch (currentPage) {
      case 'mentorship':
        return <MentorshipPage />;
      case 'immersion':
        return <ImmersionPage />;
      case 'products':
        return <ProductsPage />;
      case 'shop':
        return <ShopPage />;
      case 'community':
        return <CommunityPage />;
      case 'newsletter':
        return <NewsletterPage />;
      case 'admin':
        return <AdminPage />;
      case 'home':
      default:
        return <HeroSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-retro-bg font-mono text-black selection:bg-black selection:text-white overflow-x-hidden flex flex-col">
      
      {/* Preloader runs once on mount */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <Navbar activeTab={currentPage} onNavigate={handleNavigate} />
      
      {/* Main content area adjusted for sidebar width on desktop (md:pl-72) */}
      {/* Added pt-[70px] for mobile to account for fixed navbar */}
      <main ref={contentRef} className="transition-all duration-300 md:pl-72 flex-grow relative pt-[70px] md:pt-0">
        {renderContent()}
      </main>
      
      {/* Footer positioned outside main content flow but respected sidebar margin */}
      <div className="transition-all duration-300 md:pl-72">
        <Footer onNavigate={handleNavigate} />
      </div>
      
      {/* Decorative background grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.05] z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default App;