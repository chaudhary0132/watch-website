import React, { createContext, useContext, useState } from 'react';
import { WatchProduct, JournalArticle } from '../types';

interface QuickViewContextType {
  selectedProduct: WatchProduct | null;
  openQuickView: (product: WatchProduct) => void;
  closeQuickView: () => void;
  selectedArticle: JournalArticle | null;
  openArticle: (article: JournalArticle) => void;
  closeArticle: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openQuickView = (product: WatchProduct) => setSelectedProduct(product);
  const closeQuickView = () => setSelectedProduct(null);

  const openArticle = (article: JournalArticle) => setSelectedArticle(article);
  const closeArticle = () => setSelectedArticle(null);

  return (
    <QuickViewContext.Provider
      value={{
        selectedProduct,
        openQuickView,
        closeQuickView,
        selectedArticle,
        openArticle,
        closeArticle,
        isSearchOpen,
        setIsSearchOpen
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};
