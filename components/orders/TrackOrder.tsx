import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

interface OrderTrackingInfo {
  orderId: string;
  status: 'Processing' | 'Shipped' | 'In Transit' | 'Delivered' | 'Cancelled';
  currentLocation?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export default function TrackOrderDialog() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<OrderTrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTrackOrder = async () => {
    if (!orderNumber) {
      setError('Please enter an order number');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint for tracking orders
      const response = await fetch(`/api/orders/track/${orderNumber}`);
      
      if (!response.ok) {
        throw new Error('Order not found');
      }

      const data: OrderTrackingInfo = await response.json();
      setTrackingInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while tracking the order');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setOrderNumber('');
    setTrackingInfo(null);
    setError(null);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Search className="mr-2 h-4 w-4" /> Track Your Order
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md rounded-lg border border-yellow-400 p-5">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Track Your Order</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input 
              label="Enter Order Number" 
              placeholder="Enter Order Number" 
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            
            <Button 
              onClick={handleTrackOrder} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Tracking...' : 'Track Order'}
            </Button>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            {trackingInfo && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Order Tracking Details</h3>
                <p>Order ID: {trackingInfo.orderId}</p>
                <p>Status: {trackingInfo.status}</p>
                {trackingInfo.currentLocation && (
                  <p>Current Location: {trackingInfo.currentLocation}</p>
                )}
                {trackingInfo.estimatedDelivery && (
                  <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
                )}
                {trackingInfo.trackingNumber && (
                  <p>Tracking Number: {trackingInfo.trackingNumber}</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between">
            <Button 
              variant="outline" 
              onClick={resetForm}
              disabled={!orderNumber && !trackingInfo}
            >
              Reset
            </Button>
            {trackingInfo && (
              <Button onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}