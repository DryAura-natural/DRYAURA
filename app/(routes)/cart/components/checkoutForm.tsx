"use client";

import Button from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Summary = () => {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const router = useRouter();
  const removeAll = useCart((state) => state.removeAll);

  // const totalPrice = items.reduce((total, item) => total + Number(item.price), 0);
  const totalPrice = items.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    return total + price;
  }, 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_RAZORPAY_SCRIPT_SRC}`;
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!isLoaded) {
      toast.error("Loading user authentication state...");
      return;
    }

    if (!user) {
      toast.error("You need to sign in before making a payment.");
      router.push("/sign-in");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/createOrder`);
      const data = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "DRYAURA",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: function (response: any) {
          console.log("Payment successful:", response);
        },
        prefill: {
          name: user.fullName || "Guest User",
          email: user.emailAddresses[0]?.emailAddress || "",
          contact: user.phoneNumbers[0]?.phoneNumber || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error("Razorpay script not loaded");
      }
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Payment initialization failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button
        className="w-full mt-6 flex justify-center space-x-2"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing" : "Pay Now"}
        <span className="hover:scale-125 transition ease-in-out delay-150">
          <ArrowUpRight />
        </span>
      </Button>
    </div>
  );
};

export default Summary; 