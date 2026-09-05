import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, WatchProduct } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: WatchProduct,
    quantity?: number,
    selectedCase?: string,
    selectedStrap?: string,
    selectedDial?: string,
    customEngraving?: string
  ) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  discountPercent: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('arven_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('arven_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (
    product: WatchProduct,
    quantity = 1,
    selectedCase = product.colorOptions?.[0]?.name || '18k Yellow Gold',
    selectedStrap = 'Cognac Calfskin Leather',
    selectedDial = 'Sunburst Champagne',
    customEngraving?: string
  ) => {
    setCart((prev) => {
      // Check if duplicate item exists with same options
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedCase === selectedCase &&
          item.selectedStrap === selectedStrap &&
          item.selectedDial === selectedDial &&
          item.customEngraving === customEngraving
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedCase,
          selectedStrap,
          selectedDial,
          customEngraving
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ARVEN10' || clean === 'TIME10') {
      setPromoCode(clean);
      setDiscountPercent(10);
      return { success: true, message: 'VIP Collector 10% discount applied!' };
    }
    if (clean === 'HOROLOGY15') {
      setPromoCode(clean);
      setDiscountPercent(15);
      return { success: true, message: 'Atelier 15% discount applied!' };
    }
    return { success: false, message: 'Invalid promotional code.' };
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        promoCode,
        applyPromoCode,
        discountPercent,
        subtotal,
        discountAmount,
        total,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
