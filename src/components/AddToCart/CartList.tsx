// Cart.tsx (Main Component)
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useCart } from '../AddToCart/CartContext';
import { CartItem } from '../AddToCart/CartTypes';
import '../../styles/CartList.css';
import { useNavigate } from 'react-router-dom';


interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

// Cart Item Component
interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: string, currentQuantity: number, change: number) => void;
  onRemove: (id: string) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ 
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

// Cart Summary Component
interface CartSummaryProps {
  subtotal: number;
  hasItems: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, hasItems }) => {
  const navigate = useNavigate();
  const handleCheckOutClick = () => {
    navigate('/CheckOut'); // or whatever your sign-in route is
  };
  const shipping = hasItems ? 5 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  return (
    <div className="cart-summary">
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="summary-row total-row">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      
      <button
       onClick={handleCheckOutClick}
        className="checkout-button" 
        disabled={!hasItems}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

// Empty Cart Component
interface EmptyCartProps {
  onClose: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onClose }) => {
  return (
    <div className="empty-cart">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      
      <h3>Your cart is empty</h3>
      <p>Looks like you haven't added any items to your cart yet.</p>
      
      <button 
        className="continue-shopping"
        onClick={onClose}
      >
        Continue Shopping
      </button>
    </div>
  );
};

// Main Cart Component
const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add event listener to close cart when pressing escape
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling on body when cart is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return acc + price * item.quantity;
  }, 0);

  // Handle quantity change
  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0 && newQuantity <= 10) {
      updateQuantity(id, newQuantity);
    }
  };

  if (!mounted) {
    return null;
  }

  const cartContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="cart-overlay" onClick={onClose} />
          <motion.div 
            className="cart-container"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="cart-header">
              <h2>Your Cart ({items.length})</h2>
              <button 
                className="close-button"
                onClick={onClose}
                aria-label="Close cart"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {items.length > 0 ? (
              <>
                <div className="cart-content">
                  <AnimatePresence>
                    {items.map(item => (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                <CartSummary subtotal={subtotal} hasItems={items.length > 0} />
              </>
            ) : (
              <EmptyCart onClose={onClose} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Use a portal to render the cart at the end of the document body
  return ReactDOM.createPortal(
    cartContent,
    document.body
  );
};

export default Cart;