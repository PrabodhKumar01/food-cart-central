
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    // Simulate checkout
    toast.success('Order placed successfully!');
    clearCart();
    setIsCartOpen(false);
    navigate('/orders');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-[90vw] sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0
              ? 'Your cart is empty'
              : `You have ${cartItems.length} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto py-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-muted-foreground">No items in cart</p>
              <Button 
                variant="link" 
                onClick={() => setIsCartOpen(false)}
                className="mt-2"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex border-b pb-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium">
                      <h3>{item.name}</h3>
                      <p className="ml-4">₹{item.price}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-2">{item.cartQuantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mt-1">
                      Subtotal: ₹{item.price * item.cartQuantity}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <SheetFooter className="sm:justify-start flex-col items-stretch gap-2 border-t pt-4">
            <div className="flex justify-between text-base font-semibold">
              <p>Total</p>
              <p>₹{cartTotal}</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button className="flex-1" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
