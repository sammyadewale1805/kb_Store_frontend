// services/productService.ts
export interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    category?: string;
    isNew?: boolean;
    rating?: number;
  }
  
  export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  };
  