"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import BillingDialog from "@/components/BillingDialog";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// import OrderSummary from "./orderSummary";
import DeliveryAddress from "./deliveryAddress";
import useCart from "@/hooks/use-cart";
import getCustomerData from "@/actions/getCustomerData";
import { Edit, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { applyPromotion, getPromotion } from "@/actions/get-promotion";
import { FaTag, FaTruck, FaPercentage } from "react-icons/fa";
import { X } from "lucide-react";

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

  const [promotionCode, setPromotionCode] = useState<string>('');
  const [isPromotionApplied, setIsPromotionApplied] = useState<boolean>(false);
  const [showPromotionInput, setShowPromotionInput] = useState<boolean>(false);
  const [promotionError, setPromotionError] = useState<string | null>(null);
  const [isApplyingPromotion, setIsApplyingPromotion] = useState<boolean>(false);
  const [promotionDiscount, setPromotionDiscount] = useState<number>(0);

  const shippingOptions = [
    { label: 'Standard (4-5 days)', value: 0, icon: <FaTruck className="text-gray-600" /> },
    { label: 'Express (2-3 days)', value: 50, icon: <FaTruck className="text-blue-600" /> },
    { label: 'Express (1-2 days)', value: 80, icon: <FaTruck className="text-blue-600" /> }
  ];

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  const handleApplyPromotion = useCallback(async () => {
    // Reset previous states
    setPromotionError(null);
    setIsPromotionApplied(false);
    setPromotionDiscount(0);
    setIsApplyingPromotion(true);
  
    if (!promotionCode.trim()) {
      setPromotionError('Please enter a promotion code.');
      setIsApplyingPromotion(false);
      return;
    }
  
    try {
      const storeId = `${process.env.NEXT_PUBLIC_STORE_ID}`;
  
      const promotion = await getPromotion(storeId, promotionCode.trim());
  
      if (!promotion) {
        setPromotionError('Unable to validate promotion. Please try again.');
        setIsApplyingPromotion(false);
        return;
      }

      // Validate minimum cart value if specified
      if (promotion.minPurchaseAmount && totalPrice < promotion.minPurchaseAmount) {
        setPromotionError(`Minimum purchase of ${promotion.minPurchaseAmount} required to use this promotion.`);
        setIsApplyingPromotion(false);
        return;
      }
  
      const { discountAmount, finalTotal } = applyPromotion(totalPrice, promotion);
  
      if (discountAmount > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsPromotionApplied(true);
        setPromotionDiscount(discountAmount);
        
        toast.success(`Promotion applied! You saved ${discountAmount.toFixed(2)}`, {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        });
        
        setShowPromotionInput(false);
      } else {
        setPromotionError('Promotion could not be applied.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Invalid or expired promotion code.';
      
      setPromotionError(errorMessage);
    } finally {
      setIsApplyingPromotion(false);
    }
  }, [promotionCode, totalPrice]);

  const renderPromotionInput = () => (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={promotionCode}
          onChange={(e) => {
            setPromotionCode(e.target.value);
            setPromotionError(null);
          }}
          placeholder="Enter promotion code"
          className="flex-1 px-3 py-3 border-2 border-[#3D1D1D]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3D1D1D]/50 text-[#3D1D1D] w-full"
        />
        <button 
          onClick={handleApplyPromotion}
          disabled={isApplyingPromotion}
          className={`
            px-3 py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#3D1D1D]/50
            ${isApplyingPromotion 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-[#3D1D1D] text-white hover:bg-[#2C1515]'
            }
          `}
        >
          {isApplyingPromotion ? (
            <div className="flex items-center justify-center">
              <FaTag className="mr-2" /> Applying...
            </div>
          ) : (
            'Apply'
          )}
        </button>
      </div>
      {promotionError && (
        <p className="text-red-500 text-sm flex items-center">
          <FaPercentage className="mr-2" /> {promotionError}
        </p>
      )}
    </div>
  );

  const subtotal = totalPrice;
  const shipping = selectedShipping.value;
  const total = subtotal + shipping - promotionDiscount;

  // State to control promo code visibility
  const [isPromoCodeVisible, setIsPromoCodeVisible] = useState(true);

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
            totalAmount: total,
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
        amount: total * 100, // Convert to paise
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
        {/* Order Summary */}
        <div className="space-y-4 bg-white p-6 rounded-xl border border-[#3D1D1D]/10 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 py-3">
          <div className="text-base font-medium text-[#3D1D1D]">Subtotal:</div>
          <div className="text-base text-[#3D1D1D]">
            ₹{subtotal.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 py-3">
          <div className="text-base font-medium text-[#3D1D1D]">Shipping:</div>
          <div className="text-base text-[#3D1D1D]">
            ₹{shipping.toFixed(2)}
          </div>
        </div>

        {promotionDiscount > 0 && (
          <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 py-3">
            <div className="text-base font-medium text-green-600">Promotion Discount:</div>
            <div className="text-base text-green-600">
              -₹{promotionDiscount.toFixed(2)}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between py-3 border-t border-[#3D1D1D]/10">
          <div className="text-base font-bold text-[#3D1D1D]">Total:</div>
          <div className="text-xl font-bold text-[#3D1D1D]">
            ₹{total.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Shipping Method Selection */}
      <div className="space-y-4 bg-white p-6 rounded-xl border border-[#3D1D1D]/10 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 pb-3">
          <h3 className="text-lg font-semibold text-[#3D1D1D]">Shipping Method</h3>
        </div>
        
        <div className="space-y-3">
          {shippingOptions.map((option) => (
            <div 
              key={option.label}
              onClick={() => setSelectedShipping(option)}
              className={`
                flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-300
                ${selectedShipping.label === option.label 
                  ? 'border-[#3D1D1D] bg-[#3D1D1D]/5' 
                  : 'border-[#3D1D1D]/20 hover:border-[#3D1D1D]/40'}
              `}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${selectedShipping.label === option.label 
                      ? 'border-[#3D1D1D] bg-[#3D1D1D]' 
                      : 'border-[#3D1D1D]/40'}
                  `}
                >
                  {selectedShipping.label === option.label && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-[#3D1D1D]">{option.label}</span>
              </div>
              <span className="text-[#3D1D1D] font-semibold">
                {option.value === 0 ? 'Free' : `₹${option.value}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Promotion Code Section */}
      {isPromoCodeVisible && (
        <div className="space-y-4 bg-white p-6 rounded-xl border border-[#3D1D1D]/10 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 pb-3">
            <h3 className="text-lg font-semibold text-[#3D1D1D]">Promotion Code</h3>
            {!showPromotionInput && (
              <button 
                onClick={() => setShowPromotionInput(true)}
                className="text-[#3D1D1D] hover:underline"
              >
                Add Promo Code
              </button>
            )}
          </div>
          
          {showPromotionInput && renderPromotionInput()}
          
          {isPromotionApplied && isPromoCodeVisible && (
            <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 py-3">
              <div className="flex items-center space-x-2">
                <div className="text-base font-medium text-green-600">Promo Code:</div>
                <button 
                  onClick={() => setIsPromoCodeVisible(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-base text-green-600">{promotionCode}</div>
            </div>
          )}
        </div>
      )}
    
      {/* Rest of the existing code */}
      <div className="relative z-10 space-y-6 bg-[#3D1D1D]/5 px-4 py-6 rounded-2xl">
        {/* Existing content */}
        {/* <OrderSummary /> */}

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
    </motion.div>
  );
};

export default Summary;
