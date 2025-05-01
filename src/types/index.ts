
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
  image: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}
