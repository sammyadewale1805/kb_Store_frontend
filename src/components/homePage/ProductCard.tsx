import { useState } from 'react';
import { motion } from 'framer-motion';
import AddToCartModal from '../AddToCart/AddToCart';
import styles from '../../styles/ProductCard.module.css';

interface ProductProps {
  id?: string;
  image: string;
  name: string;
  country: string;
  rating: number;
  reviews: number;
  price: string;
  oldPrice: string;
  discount: string;
  category?: string;
}

export default function ProductCard(props: ProductProps) {
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleOpenModal = () => setShowAddToCart(true);
  const handleCloseModal = () => setShowAddToCart(false);
  
  // Enhanced animation variants for sleeker effect
  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.03, transition: { duration: 0.4, ease: "easeOut" } }
  };
  
  const imageVariants = {
    hover: { scale: 1.12, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const overlayVariants = {
    initial: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
    hover: { backgroundColor: "rgba(0, 0, 0, 0.65)", transition: { duration: 0.5 } }
  };
  
  const buttonVariants = {
    initial: { opacity: 0, y: 25 },
    hover: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.4 } }
  };
  
  const infoVariants = {
    hover: { y: -15, transition: { duration: 0.4 } }
  };
  
  // Create a custom badge based on discount percentage
  const getDiscountBadge = () => {
    const discountValue = parseInt(props.discount.replace('%', ''));
    
    if (discountValue >= 15) {
      return (
        <motion.div 
          className={styles.hotDeal}
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: [0, -3, 0], scale: [0.9, 1.1, 1] }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          HOT DEAL
        </motion.div>
      );
    } else if (discountValue >= 10) {
      return (
        <motion.div 
          className={styles.sale}
          transition={{ duration: 0.5, delay: 0.1 }}
          initial={{ perspective: 0 }}
          animate={{ perspective: 1000 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          SALE
        </motion.div>
      );
    }
    
    return null;
  };

  return (
    <>
      <motion.div 
        className={styles.card}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={cardVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleOpenModal} // Add click handler to the entire card
      >
        <motion.img 
          src={props.image}
          alt={props.name}
          className={styles.image}
          variants={imageVariants}
        />
        
        {getDiscountBadge()}
        
        <motion.div 
          className={styles.overlay}
          variants={overlayVariants}
        >
          <motion.div 
            className={styles.info}
            variants={infoVariants}
          >
            <h4>{props.name}</h4>
            <p>{props.country}</p>
            <div className={styles.details}>
              <span className={styles.rating}>
                <motion.span 
                  initial={{ scale: 1 }}
                  animate={isHovered ? { scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.7 }}
                >⭐</motion.span> {props.rating}
              </span>
              <span className={styles.reviews}>({props.reviews})</span>
            </div>
            <div className={styles.priceTag}>
              <motion.strong 
                animate={isHovered ? { color: "#FFE500", textShadow: "0 0 8px rgba(255, 229, 0, 0.5)" } : {}}
                transition={{ duration: 0.4 }}
              >{props.price}</motion.strong>
              <span className={styles.old}>{props.oldPrice}</span>
              <motion.span 
                className={styles.discount}
                whileHover={{ scale: 1.15, rotate: [-1, 1, -1, 0] }}
                transition={{ duration: 0.4 }}
              >-{props.discount}</motion.span>
            </div>
            
            <motion.div className={styles.addToCartWrapper}
              variants={buttonVariants}
            >
              <motion.button 
                className={styles.cartBtn}
                whileTap={{ scale: 0.92 }}
                whileHover={{
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                  y: -3
                }}
                onClick={(e) => {
                  e.stopPropagation(); // This prevents the card's onClick from firing
                  handleOpenModal();
                }}
              >
                Add to Cart
              </motion.button>
              
              <motion.button 
                className={styles.wishlistBtn}
                whileTap={{ scale: 0.9 }}
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  scale: 1.1
                }}
                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking wishlist
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Render modal outside the card's context */}
      {showAddToCart && (
        <AddToCartModal {...props} id={props.id || ''} onClose={handleCloseModal} />
      )}
    </>
  );
}