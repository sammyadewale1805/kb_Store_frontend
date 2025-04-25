import { useEffect, useState } from 'react';
import styles from '../../styles/HeroBanner.module.css';

interface Slide {
  image: string;
  price: string;
  original: string;
}

export default function Hero() {
  const [casualSlides, setCasualSlides] = useState<Slide[]>([]);
  const [corporateSlides, setCorporateSlides] = useState<Slide[]>([]);
  const [casualIndex, setCasualIndex] = useState(0);
  const [corporateIndex, setCorporateIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/hero-slides');
        const data = await res.json();
        setCasualSlides(data.casual || []);
        setCorporateSlides(data.corporate || []);
      } catch (error) {
        console.error('Failed to load slides:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCasualIndex(prev => (casualSlides.length ? (prev + 1) % casualSlides.length : 0));
      setCorporateIndex(prev => (corporateSlides.length ? (prev + 1) % corporateSlides.length : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [casualSlides, corporateSlides]);

  const casual = casualSlides[casualIndex];
  const corporate = corporateSlides[corporateIndex];

  if (!casual || !corporate) return null;

  return (
    <section className={styles.heroSection}>
      <div
        className={styles.heroCard}
        style={{ backgroundImage: `url(${casual.image})` }}
      >
        <div className={styles.heroOverlay}>
          <h2>Casual Wears</h2>
          <p>Relaxed, stylish, and made for comfort.</p>
          <div className={styles.price}>
            <strong>{casual.price}</strong>
            <span>{casual.original}</span>
          </div>
          <button className={styles.viewMore}>View More</button>
        </div>
      </div>

      <div
        className={styles.heroCard}
        style={{ backgroundImage: `url(${corporate.image})` }}
      >
        <div className={styles.heroOverlay}>
          <h2>Corporate Wears</h2>
          <p>Elegance and power for the modern professional.</p>
          <div className={styles.price}>
            <strong>{corporate.price}</strong>
            <span>{corporate.original}</span>
          </div>
          <button className={styles.viewMore}>View More</button>
        </div>
      </div>
    </section>
  );
}
