
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartItem extends FoodItem {
  cartQuantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}
