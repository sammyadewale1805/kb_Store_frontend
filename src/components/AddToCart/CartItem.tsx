import React from 'react';
import { motion } from 'framer-motion';
import { CartItem } from './CartTypes';
import './Cart.css';

interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: string, currentQuantity: number, change: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ 
  item, 
  onQuantityChange, 
  onRemove 
}) => {
  return (
    <motion.div 
      className="cart-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      layout
    >
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="item-details">
        <h3>{item.name}</h3>
        <div className="item-attributes">
          <span>Size: {item.size}</span>
          <span>Color: {item.color}</span>
        </div>
        <div className="item-price">{item.price}</div>
      </div>
      
      <div className="item-actions">
        <div className="quantity-control">
          <button 
            onClick={() => onQuantityChange(item.id, item.quantity, -1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => onQuantityChange(item.id, item.quantity, 1)}
            disabled={item.quantity >= 10}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        <button 
          className="remove-button"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Remove
        </button>
      </div>
    </motion.div>
  );
};
