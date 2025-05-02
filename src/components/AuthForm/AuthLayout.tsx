import React from 'react';
import Testimonial from './Testimonial';
import styles from '../../styles/Auth.module.css';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.authWrapper}>
      <motion.div 
        className={styles.logo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30C14.477 30 10 25.523 10 20C10 14.477 14.477 10 20 10Z" fill="currentColor"/>
        </svg>
        <span>BrandName</span>
      </motion.div>
      
      <motion.div 
        className={styles.cardContainer}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.leftSection}>
          {children}
        </div>
        <div className={styles.rightSection}>
          <Testimonial />
        </div>
      </motion.div>
      
      <div className={styles.footer}>
        <p>© 2025 BrandName. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  );
}