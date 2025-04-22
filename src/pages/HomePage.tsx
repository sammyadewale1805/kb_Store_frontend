import Navbar from '../components/homePage/Navbar';
import Hero from '../components/homePage/HeroBanner';
import ProductList from '../components/homePage/ProductList'
import Footer from '../components/homePage/Footer';
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductList />
      <Footer />
    </>
  );
}
