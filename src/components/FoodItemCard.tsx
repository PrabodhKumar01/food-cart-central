
import React from 'react';
import { FoodItem } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

interface FoodItemCardProps {
  item: FoodItem;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <>
      <Card className="w-full overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Price: ₹{item.price}</p>
            <p className="text-sm text-gray-600">
              Quantity: {item.quantity > 0 ? item.quantity : 'Out of stock'}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setShowDetails(true)}
          >
            View details
          </Button>
          <Button
            onClick={() => addToCart(item)}
            disabled={item.quantity <= 0}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <div>
                <h3 className="font-semibold">Price</h3>
                <p>₹{item.price}</p>
              </div>
              <div>
                <h3 className="font-semibold">Availability</h3>
                <p>{item.quantity > 0 ? `${item.quantity} available` : 'Out of stock'}</p>
              </div>
              <div>
                <Button
                  onClick={() => {
                    addToCart(item);
                    setShowDetails(false);
                  }}
                  disabled={item.quantity <= 0}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FoodItemCard;
