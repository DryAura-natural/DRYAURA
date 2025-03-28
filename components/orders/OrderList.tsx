import React, { useState } from "react";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { Order } from "@/types";
import getOrdersByUserId from "@/actions/get-order";
import { formatCurrency } from "@/lib/utils";
import { Package, Eye } from "lucide-react";
import { Download } from "lucide-react";
import { Copy, CheckCheck } from 'lucide-react';
export default function OrderList({
  userId,
  initialOrders = [],
}: {
  userId: string;
  initialOrders?: Order[];
}) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

const handleCopyOrderId = (orderId: string) => {
  navigator.clipboard.writeText(orderId).then(() => {
    setCopiedOrderId(orderId);
    setTimeout(() => setCopiedOrderId(null), 2000); // Reset after 2 seconds
  });
};

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Fetch more orders if needed
  const loadMoreOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedOrders = await getOrdersByUserId(userId, {
        limit: 10,
        offset: orders.length,
        status: null, // Remove fixed status to fetch all orders
      });

      if (fetchedOrders.length === 0) {
        // No more orders to load
        return;
      }

      setOrders((prevOrders) => [...prevOrders, ...fetchedOrders]);
    } catch (err: any) {
      console.error("Failed to load more orders:", err);
      setError(err.message || "Failed to load more orders");
    } finally {
      setLoading(false);
    }
  };

  // If no initial orders, show a message
  if (initialOrders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <p className="text-lg font-semibold">No orders found</p>
        <p className="text-sm text-gray-400">
          You haven't placed any orders yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white shadow-sm rounded-lg ">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border-b last:border-b-0 px-4 py-4 hover:bg-gray-50 transition-colors duration-200 hover:shadow-xl"
        >
          <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
  <h3 className="text-lg font-semibold text-gray-800">
    Order #{order.id.slice(-6)}
  </h3>
  <button 
    onClick={() => handleCopyOrderId(order.id)}
    className="text-gray-500 hover:text-black transition-colors"
    title="Copy Order ID"
  >
    {copiedOrderId === order.id ? (
      <CheckCheck className="h-4 w-4 text-green-500" />
    ) : (
      <Copy className="h-4 w-4" />
    )}
  </button>
</div>
            <span
              className={`text-xs font-medium uppercase tracking-wide rounded-full px-3 py-1 ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.orderStatus === "Processing"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
            <div>
              <p className="font-medium">Total Amount</p>
              <p>{formatCurrency(order.totalAmount)}</p>
            </div>
            <div>
              <p className="font-medium">Placed On</p>
              <p>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* // In the order item rendering section, modify the button section */}
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              onClick={() => handleViewDetails(order)}
            >
              <Eye className="h-5 w-5" />
              View Details
            </button>

       
            {order.invoiceLink ? (
              <a
                href={`${order.invoiceLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
              >
                <Download className="h-5 w-5" />
                Download Invoice
              </a>
            ) : (
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed opacity-50"
              >
                <Download className="h-5 w-5" />
                Invoice Unavailable
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      {/* Load More Orders */}
      {/* {loading ? (
        <div className="flex justify-center items-center py-6 space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-black border-r-2 "></div>
          <span className="text-gray-600 text-sm">Loading more orders...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-3 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-red-600 font-semibold mb-2">
            Failed to Load Orders
          </p>
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button
            onClick={loadMoreOrders}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center justify-center mx-auto space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Retry</span>
          </button>
        </div>
      ) : (
        orders.length > 0 && (
          <div className="flex justify-center py-4">
            <button
              onClick={loadMoreOrders}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Load More Orders</span>
            </button>
          </div>
        )
      )} */}
    </div>
  );
}
