import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Search, Truck, Package, CheckCircle, AlertCircle, X } from 'lucide-react';

interface DeliveryStatus {
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
  currentLocation?: string;
  estimatedDelivery?: string;
}

export default function TrackOrderDialog() {
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/track-order?orderNumber=${orderNumber}`);
      
      if (!response.ok) {
        throw new Error('Order not found');
      }

      const data: DeliveryStatus = await response.json();
      setDeliveryStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setDeliveryStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const renderStatusIcon = () => {
    switch (deliveryStatus?.status) {
      case 'PENDING':
        return <Package className="h-8 w-8 text-yellow-500" />;
      case 'IN_TRANSIT':
        return <Truck className="h-8 w-8 text-blue-500" />;
      case 'DELIVERED':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'FAILED':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };

  const resetForm = () => {
    setOrderNumber('');
    setDeliveryStatus(null);
    setError(null);
  };

  return (
    <div   >
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Search className="mr-2 h-4 w-4" /> Track Your Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-lg border border-yellow-400 p-5">
        <DialogHeader >
          <DialogTitle className="flex items-center justify-between">
            <span>Track Your Order</span>
    
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
                Enter Order Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="orderNumber"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 px-2"
                  placeholder="Enter your order number"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-black hover:bg-black/80 focus:outline-none disabled:opacity-50"
                >
                  {loading ? 'Tracking...' : 'Track'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
                {error}
              </div>
            )}

            {deliveryStatus && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  {renderStatusIcon()}
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {deliveryStatus.status.replace('_', ' ')}
                    </h3>
                  </div>
                </div>

                {deliveryStatus.currentLocation && (
                  <div className="text-sm text-gray-600">
                    <strong>Current Location:</strong> {deliveryStatus.currentLocation}
                  </div>
                )}

                {deliveryStatus.estimatedDelivery && (
                  <div className="text-sm text-gray-600">
                    <strong>Estimated Delivery:</strong> {deliveryStatus.estimatedDelivery}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="mt-4 flex justify-between">
          <Button 
            variant="outline" 
            onClick={resetForm}
            disabled={!orderNumber && !deliveryStatus}
          >
            Reset
          </Button>
          {deliveryStatus && (
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