"use client";

import { useEffect, useMemo, useState } from "react";
import BillingDialog from "@/components/BillingDialog";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OrderSummary from "./orderSummary";
import DeliveryAddress from "./deliveryAddress";
import useCart from "@/hooks/use-cart";
import getCustomerData from "@/actions/getCustomerData";
import { Edit,CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

import type {
  RazorpayCheckoutResponse,
  RazorpayOptions,
  RazorpayInstance,
} from "@/utils/razorpay.d.ts";
import OrderConfirmationModal from "./orderConformation";

// SDK Loading Utility
const loadRazorpaySdk = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("Razorpay SDK loaded successfully");
      resolve();
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      reject(new Error("Razorpay SDK load failed"));
    };

    document.head.appendChild(script);
  });
};

// Payment Initialization Utility
const initializeRazorpay = async (
  options: RazorpayOptions
): Promise<RazorpayInstance> => {
  // Ensure SDK is loaded
  await loadRazorpaySdk();

  // Validate Razorpay availability
  if (!window.Razorpay) {
    throw new Error("Razorpay SDK not available");
  }

  // Create and validate Razorpay instance
  const razorpay = new window.Razorpay(options);

  if (!razorpay || typeof razorpay.open !== "function") {
    throw new Error("Invalid Razorpay instance");
  }

  return razorpay;
};

const Summary = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [orderConfirmationDetails, setOrderConfirmationDetails] = useState<{ 
    isOpen: boolean, 
    orderId?: string 
  }>({ isOpen: false });

  const removeAll = useCart((state) => state.removeAll);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const items = useCart((state) => state.items);
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      const price = parseFloat(
        (item.selectedVariant?.price || item.price || "0").toString()
      );
      const quantity = parseInt(item.quantity.toString(), 10) || 0;
      return total + price * quantity;
    }, 0);
  }, [items]);

  // User Data Fetching
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsUserDataLoading(true);
        if (user?.id) {
          const data = await getCustomerData(user.id);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setIsUserDataLoading(false);
      }
    };

    if (isLoaded) {
      fetchUserData();
    }
  }, [user, isLoaded]);

  const handlePayment = async () => {
    // Comprehensive Pre-Payment Validation
    if (!isLoaded || !user) {
      toast.error("Please sign in before making a payment.");
      router.push("/sign-in");
      return;
    }

    if (totalPrice <= 0) {
      toast.error("Invalid cart total. Please add items to your cart.");
      return;
    }

    if (!userData) {
      toast.error("Please complete your billing information.");
      return;
    }

    setIsProcessing(true);

    try {
      // Create Order
      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/createOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeId: process.env.NEXT_PUBLIC_STORE_ID,
            customerId: user.id,
            alternatePhone: userData.alternatePhone,
            totalAmount: totalPrice,
            orderItems: items.map(
              ({ id, quantity, selectedVariant, price, name,images }) => ({
                productId: id,
                productName: name,
                // productImageUrl: images[0] ,
                variantId: selectedVariant?.id || id,
                quantity,
                unitPrice: Number(selectedVariant?.price || price || 0),
                totalPrice: Number(selectedVariant?.price || price || 0) * quantity,
              })
            ),
            phone: userData.phone || "9999999999",
            address: `${userData.streetAddress}, ${userData.city}, ${userData.state}, ${userData.postalCode}`,
            name: userData.name,
            email: userData.email,
          }),
        }
      );

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(`Order creation failed: ${errorText}`);
      }

      const orderData = await orderResponse.json();

      // Razorpay Payment Options
      const razorpayOptions: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
        amount: totalPrice * 100, // Convert to paise
        currency: "INR",
        name: "DRYAURA",
        description: "Product Purchase",
        order_id: orderData.paymentOrderDetails.id,
        handler: async (response: RazorpayCheckoutResponse) => {
          try {
            // Verify Payment
            const verificationResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/verify-payment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                }),
              }
            );

            if (verificationResponse.ok) {
              setOrderConfirmationDetails({
                isOpen: true,
                orderId: response.razorpay_order_id
              });
              removeAll();
            } else {
              const errorData = await verificationResponse.json();
              throw new Error(
                errorData.message || "Payment verification failed"
              );
            }
          } catch (verificationError) {
            console.error("Payment Verification Error:", verificationError);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
        theme: { color: "#3D1D1D" },
      };

      // Initialize and Open Razorpay Checkout
      const razorpay = await initializeRazorpay(razorpayOptions);
      razorpay.open();
    } catch (error) {
      console.error("Payment Process Error:", error);
      toast.error(
        error instanceof Error
          ? `Payment failed: ${error.message}`
          : "An unexpected error occurred"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative space-y-6  border-none rounded-3xl p-0 md:p-8  l transition-all duration-300 ease-in-out">
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#3D1D1D]/5 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#3D1D1D]/5 rounded-full translate-x-1/2 translate-y-1/2 z-0"></div>

      <OrderSummary />

      <div className="relative z-10 space-y-6 bg-[#3D1D1D]/5 px-4 py-6 rounded-2xl">
        <div className="space-y-4 text-[#3D1D1D]/80">
          {isUserDataLoading ? (
            <div className="border-t border-[#3D1D1D]/10 pt-6">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : !userData ? (
            <div className="border-t border-[#3D1D1D]/10 pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-[#3D1D1D]/10 rounded-full">
                  <Edit className="w-6 h-6 text-[#3D1D1D]" />
                </div>
                <h5 className="text-xl font-bold text-[#3D1D1D]">
                  Add Billing Information
                </h5>
              </div>
              <p className="text-sm text-[#3D1D1D]/70 mb-4">
                Please add your billing information to proceed with the payment.
              </p>
              <BillingDialog
                title="Add Billing Details"
                subtitle="Complete your billing information"
                triggerLabel="Add Billing Information"
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#3D1D1D]/10 rounded-full">
                    <Edit className="w-6 h-6 text-[#3D1D1D]" />
                  </div>
                  <h5 className="text-2xl font-bold text-[#3D1D1D] tracking-tight">
                    Billing Information
                  </h5>
                </div>
              </div>
              <p className="text-sm text-[#3D1D1D]/70">
                Please review your billing information before proceeding with
                the payment.
              </p>

              <DeliveryAddress />
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={handlePayment}
          disabled={isProcessing || !userData}
          className="group w-full max-w-md bg-[#3D1D1D] hover:bg-[#2C1515] text-white font-semibold py-4 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#3D1D1D]/50 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
        >
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {isProcessing ? "Processing Payment..." : "Proceed to Payment"}
          </span>
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </Button>
      </div>
      <OrderConfirmationModal 
        isOpen={orderConfirmationDetails.isOpen}
        orderDetails={{ orderId: orderConfirmationDetails.orderId }}
        onClose={() => {
          setOrderConfirmationDetails({ isOpen: false });
          router.push('/');  // Navigate to home or desired page
        }}
      />
    </div>
  );
};

export default Summary;
