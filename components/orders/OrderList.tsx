import { useState } from 'react';
import OrderDetailsDialog from './OrderDetailsDialog';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Temporary dummy data
  const orders: Order[] = [
    {
      id: '12345',
      date: '2025-02-20',
      status: 'Delivered',
      total: 149.99,
      items: [
        { name: 'Product A', quantity: 2, price: 49.99 },
        { name: 'Product B', quantity: 1, price: 50.00 }
      ]
    },
    // Add more orders here
  ];

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border-b pb-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Order #{order.id}</h3>
            <span className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
              {order.status}
            </span>
          </div>
          <p className="text-gray-600 mb-2">Placed on {order.date}</p>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
              onClick={() => handleViewDetails(order)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              View Details
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Invoice
            </button>
          </div>
        </div>
      ))}

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
