import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import TiltEffect from './TitleEffect'; // Import the TiltEffect component
import styles from '../../styles/ProduuctList.module.css';
import products from '../../data/products';

// Type for our category filter
type CategoryFilter = 'all' | 'Winter Casual' | 'corporate' | 'usa' | 'uk' | 'france' | 'african';

// Type for our sorting options
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

export default function ProductList() {
  // State management
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Function to filter products by category
  const filterByCategory = (category: CategoryFilter) => {
    // Your existing filterByCategory code...
    setIsFiltering(true);
    setActiveCategory(category);
    
    if (category === 'all') {
      setVisibleProducts(products);
      setTimeout(() => setIsFiltering(false), 500);
      return;
    }
    
    // Map our category filter values to text that appears in the product category field
    const categoryMap: Record<CategoryFilter, string> = {
      'all': '',
      'Winter Casual': 'Winter Casual',
      'corporate': 'corporate',
      'usa': 'USA',
      'uk': 'UK',
      'france': 'France',
      'african': 'African',
    };
    
    const filtered = products.filter(product => 
      product.category?.includes(categoryMap[category]) ?? false
    );
    
    setVisibleProducts(filtered);
    setTimeout(() => setIsFiltering(false), 500);
  };

  // Function to handle sorting
  const handleSort = (option: SortOption) => {
    // Your existing handleSort code...
    setSortBy(option);
    setIsFiltering(true);
    
    let sorted = [...visibleProducts];
    
    switch (option) {
      case 'price-asc':
        sorted.sort((a, b) => 
          parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
        );
        break;
      case 'price-desc':
        sorted.sort((a, b) => 
          parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
        );
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Return to original order - assuming the original products array is in default order
        sorted = activeCategory === 'all' 
          ? [...products]
          : products.filter(product => 
              product.category?.includes(activeCategory) ?? false
            );
    }
    
    setVisibleProducts(sorted);
    setTimeout(() => setIsFiltering(false), 500);
  };

  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Add animation on component mount
  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // New product animation with scale effect
  const getNewProductBadge = (id: string | number) => {
    // This would typically be determined by date or some "new" flag in the product data
    // For demo purposes, we're using the product ID to randomly assign some products as "new"
    const isNew = typeof id === 'number' ? id % 5 === 0 : parseInt(id) % 5 === 0;
    
    if (isNew) {
      return (
        <motion.div 
          className={styles.newBadge}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 10,
            delay: 0.2 
          }}
        >
          NEW
        </motion.div>
      );
    }
    
    return null;
  };

  return (
    <section className={styles.list}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Trending Products
        </motion.h2>
        
        <motion.div 
          className={styles.controls}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button 
            className={styles.filterButton} 
            onClick={toggleFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Filter</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </motion.button>
          
          <motion.select 
            className={styles.sortButton}
            value={sortBy}
            onChange={(e) => handleSort(e.target.value as SortOption)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </motion.select>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className={styles.categories}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button 
              className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => filterByCategory('all')}
              whileHover={activeCategory !== 'all' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              All Products
            </motion.button>
            <motion.button 
              className={`${styles.categoryButton} ${activeCategory === 'Winter Casual' ? styles.active : ''}`}
              onClick={() => filterByCategory('Winter Casual')}
              whileHover={activeCategory !== 'Winter Casual' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Winter Collection
            </motion.button>
            <motion.button 
              className={`${styles.categoryButton} ${activeCategory === 'corporate' ? styles.active : ''}`}
              onClick={() => filterByCategory('corporate')}
              whileHover={activeCategory !== 'corporate' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Corporate
            </motion.button>
            <motion.button 
              className={`${styles.categoryButton} ${activeCategory === 'african' ? styles.active : ''}`}
              onClick={() => filterByCategory('african')}
              whileHover={activeCategory !== 'african' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              African Fashion
            </motion.button>
            <motion.button 
              className={`${styles.categoryButton} ${activeCategory === 'usa' ? styles.active : ''}`}
              onClick={() => filterByCategory('usa')}
              whileHover={activeCategory !== 'usa' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Mixed
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {visibleProducts.length > 0 ? (
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {!isFiltering && visibleProducts.map((product, index) => (
              <motion.div 
                key={product.id || index} 
                className={styles.gridItem}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.6,
                      ease: [0.23, 1, 0.32, 1] // Cubic bezier for a more elegant motion
                    } 
                  }
                }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                }}
              >
                <div className={styles.featuredItem}>
                  {getNewProductBadge(product.id || index)}
                  {/* Wrap ProductCard with TiltEffect */}
                  <TiltEffect 
                    tiltMaxAngleX={5} 
                    tiltMaxAngleY={5} 
                    glareOpacity={0.1}
                  >
                    <ProductCard 
                      {...product} 
                      id={String(product.id)} 
                      country={product.category || 'Unknown'} 
                    />
                  </TiltEffect>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          className={styles.empty}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            No products found
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Try changing your filter options or check back later for new arrivals.
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}