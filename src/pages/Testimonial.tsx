import { useState } from 'react';
import styles from '../styles/Testimonial.module.css';
import sampleImg from '../assets/yellow_image.jpg';

const testimonials = [
  {
    quote: "“We move 10x faster than our peers and stay consistent. While they’re bogged down with design debt, we’re releasing new features.”",
    author: "Sophie Hall",
    title: "Founder, Catalog",
    company: "Web Design Agency",
  },
  {
    quote: "“This platform changed how we build products. We went from chaos to clarity, and our users noticed the difference immediately.”",
    author: "Liam Chen",
    title: "Product Manager",
    company: "ScaleSoft",
  },
  {
    quote: "“Honestly, it's like having a secret weapon. The speed, the polish—it's unmatched in our industry.”",
    author: "Aisha Khan",
    title: "CEO",
    company: "LaunchCore",
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const { quote, author, title, company } = testimonials[index];

  return (
    <div
      className={styles.testimonial}
      style={{ backgroundImage: `url(${sampleImg})` }}
    >
      <div className={styles.overlay}>
        <blockquote>{quote}</blockquote>
        <p>
          <strong>{author}</strong><br />
          {title} — {company}
        </p>
        <div className={styles.nav}>
          <button onClick={prev}>←</button>
          <button onClick={next}>→</button>
        </div>
      </div>
    </div>
  );
}
