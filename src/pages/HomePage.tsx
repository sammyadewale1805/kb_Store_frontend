import { useState } from 'react';
import Navbar from '../components/homePage/Navbar';
import Hero from '../components/homePage/HeroBanner';
import ProductList from '../components/homePage/ProductList'
import Footer from '../components/homePage/Footer';
import ProductSlider from '../components/homePage/ProducuctListSlideVersion';


export default function Home() {
  const [showSlider, setShowSlider] = useState(false);
  return (
    <>
      <Navbar />
     {/* Show Hero or ProductSlider based on state */}
     {showSlider ? (
        <ProductSlider />
      ) : (
        <Hero onViewMoreClick={() => setShowSlider(true)} />
      )}
      <ProductList />
      <Footer />
    </>
  );
}
