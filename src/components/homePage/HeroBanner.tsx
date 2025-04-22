import { useEffect, useState } from 'react';
import styles from '../../styles/HeroBanner.module.css';

import casual1 from '../../../public/images/product1.jpg';
import casual2 from '../../../public/images/product2.jpg';
import corporate1 from '../../../public/images/coporate.jpg';
import corporate2 from '../../../public/images/coporate4.jpg';

const casualSlides = [
  { image: casual1, price: '$82.61', original: '$153.92' },
  { image: casual2, price: '$70.00', original: '$130.00' },
];

const corporateSlides = [
  { image: corporate1, price: '$129.00', original: '$220.00' },
  { image: corporate2, price: '$115.99', original: '$210.00' },

];

export default function Hero() {
  const [casualIndex, setCasualIndex] = useState(0);
  const [corporateIndex, setCorporateIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCasualIndex((prev) => (prev + 1) % casualSlides.length);
      setCorporateIndex((prev) => (prev + 1) % corporateSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const casual = casualSlides[casualIndex];
  const corporate = corporateSlides[corporateIndex];

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
