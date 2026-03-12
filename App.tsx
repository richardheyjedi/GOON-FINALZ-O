import React, { useState, useRef, Suspense, useCallback, lazy, useMemo } from 'react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Lazy load page components for code splitting
const MentorshipPage = lazy(() => import('./components/MentorshipPage'));
const ShopPage = lazy(() => import('./components/ShopPage'));
const CommunityPage = lazy(() => import('./components/CommunityPage'));
const ImmersionPage = lazy(() => import('./components/ImmersionPage'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const NewsletterPage = lazy(() => import('./components/NewsletterPage'));
const AdminPage = lazy(() => import('./components/AdminPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-retro-bg">
    <div className="font-mono text-black">Carregando...</div>
  </div>
);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Page component mapping - memoized for performance
const PAGE_COMPONENTS = {
  home: { component: HeroSection, lazy: false },
  mentorship: { component: MentorshipPage, lazy: true },
  immersion: { component: ImmersionPage, lazy: true },
  products: { component: ProductsPage, lazy: true },
  shop: { component: ShopPage, lazy: true },
  community: { component: CommunityPage, lazy: true },
  newsletter: { component: NewsletterPage, lazy: true },
  admin: { component: AdminPage, lazy: true },
} as const;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const contentRef = useRef<HTMLDivElement>(null);

  // Memoized navigation handler
  const handleNavigate = useCallback((page: string) => {
    if (page === currentPage) return;
    
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  }, [currentPage]);

  // Memoized content renderer using component map
  const renderContent = useCallback(() => {
    const page = currentPage as keyof typeof PAGE_COMPONENTS;
    const pageConfig = PAGE_COMPONENTS[page] || PAGE_COMPONENTS.home;
    const Component = pageConfig.component;

    if (page === 'home') {
      return <Component onNavigate={handleNavigate} />;
    }

    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    );
  }, [currentPage, handleNavigate]);

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