
import React, { useState } from 'react';
import { foodItems } from '@/data/foodItems';
import FoodItemCard from '@/components/FoodItemCard';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Input } from '@/components/ui/input';

const Home = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter food items based on search query
  const filteredItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Today's items</h1>
        
        <div className="w-full md:w-1/3">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      {cartCount > 0 && (
        <div className="mb-6">
          <Button 
            variant="default"
            className="bg-brand-blue hover:bg-blue-700"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Cart ({cartCount})
          </Button>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">No items found</h2>
          <p className="text-gray-500 mt-2">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
