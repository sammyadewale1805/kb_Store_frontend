import React from 'react';
import styles from '../../styles/Alert.module.css';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

interface SuccessCardProps {
  message: string;
  onClose?: () => void;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({ message, onClose }) => {
  return (
    <motion.div 
      className={styles.cardContainer}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${styles.card} ${styles.successCard}`}>
        <div className={styles.cardHeader}>
          <FiCheckCircle className={styles.successIcon} />
          <h3 className={styles.cardTitle}>Success</h3>
          {onClose && (
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          )}
        </div>
        <div className={styles.cardBody}>
          <p className={styles.cardMessage}>{message}</p>
        </div>
      </div>
    </motion.div>
  );
};
