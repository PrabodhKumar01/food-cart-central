
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional because we don't want to include it in all user objects
  isAdmin: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  cartQuantity?: number; // Add this for backward compatibility
  image: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description?: string; // Made optional since it wasn't used in existing data
  price: number;
  image: string;
  category?: string; // Made optional since it wasn't used in existing data
  quantity: number; // Added this to match the existing data
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  total?: number; // For backward compatibility
  date?: string; // For backward compatibility
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}
