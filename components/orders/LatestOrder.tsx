import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { Order } from "@/types";
import { Truck, Copy, CheckCheck, ShoppingBasket } from "lucide-react";
import toast from "react-hot-toast";

interface LatestOrderProps {
  latestOrder: Order | null;
}

export default function LatestOrder({ latestOrder }: LatestOrderProps) {
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [copiedTrackingId, setCopiedTrackingId] = useState<string | null>(null);

  const handleCopyTrackingId = (trackingId: string) => {
    navigator.clipboard.writeText(trackingId).then(() => {
      setCopiedTrackingId(trackingId);
      setTimeout(() => setCopiedTrackingId(null), 2000); // Reset after 2 seconds
    });
  };

  const openOrderDetails = () => {
    if (latestOrder) {
      setIsDetailsDialogOpen(true);
    }
  };
  // Calculate estimated delivery time
  useEffect(() => {
    if (
      latestOrder &&
      latestOrder.orderStatus !== "DELIVERED" &&
      latestOrder.createdAt
    ) {
      const calculateTimeRemaining = () => {
        const orderDate = new Date(latestOrder.createdAt);
        const now = new Date();

        // Estimated delivery time (e.g., 5 days from order date)
        const estimatedDeliveryDate = new Date(orderDate);
        estimatedDeliveryDate.setDate(orderDate.getDate() + 5);

        const diff = estimatedDeliveryDate.getTime() - now.getTime();

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeRemaining(null);
        }
      };

      // Initial calculation
      calculateTimeRemaining();

      // Update every minute
      const timer = setInterval(calculateTimeRemaining, 60000);

      // Cleanup
      return () => clearInterval(timer);
    } else {
      setTimeRemaining(null);
    }
  }, [latestOrder]);

  // Open order details dialog


  // If no latest order, return null or a placeholder
  if (!latestOrder) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No recent orders found</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-black rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-center pb-4 border-b-2 border-black">
        <div className="flex items-center space-x-3">
          {/* <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
          <ShoppingBasket />
            
          </div> */}
          <h3 className="text-lg font-black text-gray-900 tracking-tight">
            Latest Order Details
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
            latestOrder.orderStatus === "DELIVERED"
              ? "bg-black text-white"
              : latestOrder.orderStatus === "PROCESSING"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {latestOrder.orderStatus}
        </span>
      </div> 
      <div className="flex items-center space-x-2">
  <h4 className="text-sm font-bold text-gray-500 mb-3">Order ID: {latestOrder.id}</h4>
  <button 
    onClick={() => {
      navigator.clipboard.writeText(latestOrder.id)
        .then(() => {
          toast.success('Order ID copied to clipboard');
        })
        .catch((err) => {
          toast.error('Failed to copy Order ID');
          console.error('Copy failed', err);
        });
    }}
    className="text-gray-500 hover:text-gray-700 focus:outline-none"
    aria-label="Copy Order ID"
  >
    <Copy className="w-4 h-4" />
  </button>
</div>
     

      {/* Order Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-gray-500 mb-1">Total Amount</p>
            <p className="text-lg font-black text-black">
              {formatCurrency(latestOrder.totalAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 mb-1">Placed On</p>
            <p className="text-sm font-bold text-gray-900">
              {new Date(latestOrder.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-500 mb-1">
            Delivery Address
          </p>
          <p className="text-sm font-medium text-gray-800">
            {latestOrder.address || "Address not provided"}
          </p>
        </div>

        {/* Payment and Tracking Status */}
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                latestOrder.isPaid || latestOrder.paymentStatus === "COMPLETED"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            <p className="text-sm font-bold text-gray-900">
              Payment:{" "}
              {latestOrder.isPaid || latestOrder.paymentStatus === "COMPLETED"
                ? "Paid"
                : "Pending"}
            </p>
          </div>
        </div>
        {latestOrder.trackingId && latestOrder.orderStatus !== "DELIVERED" && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Truck className="h-4 w-4 text-gray-500" />
            <span>Tracking ID: {latestOrder.trackingId}</span>
            <button
              onClick={() => handleCopyTrackingId(latestOrder.trackingId!)}
              className="text-gray-500 hover:text-black transition-colors"
              title="Copy Tracking ID"
            >
              {copiedTrackingId === latestOrder.trackingId ? (
                <CheckCheck className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Order Items */}
      {/* Order Items */}
      {/* <div>
        <h4 className="text-sm font-bold text-gray-500 mb-3">Order Items</h4>
        <div className="space-y-2">
          {latestOrder.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg"
            >
              {item.productImageUrl && (
                <Image
                  src={item.productImageUrl}
                  alt={item.productName || "Product Image"}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              )}
              <div className="flex-grow">
                <p className="text-sm font-bold text-gray-900">
                  {item.productName || item.product?.name || "Unknown Product"}
                </p>
                <p className="text-xs text-gray-600">
                  Variant: {item.variant?.size?.name || "Unknown Size"} | Qty:{" "}
                  {item.quantity} | {formatCurrency(item.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Action Button */}
      <div>
      <button
        onClick={openOrderDetails}
        className="w-full bg-black text-sm text-white py-3 rounded-lg font-bold tracking-wider hover:bg-gray-800 transition-colors"
      >
        View Complete Order Details
      </button>
    </div>

    {/* Add OrderDetailsDialog at the end of the component */}
    <OrderDetailsDialog 
      order={latestOrder} 
      isOpen={isDetailsDialogOpen} 
      onClose={() => setIsDetailsDialogOpen(false)} 
    />
    </div>
  );
}
