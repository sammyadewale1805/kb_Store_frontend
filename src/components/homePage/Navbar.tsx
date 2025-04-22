import { useState } from 'react';
import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const categories = [
    { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
    { name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Accessories', 'Smart Home'] },
    { name: 'Home & Living', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bath'] },
    { name: 'Beauty', subcategories: ['Skincare', 'Makeup', 'Fragrance', 'Hair Care'] },
    { name: 'Sports', subcategories: ['Activewear', 'Equipment', 'Shoes', 'Outdoor'] }
  ];

  return (
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
          
          <div className={styles.cartContainer}>
            <span className={styles.icon} title="Cart">🛒</span>
            <span className={styles.cartCount}>0</span>
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
          
          <button className={styles.signInBtn}>Sign In</button>
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
  );
}