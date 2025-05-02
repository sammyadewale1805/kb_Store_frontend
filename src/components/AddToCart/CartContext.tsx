import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, CartContextType } from './CartTypes';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setItems(prevItems => {
      // Check if item already exists with same id, size, and color
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      );
      
      if (existingItemIndex !== -1) {
        // If item exists, update its quantity
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        // Add quantities, but cap at 10
        const newQuantity = Math.min(existingItem.quantity + newItem.quantity, 10);
        updatedItems[existingItemIndex] = { ...existingItem, quantity: newQuantity };
        return updatedItems;
      } else {
        // Otherwise add as new item
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart,
      removeFromCart, 
      updateQuantity, 
      getCartTotal,
      getCartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};