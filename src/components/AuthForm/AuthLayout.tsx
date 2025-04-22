import React from 'react';
import Testimonial from '../../pages/Testimonial';
import styles from '../../styles/Auth.module.css';
//import logo from '../../assets/kbcLogo.png'; // ✅ Adjust path as needed

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.authWrapper}>
     {/* <img src={logo} alt="Logo" className={styles.logo} /> ✅ Logo added */}
      <div className={styles.cardContainer}>
        <div className={styles.leftSection}>
          {children}
        </div>
        <div className={styles.rightSection}>
          <Testimonial />
        </div>
      </div>
    </div>
  );
}
