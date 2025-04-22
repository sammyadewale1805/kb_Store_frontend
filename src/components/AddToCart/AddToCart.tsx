// Component file
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, X } from 'lucide-react';
import styles from '../../styles/AddToCartCard.module.css';

interface AddToCartModalProps {
  image: string;
  name: string;
  country: string;
  rating: number;
  reviews: number;
  price: string;
  oldPrice: string;
  discount: string;
  onClose: () => void;
}

export default function AddToCartModal({
  image,
  name,
  country,
  rating,
  reviews,
  price,
  oldPrice,
  discount,
  onClose,
}: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Calculate total price based on quantity
  const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  const totalPrice = (numericPrice * quantity).toFixed(2);

  // Generate star rating display
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`${styles.star} ${
              i < fullStars 
                ? styles.starFull 
                : (i === fullStars && hasHalfStar 
                  ? styles.starHalf 
                  : styles.starEmpty)
            }`}
          >
            ★
          </span>
        ))}
        <span className={styles.reviewCount}>{rating} ({reviews})</span>
      </div>
    );
  };

  return (
    <motion.div 
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div 
        className={styles.modal}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image section */}
        <div className={styles.imageContainer}>
          <img 
            src={image} 
            alt={name} 
            className={styles.image} 
          />
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={styles.favoriteBtn}
          >
            <Heart 
              className={`${styles.icon} ${isFavorite ? styles.favoriteActive : ''}`} 
            />
          </button>
        </div>
        
        {/* Content section */}
        <div className={styles.content}>
          <button 
            onClick={onClose} 
            className={styles.closeBtn}
          >
            <X className={styles.closeIcon} />
          </button>
          
          {/* Product details */}
          <div className={styles.productDetails}>
            <div>
              <h2 className={styles.title}>{name}</h2>
              <p className={styles.country}>{country}</p>
            </div>
            
            {renderStars()}
            
            <div className={styles.priceContainer}>
              <span className={styles.price}>{price}</span>
              {oldPrice && (
                <span className={styles.oldPrice}>{oldPrice}</span>
              )}
              {discount && (
                <span className={styles.discount}>
                  -{discount}
                </span>
              )}
            </div>
          </div>
          
          {/* Quantity and add to cart */}
          <div className={styles.actionSection}>
            <div className={styles.quantityRow}>
              <span className={styles.quantityLabel}>Quantity:</span>
              <div className={styles.quantityControls}>
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className={styles.quantityBtn}
                >
                  <Minus className={styles.quantityIcon} />
                </button>
                <span className={styles.quantityValue}>
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className={styles.quantityBtn}
                >
                  <Plus className={styles.quantityIcon} />
                </button>
              </div>
              <div className={styles.totalPrice}>
                <div className={styles.totalLabel}>Total:</div>
                <div className={styles.totalValue}>${totalPrice}</div>
              </div>
            </div>
            
            <motion.button
              className={styles.addBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
