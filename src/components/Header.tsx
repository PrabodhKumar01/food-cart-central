
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Food Cart Central
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/orders">
                <Button variant="ghost">My Orders</Button>
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <div className="bg-brand-blue text-white rounded-full w-8 h-8 flex items-center justify-center">
                  {currentUser?.name.charAt(0).toUpperCase()}
                </div>
                <Button onClick={logout} variant="destructive" size="sm">
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Link to="/login">
              <Button variant="default">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
