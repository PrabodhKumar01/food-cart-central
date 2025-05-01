
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, FoodItem } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate cart count and total
  const cartCount = cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: FoodItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        toast.success(`Added another ${item.name} to cart`);
        return prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
            : cartItem
        );
      } else {
        toast.success(`Added ${item.name} to cart`);
        return [...prevItems, { ...item, cartQuantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    const itemName = cartItems.find(item => item.id === itemId)?.name;
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    if (itemName) {
      toast.info(`Removed ${itemName} from cart`);
    }
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId && item.cartQuantity > 1
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      ).filter(item => item.cartQuantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared");
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
