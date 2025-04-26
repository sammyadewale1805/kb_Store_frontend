import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import styles from '../../styles/AddToCartCard.module.css';
import { useCart } from './CartContext';

interface AddToCartProps {
  id: string;
  name: string;
  image: string;
  price: string;
  country: string;
  rating: number;
  onClose: () => void;
}

export default function AddToCartModal(props: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('default');
  const [modalRoot, setModalRoot] = useState<Element | null>(null);
  
  // Use our cart context
  const { addToCart } = useCart();
  
  // Color palette for a more modern look
  const colors = [
    { name: 'default', value: '#343434', label: 'Classic Black' },
    { name: 'blue', value: '#3C73C8', label: 'Ocean Blue' },
    { name: 'red', value: '#E74C3C', label: 'Ruby Red' },
    { name: 'green', value: '#2ECC71', label: 'Emerald' },
    { name: 'purple', value: '#9B59B6', label: 'Lavender' },
  ];
  
  useEffect(() => {
    // Find or create modal root element for portal
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    setModalRoot(root);
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Calculate total price based on quantity
  const calculateTotal = () => {
    const basePrice = parseFloat(props.price.replace(/[^0-9.]/g, ''));
    return (basePrice * quantity).toFixed(2);
  };

  // Handle adding item to cart
  const handleAddToCart = () => {
    addToCart({
      id: props.id,
      name: props.name,
      image: props.image,
      price: props.price,
      quantity: quantity,
      size: size,
      color: color
    });
    props.onClose();
  };

  // Modal content with improved styling for full-page overlay
  const modalContent = (
    <AnimatePresence>
      <motion.div 
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={props.onClose} // Close when clicking backdrop
      >
        <motion.div 
          className={styles.modalContainer}
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
        >
          {/* Modal content structure remains the same */}
          <div className={styles.modalHeader}>
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Add to Your Cart
            </motion.h2>
            <motion.button 
              className={styles.closeButton}
              onClick={props.onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          </div>
          
          <div className={styles.modalContent}>
            <div className={styles.productPreview}>
              {/* Product image and info */}
              <motion.div
                className={styles.imageContainer}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.img 
                  src={props.image} 
                  alt={props.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className={styles.imageBadge}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  Limited Edition
                </motion.div>
              </motion.div>
              
              <motion.div 
                className={styles.previewInfo}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3>{props.name}</h3>
                <p className={styles.productOrigin}>
                  <span className={styles.originLabel}>Origin:</span> {props.country}
                </p>
                <div className={styles.productRating}>
                  <span className={styles.ratingStars}>
                    {[...Array(Math.floor(props.rating))].map((_, i) => (
                      <motion.span 
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                      >⭐</motion.span>
                    ))}
                    {props.rating % 1 > 0 && <span>✩</span>}
                  </span>
                  <span className={styles.ratingValue}>{props.rating}</span>
                </div>
                <motion.div 
                  className={styles.productPrice}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <span className={styles.priceLabel}>Price: </span>
                  <span className={styles.priceValue}>{props.price}</span>
                </motion.div>
              </motion.div>
            </div>
            
            <div className={styles.optionsContainer}>
              {/* Size selector */}
              <motion.div 
                className={styles.optionSection}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h4>Select Size</h4>
                <div className={styles.sizeOptions}>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sizeOption) => (
                    <motion.button
                      key={sizeOption}
                      className={`${styles.sizeButton} ${size === sizeOption ? styles.activeSizeButton : ''}`}
                      onClick={() => setSize(sizeOption)}
                      whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {sizeOption}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              {/* Color selector */}
              <motion.div 
                className={styles.optionSection}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h4>Select Color</h4>
                <div className={styles.colorOptions}>
                  {colors.map((colorOption) => (
                    <motion.div key={colorOption.name} className={styles.colorOptionWrapper}>
                      <motion.button
                        className={`${styles.colorButton} ${color === colorOption.name ? styles.activeColorButton : ''}`}
                        style={{ backgroundColor: colorOption.value }}
                        onClick={() => setColor(colorOption.name)}
                        whileHover={{ scale: 1.15, boxShadow: "0 0 0 2px white, 0 0 0 4px " + colorOption.value }}
                        whileTap={{ scale: 0.95 }}
                      />
                      {color === colorOption.name && (
                        <motion.span 
                          className={styles.colorName}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {colorOption.label}
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Quantity selector */}
              <motion.div 
                className={styles.optionSection}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h4>Quantity</h4>
                <div className={styles.quantitySelector}>
                  <motion.button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </motion.button>
                  <motion.span 
                    className={styles.quantityValue}
                    key={quantity} // Add key to trigger animation on change
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Order summary */}
          <motion.div 
            className={styles.orderSummary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4>Order Summary</h4>
            <div className={styles.summaryRow}>
              <span>Price ({quantity} item{quantity > 1 ? 's' : ''})</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </motion.div>
          
          {/* Footer with action buttons */}
          <div className={styles.modalFooter}>
            <motion.button
              className={styles.continueShoppingButton}
              onClick={props.onClose}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Continue Shopping
            </motion.button>
            
            <motion.button
              className={styles.addToCartButton}
              onClick={handleAddToCart} // Updated to use our handler
              whileHover={{ scale: 1.05, backgroundColor: "#0066cc" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Cart - ${calculateTotal()}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
  
  // Use ReactDOM portal to render modal at the root level
  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
}