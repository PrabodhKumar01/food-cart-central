
import React, { useState, useEffect } from 'react';
import { Order } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock orders for demo purposes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Simulate fetching orders from an API
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        items: [
          {
            id: '1',
            name: 'Sandwich',
            price: 50,
            quantity: 2,
            image: '/sandwich.jpg'
          },
          {
            id: '3',
            name: 'Light Orange Juice',
            price: 60,
            quantity: 1,
            image: '/orange-juice.jpg'
          }
        ],
        totalAmount: 160,
        createdAt: new Date(2023, 4, 15).toISOString(),
        status: 'completed'
      },
      {
        id: '2',
        userId: '1',
        userName: 'John Doe',
        items: [
          {
            id: '2',
            name: 'Coffee',
            price: 30,
            quantity: 1,
            image: '/coffee.jpg'
          },
          {
            id: '4',
            name: 'Tea',
            price: 20,
            quantity: 2,
            image: '/tea.jpg'
          }
        ],
        totalAmount: 70,
        createdAt: new Date(2023, 4, 18).toISOString(),
        status: 'pending'
      },
    ];

    // Filter orders for the current user if they're not an admin
    const filteredOrders = currentUser?.isAdmin 
      ? mockOrders 
      : mockOrders.filter(order => order.userId === currentUser?.id);

    setOrders(filteredOrders);
  }, [currentUser, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">
        {currentUser?.isAdmin ? 'All Orders' : 'My Orders'}
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">No orders found</h2>
          <p className="text-gray-500 mt-2">You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>
                      {format(new Date(order.createdAt), 'PPP')}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Items</h3>
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-10 h-10 object-cover rounded-md"
                            />
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                          </div>
                          <span>₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
