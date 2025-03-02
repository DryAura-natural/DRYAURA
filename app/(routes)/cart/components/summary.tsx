"use client";

import { useEffect, useState } from "react";
import BillingDialog from "@/components/BillingDialog";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OrderSummary from "./orderSummary";
import DeliveryAddress from "./deliveryAddress";
import useCart from "@/hooks/use-cart";
import getCustomerData from "@/actions/getCustomerData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SummaryProps {
  cartItems: any[];
  totalPrice: number;
  isProcessing: boolean;
  handlePayment: () => void;
}

const Summary = () => {
  const [isBillingFormVisible, setIsBillingFormVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const removeAll = useCart((state) => state.removeAll);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const items = useCart((state) => state.items);
  const totalPrice: number = items.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (user?.id) {
      getCustomerData(user.id)
        .then((data) => setUserData(data))
        .catch(console.error);
    }
  }, [user]);

  const handlePayment = async () => {
    if (!isLoaded || !user) {
      toast.error("Please sign in before making a payment.");
      router.push("/sign-in");
      return;
    }
    if (!isRazorpayLoaded) {
      toast.error("Payment gateway is still loading. Please try again.");
      return;
    }
    if (totalPrice <= 0) {
      toast.error("Invalid total price. Please check your cart.");
      return;
    }
    if (!userData) {
      toast.error("Please add billing information before proceeding.");
      return;
    }

    setIsProcessing(true);
    const address = `${userData.streetAddress}, ${userData.city}, ${userData.state}, ${userData.postalCode}`;

    try {
      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/createOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeId: "0d19662d-b031-46bd-86e3-6435bc885e32",
            customerId: user.id,
            totalAmount: totalPrice,
            orderItems: items.map(({ id, quantity }) => ({
              productId: id,
              quantity,
            })),
            phone: userData.phone || "9999999999",
            address,
          }),
        }
      );

      if (!orderResponse.ok) throw new Error("Order creation failed");
      const { razorpayOrderId } = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: (totalPrice * 100).toString(),
        currency: "INR",
        name: "DRYAURA",
        description: address,
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          if (
            !response.razorpay_order_id ||
            !response.razorpay_payment_id ||
            !response.razorpay_signature
          ) {
            toast.error("Payment response is incomplete. Please try again.");
            return;
          }

          const verifyResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/verifyOrder`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verificationData = await verifyResponse.json();
          if (verificationData.isOk) {
            toast.success("Payment Successful");
            removeAll();
            setTimeout(() => router.push("/"), 1000);
          } else {
            toast.error("Payment failed");
            router.push("/cart");
          }
        },
        prefill: {
          name: userData.name || "Guest User",
          email: userData.email || "",
          contact: userData.phone || "9999999999",
          address,
        },
        theme: { color: "#3D1D1D" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      console.error("Payment failed", error);
      toast.error(error.message || "Payment initialization failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-lg bg-gray-50 px-0 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 h-full">
      <OrderSummary />

      {/* Billing Information Section */}
      <div className="mt-6 mb-4">
        <div className="mb-4">
          <h5 className="text-xl font-semibold text-gray-900">
            Billing Information
          </h5>
          <p className="text-sm text-gray-500">
            Please review your billing information before proceeding with the
            payment.
          </p>
        </div>
        <DeliveryAddress />

        {!userData && (
          <>
            <h5 className="text-xl font-semibold text-gray-900">
              ADD BILLING INFORMATION
            </h5>
            <p className="text-sm text-gray-500">
              Please add your billing information to proceed with the payment.
            </p>

            <BillingDialog
              title="Billing Information"
              subtitle="Please enter your billing information to complete the order."
              triggerLabel="Add Billing Information"
              onSuccess={() => setIsBillingFormVisible(false)}
            />
          </>
        )}
        {!isBillingFormVisible && (
          <Button
            className="w-full bg-[#2D1515] py-2 rounded-md shadow-md transition-all hover:bg-[#3D1D1D] text-white mb-4"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Proceed to Payment"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Summary;
