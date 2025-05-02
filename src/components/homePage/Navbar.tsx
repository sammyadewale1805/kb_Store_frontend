import { useState } from 'react';
import { useCart } from '../AddToCart/CartContext'; // Adjust the import path as necessary
import Cart from '../AddToCart/CartList'; // Import the Cart component
import styles from '../../styles/Navbar.module.css';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate('/signin'); // or whatever your sign-in route is
  };
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  
  // Use the cart context to get cart count
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  
  const categories = [
    { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
    { name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Accessories', 'Smart Home'] },
    { name: 'Home & Living', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bath'] },
    { name: 'Beauty', subcategories: ['Skincare', 'Makeup', 'Fragrance', 'Hair Care'] },
    { name: 'Sports', subcategories: ['Activewear', 'Equipment', 'Shoes', 'Outdoor'] }
  ];
  
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.topBar}>
          <div className={styles.logo}>KB Store</div>
          
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search products..."
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          
          <div className={styles.actions}>
            <span className={styles.icon} title="Messages">💬</span>
            <span className={styles.icon} title="Wishlist">❤️</span>
            
            <div 
              className={styles.cartContainer}
              onClick={() => setShowCart(!showCart)}
            >
              <span className={styles.icon} title="Cart">🛒</span>
              {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
            </div>
            
            <div className={styles.userContainer}>
              <div
                className={styles.avatar}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                👤
              </div>
              
              {showUserMenu && (
                <div className={styles.userDropdown}>
                  <div className={styles.userMenuItem}>My Account</div>
                  <div className={styles.userMenuItem}>Orders</div>
                  <div className={styles.userMenuItem}>Wishlist</div>
                  <div className={styles.userMenuItem}>Settings</div>
                  <div className={styles.userMenuDivider}></div>
                  <div className={styles.userMenuItem}>Sign Out</div>
                </div>
              )}
            </div>
            
            <button className={styles.signInBtn} onClick={handleSignInClick}>
      Sign In
    </button>
          </div>
        </div>
        
        <div className={styles.categoriesBar}>
          <div
            className={styles.categoriesBtn}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <span className={styles.categoriesIcon}>≡</span>
            Categories
            
            {showCategories && (
              <div className={styles.categoriesDropdown}>
                {categories.map((category, index) => (
                  <div key={index} className={styles.categoryItem}>
                    <span>{category.name}</span>
                    <div className={styles.subcategoriesPanel}>
                      {category.subcategories.map((subcat, idx) => (
                        <div key={idx} className={styles.subcategoryItem}>{subcat}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>New Arrivals</a>
            <a href="#" className={styles.navLink}>Best Sellers</a>
            <a href="#" className={styles.navLink}>Deals</a>
            <a href="#" className={styles.navLink}>Brands</a>
            <a href="#" className={styles.navLink}>Collections</a>
          </div>
          
          <div className={styles.promoText}>Free shipping on orders over $50</div>
        </div>
      </nav>
      
      {/* Render the Cart component and pass the state */}
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}