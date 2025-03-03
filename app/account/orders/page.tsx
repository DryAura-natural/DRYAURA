"use client";
import LatestOrder from "@/components/orders/LatestOrder";
import OrderList from "@/components/orders/OrderList";
import TrackOrder from "@/components/orders/TrackOrder";
import FeedbackSection from "@/components/orders/FeedbackSection";
import { useState, useEffect } from "react";

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

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Temporary dummy data
        const dummyLatestOrder: Order = {
          id: "12345",
          date: "2025-02-20",
          status: "Delivered",
          total: 149.99,
          items: [
            { name: "Product A", quantity: 2, price: 49.99 },
            { name: "Product B", quantity: 1, price: 50.0 },
          ],
        };

        const dummyAllOrders: Order[] = [
          {
            id: "12344",
            date: "2025-02-18",
            status: "Processing",
            total: 99.99,
          },
          {
            id: "12343",
            date: "2025-02-15",
            status: "Shipped",
            total: 199.99,
          },
          dummyLatestOrder,
        ];

        setLatestOrder(dummyLatestOrder);
        setAllOrders(dummyAllOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-[#3D1D1D]">
        Your Orders
      </h1>

      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md border border-[#3D1D1D]/10">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-[#3D1D1D]">
          Track Order
        </h2>
        <TrackOrder />
      </section>
      <div className="grid gap-4 sm:gap-8">
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md border border-[#3D1D1D]/10">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-[#3D1D1D]">
            Latest Order
          </h2>
          <LatestOrder />
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md border border-[#3D1D1D]/10">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-[#3D1D1D]">
            All Orders
          </h2>
          <OrderList />
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md border border-[#3D1D1D]/10">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-[#3D1D1D]">
            Your Feedback
          </h2>
          <FeedbackSection />
        </section>
      </div>
    </div>
    
  );
}
