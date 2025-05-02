// services/productService.ts
export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
  isNew?: boolean;
  rating?: number;
  description?: string; // Added for HeroBanner component
  original?: string;    // Added for HeroBanner component
}
   
/**
 * Fetches products from the API
 * @param category Optional parameter to filter products by category
 * @returns Promise with array of products
 */
export const fetchProducts = async (category?: string): Promise<Product[]> => {
  const endpoint = category 
    ? `http://localhost:3000/api/products?category=${category}` 
    : 'http://localhost:3000/api/products';
    
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};