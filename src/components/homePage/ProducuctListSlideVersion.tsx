import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProducts, Product } from '../../services/ProductImageservice';
import '../../styles/ProductSlideVersion.css';

// Type definitions
type CategoryFilter = 'all' | 'Winter Casual' | 'corporate' | 'usa' | 'uk' | 'france' | 'african';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

// ProductCard component (simplified version)
const ProductCard = ({ name, price, image, rating }: {
  name: string;
  price: string;
  image: string;
  rating: number;
}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">{price}</div>
        <div className="product-rating">
          {Array(5).fill(0).map((_, i) => (
            <span key={i} className={i < Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
          ))}
        </div>
      </div>
      <div className="product-actions">
        <button className="product-button">View</button>
        <button className="product-button">Add to Cart</button>
      </div>
    </div>
  );
};

const SimplifiedProductSlider = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Setup responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 900) {
        setSlidesToShow(2);
      } else if (width < 1280) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();
        setAllProducts(products);
        setVisibleProducts(products);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products by category
  const filterByCategory = (category: CategoryFilter) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setVisibleProducts(allProducts);
    } else {
      const categoryMap: Record<CategoryFilter, string> = {
        all: '',
        'Winter Casual': 'Winter Casual',
        corporate: 'corporate',
        usa: 'USA',
        uk: 'UK',
        france: 'France',
        african: 'African',
      };
      
      const filtered = allProducts.filter(
        (product) => product.category?.includes(categoryMap[category]) ?? false
      );
      
      setVisibleProducts(filtered);
    }
    
    // Reset to first slide
    setCurrentSlide(0);
  };

  // Handle sorting
  const handleSort = (option: SortOption) => {
    setSortBy(option);
    
    // Apply sorting
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
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        // Do nothing for default sorting
        break;
    }
    
    setVisibleProducts(sorted);
    setCurrentSlide(0);
  };

  // Toggle filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Slider navigation
  const nextSlide = () => {
    const maxSlide = Math.max(0, visibleProducts.length - slidesToShow);
    setCurrentSlide(prev => Math.min(prev + slidesToShow, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - slidesToShow));
  };

  // Pagination info
  const totalPages = Math.ceil(visibleProducts.length / slidesToShow);
  const currentPage = Math.floor(currentSlide / slidesToShow) + 1;

  return (
    <section className="product-slider">
      <div className="slider-header">
        <div className="slider-title-container">
          <h2 className="slider-title">Trending Products</h2>
          <div className="slider-subtitle">Discover our latest collection</div>
        </div>

        <div className="slider-controls">
          <button
            className="slider-filter-button"
            onClick={toggleFilters}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>

          <select
            className="slider-sort-select"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value as SortOption)}
          >
            <option value="default">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Filter categories */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="slider-categories"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="categories-container">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'Winter Casual', label: 'Winter Collection' },
                { id: 'corporate', label: 'Corporate' },
                { id: 'african', label: 'African Fashion' },
                { id: 'usa', label: 'Mixed' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  className={`category-button ${
                    activeCategory === cat.id ? 'active' : ''
                  }`}
                  onClick={() => filterByCategory(cat.id as CategoryFilter)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      {isLoading ? (
        <div className="slider-loading">
          <div className="loading-spinner"></div>
          <h3>Loading products...</h3>
        </div>
      ) : error ? (
        <div className="slider-error">
          <div className="error-icon">!</div>
          <h3>{error}</h3>
        </div>
      ) : visibleProducts.length > 0 ? (
        <div className="slider-container" ref={sliderRef}>
          {/* Navigation Arrows */}
          <button 
            className="slider-arrow slider-arrow-left"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          {/* Slider Track */}
          <div 
            className="slider-track"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
              transition: 'transform 0.4s ease-in-out',
            }}
          >
            {visibleProducts.map((product, index) => (
              <div
                key={product.id || index}
                className="slider-item"
                style={{ 
                  flex: `0 0 ${100 / slidesToShow}%` 
                }}
              >
                <ProductCard
                  name={product.name}
                  price={product.price}
                  image={product.image || '/placeholder.jpg'}
                  rating={product.rating ?? 0}
                />
              </div>
            ))}
          </div>
          
          {/* Right Arrow */}
          <button 
            className="slider-arrow slider-arrow-right"
            onClick={nextSlide}
            disabled={currentSlide >= visibleProducts.length - slidesToShow}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="slider-empty">
          <div className="empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M2 10h20"></path>
            </svg>
          </div>
          
          <h3>No products found</h3>
          <p>Try changing your filter options or check back later for new arrivals.</p>
          
          <button
            className="empty-button"
            onClick={() => filterByCategory('all')}
          >
            Show All Products
          </button>
        </div>
      )}
      
      {/* Pagination */}
      {visibleProducts.length > 0 && !isLoading && (
        <div className="slider-pagination">
          <div className="page-info">
            <span className="current-page">{currentPage}</span>
            <span className="total-pages">/ {totalPages}</span>
          </div>
          
          <div className="pagination-dots">
            {Array.from({ length: totalPages }).map((_, index) => {
              const isActive = Math.floor(currentSlide / slidesToShow) === index;
              
              return (
                <button
                  key={index}
                  className={`pagination-dot ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index * slidesToShow)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
          
          <div className="navigation-buttons">
            <button
              className="nav-button"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button
              className="nav-button"
              onClick={nextSlide}
              disabled={currentSlide >= visibleProducts.length - slidesToShow}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SimplifiedProductSlider;