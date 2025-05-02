import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/HomePage';
import { CartProvider } from './components/AddToCart/CartContext';
import Checkout from './components/AddToCart/CheckOut';

export default function App() {
  return (
    <CartProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/CheckOut" element={<Checkout />} />
    </Routes>
    </CartProvider>
  );
}
