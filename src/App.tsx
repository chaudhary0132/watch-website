import React from 'react';
import { ToastProvider } from './components/ui/Toast';
import { CartProvider } from './context/CartContext';
import { QuickViewProvider } from './context/QuickViewContext';

import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { FeatureStrip } from './components/sections/FeatureStrip';
import { FeaturedCollection } from './components/sections/FeaturedCollection';
import { ArvenEdit } from './components/sections/ArvenEdit';
import { Craftsmanship } from './components/sections/Craftsmanship';
import { WatchmakingProcess } from './components/sections/WatchmakingProcess';
import { ArvenSignature } from './components/sections/ArvenSignature';
import { WatchCustomizerSection } from './components/sections/WatchCustomizerSection';
import { WhyArven } from './components/sections/WhyArven';
import { OurStory } from './components/sections/OurStory';
import { Testimonials } from './components/sections/Testimonials';
import { Press } from './components/sections/Press';
import { ArvenJournal } from './components/sections/ArvenJournal';
import { Newsletter } from './components/sections/Newsletter';
import { FinalCta } from './components/sections/FinalCta';
import { Footer } from './components/layout/Footer';

import { QuickViewModal } from './components/ui/QuickViewModal';
import { ArticleModal } from './components/ui/ArticleModal';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';
import { CheckoutModal } from './components/ui/CheckoutModal';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <CartProvider>
        <QuickViewProvider>
          <div className="arven-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Sticky Glassmorphism Header */}
            <Navbar />

            {/* Main Application Sections */}
            <main style={{ flex: 1 }}>
              <Hero />
              <FeatureStrip />
              <FeaturedCollection />
              <ArvenEdit />
              <Craftsmanship />
              <WatchmakingProcess />
              <ArvenSignature />
              <WatchCustomizerSection />
              <WhyArven />
              <OurStory />
              <Testimonials />
              <Press />
              <ArvenJournal />
              <Newsletter />
              <FinalCta />
            </main>

            {/* Luxury Footer */}
            <Footer />

            {/* Global Modals & Drawers */}
            <QuickViewModal />
            <ArticleModal />
            <CartDrawer />
            <SearchModal />
            <CheckoutModal />
          </div>
        </QuickViewProvider>
      </CartProvider>
    </ToastProvider>
  );
};

export default App;
