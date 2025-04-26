export interface CartItem {
    id: string;
    name: string;
    image: string;
    price: string;
    quantity: number;
    size: string;
    color: string;
  }
  
  export interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    getCartTotal: () => number;
    getCartCount: () => number;
  }
  