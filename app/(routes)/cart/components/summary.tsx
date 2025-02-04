"use client";

import { useEffect, useState } from "react";
import BillingForm from "@/components/BillingForm";
import { Buttons } from "@/components/ui/Buttons";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OrderSummary from "./orderSummary";
import DeliveryAddress from "./deliveryAddress";
import useCart from "@/hooks/use-cart";
import CustomerForm from "@/components/BillingForm";


declare global {
  interface Window {
    Razorpay: any;
  }
}
const Summary = () => {
  const [isBillingFormVisible, setIsBillingFormVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const removeAll = useCart((state) => state.removeAll);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const toggleBillingFormVisibility = () => {
    setIsBillingFormVisible((prev) => !prev);
  };

  const items = useCart((state) => state.items);

  const totalPrice = items.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is handled
    return total + price * quantity; // Multiply price by quantity
  }, 0);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
      console.log("Creating order with amount:", totalPrice); // Log the amount
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/createOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Failed to create order:", errorResponse); // Log the error response
        throw new Error("Failed to create order");
      }
  
      const data = await response.json();
      console.log("Order created:", data); // Log the created order
  
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: (totalPrice * 100).toString(), 
        currency: "INR",
        name: "DRYAURA",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response: any) {
          console.log("Payment response:", response); // Log the payment response
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/verifyOrder`, {
            method: "POST",
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const data = await res.json();
          console.log("Verification response:", data); // Log the verification response
          if (data.isOk) {
            router.push("/");
            toast.success("Payment Successful");
            removeAll();
          } else {
            router.push("/cart");
            toast.error("Payment failed");
          }
        },
        prefill: {
          name: user.fullName || "Guest User",
          email: user.emailAddresses[0]?.emailAddress || "",
          contact: user.phoneNumbers[0]?.phoneNumber || "9999999999",
        },
        theme: {
          color: "#846754",
        },
      };
      if (typeof window !== "undefined" && window.Razorpay) {
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
    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 h-full">
      <OrderSummary />
      {/* Delivery Address Section */}

      <DeliveryAddress />
      {/* Billing Information Section */}
      <div className="mt-6 mb-4">
        <h5 className="text-2xl font-semibold text-gray-900 mb-4">
          <button
            className="text-black"
            onClick={toggleBillingFormVisibility} // Toggle visibility on click
          >
            Edit Billing Information
          </button>
        </h5>

        {isBillingFormVisible ? (
          <CustomerForm />
        ) : (
          <div className="text-gray-500">
            <p>
              Your billing information is currently hidden. Click above to edit.
            </p>
          </div>
        )}
      </div>
      {isBillingFormVisible ? (
        <></>
      ) : (
        <Buttons
          className="w-full bg-black hover:to-slate-950 text-white py-2 rounded-md shadow-md transition-all"
          onClick={handlePayment}
        >
          {isProcessing ? "Processing..." : "Proceed to Payment"}
        </Buttons>
      )}
    </div>
  );
};

export default Summary;
