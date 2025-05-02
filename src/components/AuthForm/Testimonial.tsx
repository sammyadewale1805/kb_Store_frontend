
import styles from '../../styles/Auth.module.css';
import { motion } from 'framer-motion';

export default function Testimonial() {
  return (
    <motion.div 
      className={styles.testimonialContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4 24H6C6 15.716 12.716 9 21 9V14.4C15.708 14.4 11.4 18.708 11.4 24V24H14.4V36H6V24H14.4ZM36 24H27.6C27.6 15.716 34.316 9 42.6 9V14.4C37.308 14.4 33 18.708 33 24V24H36V36H27.6V24H36Z" fill="currentColor"/>
          </svg>
        </div>
        
        <p className={styles.testimonialText}>
          This platform has completely transformed how we manage our projects. The interface is intuitive and the features are exactly what we needed.
        </p>
        
        <div className={styles.testimonialAuthor}>
          <div className={styles.authorAvatar}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" />
          </div>
          <div className={styles.authorInfo}>
            <h4>Sarah Johnson</h4>
            <p>Product Manager at TechCorp</p>
          </div>
        </div>
        
        <div className={styles.testimonialDots}>
          <span className={`${styles.dot} ${styles.active}`}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
      
      <div className={styles.backgroundGradient}></div>
    </motion.div>
  );
}