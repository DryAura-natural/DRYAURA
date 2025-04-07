"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import getOrders from "@/actions/get-order";
import Image from "next/image";
import LatestOrder from "@/components/orders/LatestOrder";
import OrderDetailsModal from "@/components/orders/OrderDetailsDialog";
import OrderList from "@/components/orders/OrderList";
import { useRouter } from "next/navigation";
import TrackOrder from "@/components/orders/TrackOrder";

export default function OrdersPage() {
  // Authentication context
  const { userId } = useAuth();
  const router = useRouter();

  // State management
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Selected order for modal
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Fetch orders function
  const fetchOrders = async (page: number) => {
    if (!userId || !hasMore) return;

    try {
      setIsLoading(true);
      const { orders: fetchedOrders, pagination } = await getOrders({
        customerId: userId,
        storeId: process.env.NEXT_PUBLIC_STORE_ID,
        page,
        pageSize: 50, // Consistent page size
      });

      // Log the fetched orders
      console.log(`Fetched Orders - Page ${page}:`, fetchedOrders);

      // Append new orders or set initial orders
      setOrders((prevOrders) =>
        page === 1 ? fetchedOrders : [...prevOrders, ...fetchedOrders]
      );

      // Update pagination info
      setCurrentPage(page);
      setTotalPages(pagination.totalPages);
      setHasMore(page < pagination.totalPages);

      setIsLoading(false);
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      setError(err.message || "Failed to load orders");
      setIsLoading(false);
    }
  };

  // Initial and subsequent order fetching
  useEffect(() => {
    if (userId) {
      fetchOrders(1);
    }
  }, [userId]);

  // Load more orders
  const loadMoreOrders = () => {
    if (hasMore) {
      fetchOrders(currentPage + 1);
    }
  };

  // Function to open order details modal
  const handleOrderDetails = (order: any) => {
    setSelectedOrder(order);
  };

  // Function to close order details modal
  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  // Render loading state
  if (isLoading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render no orders state
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md border border-[#3D1D1D]/10">
          <h2 className="text-2xl font-bold">No Orders Found</h2>
          <p className="text-gray-600 mt-2">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // Sort orders by most recent first
  const sortedOrders = orders.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  // Get the latest order (first in the sorted array)
  const latestOrder = sortedOrders.length > 0 ? sortedOrders[0] : null;

  return (
    <>
      {/* <TrackOrder /> */}
      <div className="container mx-auto px-4 xl:px-14 py-8 space-y-6  ">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Latest Order</h3>
          <LatestOrder latestOrder={latestOrder} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-[#3D1D1D]">
          Your Orders
        </h1>

        <OrderList initialOrders={orders} userId={userId ?? ''} />
      </div>
    </>
  );
}
