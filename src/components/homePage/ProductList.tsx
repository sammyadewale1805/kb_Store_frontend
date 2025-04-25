import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import TiltEffect from './TitleEffect'; // Imported TiltEffect component
import { fetchProducts, Product } from '../../services/ProductImageservice'; 
import styles from '../../styles/ProduuctList.module.css'; 

// Type for our category filter
type CategoryFilter = 'all' | 'Winter Casual' | 'corporate' | 'usa' | 'uk' | 'france' | 'african';

// Type for our sorting options
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

const ProductList = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Store all products
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();
        setAllProducts(products); // Store all products
        setVisibleProducts(products); // Initially show all products
        setIsLoaded(true);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Function to filter products by category - improved version
  const filterByCategory = (category: CategoryFilter) => {
    setIsFiltering(true);
    setActiveCategory(category);

    // Always filter from the original complete product list
    if (category === 'all') {
      setVisibleProducts(allProducts); // Reset to all products from original list
      setTimeout(() => setIsFiltering(false), 300);
      return;
    }

    // Map our category filter values to text that appears in the product category field
    const categoryMap: Record<CategoryFilter, string> = {
      all: '',
      'Winter Casual': 'Winter Casual',
      corporate: 'corporate',
      usa: 'USA',
      uk: 'UK',
      france: 'France',
      african: 'African',
    };

    // Filter from allProducts (the original complete list) instead of visibleProducts
    const filtered = allProducts.filter(
      (product) => product.category?.includes(categoryMap[category]) ?? false
    );

    setVisibleProducts(filtered);
    setTimeout(() => setIsFiltering(false), 300);
  };

  // Function to handle sorting - improved version
  const handleSort = (option: SortOption) => {
    setSortBy(option);
    setIsFiltering(true);

    // Always sort the currently visible products (after any filtering)
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
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); // Handle undefined ratings
        break;
      default:
        // For default sort, reapply the current category filter to get original order
        filterByCategory(activeCategory);
        setIsFiltering(false);
        return;
    }

    setVisibleProducts(sorted);
    setTimeout(() => setIsFiltering(false), 300);
  };

  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // New product badge - memoized
  const getNewProductBadge = (id: string | number) => {
    const isNew = typeof id === 'number' ? id % 5 === 0 : parseInt(String(id)) % 5 === 0;

    if (isNew) {
      return (
        <motion.div
          className={styles.newBadge}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10,
            delay: 0.1,
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
          transition={{ duration: 0.4 }}
        >
          Trending Products
        </motion.h2>

        <motion.div
          className={styles.controls}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.button
            className={styles.filterButton}
            onClick={toggleFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Filter</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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

      {/* Fixed AnimatePresence for filter categories */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className={styles.categories}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => filterByCategory('all')}
              whileHover={activeCategory !== 'all' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              All Products
            </motion.button>
            <motion.button
              className={`${styles.categoryButton} ${
                activeCategory === 'Winter Casual' ? styles.active : ''
              }`}
              onClick={() => filterByCategory('Winter Casual')}
              whileHover={activeCategory !== 'Winter Casual' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Winter Collection
            </motion.button>
            <motion.button
              className={`${styles.categoryButton} ${activeCategory === 'corporate' ? styles.active : ''}`}
              onClick={() => filterByCategory('corporate')}
              whileHover={activeCategory !== 'corporate' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Corporate
            </motion.button>
            <motion.button
              className={`${styles.categoryButton} ${activeCategory === 'african' ? styles.active : ''}`}
              onClick={() => filterByCategory('african')}
              whileHover={activeCategory !== 'african' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              African Fashion
            </motion.button>
            <motion.button
              className={`${styles.categoryButton} ${activeCategory === 'usa' ? styles.active : ''}`}
              onClick={() => filterByCategory('usa')}
              whileHover={activeCategory !== 'usa' ? { scale: 1.05, y: -3 } : {}}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Mixed
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <motion.div
          className={styles.loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3>Loading products...</h3>
        </motion.div>
      ) : error ? (
        <motion.div
          className={styles.error}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3>{error}</h3>
        </motion.div>
      ) : visibleProducts.length > 0 ? (
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
        >
          {/* Fixed AnimatePresence - removed mode="wait" and properly wrapping the animated elements */}
          {!isFiltering && (
            <AnimatePresence>
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id || index}
                  className={styles.gridItem}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        ease: [0.23, 1, 0.32, 1],
                      },
                    },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                  }}
                >
                  <div className={styles.featuredItem}>
                    {getNewProductBadge(product.id || index)}
                    <TiltEffect tiltMaxAngleX={5} tiltMaxAngleY={5} glareOpacity={0.1}>
                      <ProductCard
                        reviews={0}
                        oldPrice={''}
                        discount={''}
                        {...product}
                        id={String(product.id)}
                        country={product.category || 'Unknown'}
                        rating={product.rating ?? 0}
                      />
                    </TiltEffect>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      ) : (
        <motion.div
          className={styles.empty}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            No products found
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Try changing your filter options or check back later for new arrivals.
          </motion.p>
        </motion.div>
      )}
    </section>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(ProductList);