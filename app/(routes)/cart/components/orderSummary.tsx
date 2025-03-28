import { applyPromotion, getPromotion } from "@/actions/get-promotion";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { FaTag, FaTruck, FaPercentage } from "react-icons/fa";

const OrderSummary = () => {
  const cart = useCart();
  const items = cart.items;
  const [promotionCode, setPromotionCode] = useState<string>('');
  const [isPromotionApplied, setIsPromotionApplied] = useState<boolean>(false);
  const [showPromotionInput, setShowPromotionInput] = useState<boolean>(false);
  const [promotionDiscount, setPromotionDiscount] = useState<number>(0);
  const [promotionError, setPromotionError] = useState<string | null>(null);
  const [isApplyingPromotion, setIsApplyingPromotion] = useState<boolean>(false);

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      const price = parseFloat(
        (item.selectedVariant?.price || item.price || '0').toString()
      );
      const quantity = parseInt(item.quantity.toString(), 10) || 0;
      return total + price * quantity;
    }, 0);
  }, [items]);

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
      // Dynamically get store ID (replace with actual method)
      const storeId = `${process.env.NEXT_PUBLIC_STORE_ID}`;
  
      console.group('Promotion Application Process');
      console.log('Attempting to apply promotion:', { 
        storeId, 
        promotionCode: promotionCode.trim() 
      });
  
      const promotion = await getPromotion(storeId, promotionCode.trim());
  
      // Additional safety checks
      if (!promotion) {
        console.warn('No promotion returned');
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
  
      // Apply promotion to current subtotal
      const { discountAmount, finalTotal } = applyPromotion(totalPrice, promotion);
  
      console.log('Promotion Application Result:', { 
        discountAmount, 
        finalTotal 
      });
  
      if (discountAmount > 0) {
        // Add a slight delay to show loading state
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
        
        // Optionally hide promotion input after successful application
        setShowPromotionInput(false);
      } else {
        setPromotionError('Promotion could not be applied.');
      }
  
      console.groupEnd();
    } catch (error) {
      console.groupEnd();
      console.error('Full Promotion Error:', error);
  
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Invalid or expired promotion code.';
      
      // Provide a user-friendly error message
      setPromotionError(errorMessage);
    } finally {
      setIsApplyingPromotion(false);
    }
  }, [promotionCode, totalPrice]);

  const shippingOptions = [
    { label: 'Standard (4-5 days)', value: 0, icon: <FaTruck className="text-gray-600" /> },
    { label: 'Express (2-3 days)', value: 50, icon: <FaTruck className="text-blue-600" /> }
  ];

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  const subtotal = totalPrice;
  const shipping = selectedShipping.value;
  const total = subtotal + shipping - promotionDiscount;

  const renderPromotionInput = () => (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={promotionCode}
          onChange={(e) => {
            setPromotionCode(e.target.value);
            setPromotionError(null);
          }}
          placeholder="Enter promotion code"
          className="flex-1 px-3 py-3 border-2 border-[#3D1D1D]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3D1D1D]/50 text-[#3D1D1D] w-full md:w-auto"
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
              <FaTag className="mr-2" />  Applying...
              {/* <svg 
                className="animate-spin h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg> */}
            </div>
          ) : (
            'Apply'
          )}
        </button>
      </div>
      {promotionError && (
        <p className="text-red-500 text-sm mt-2 flex items-center">
          <FaPercentage className="mr-2" /> {promotionError}
        </p>
      )}
      <span
        onClick={() => {
          setShowPromotionInput(false);
          setPromotionCode('');
          setPromotionError(null);
        }}
        className="text-red-500  px-3 py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#3D1D1D]/50 cursor-pointer text-right"
      >
        Close
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative space-y-6 bg-white border-2 border-[#3D1D1D]/10 rounded-3xl p-4 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#3D1D1D]/5 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#3D1D1D]/5 rounded-full translate-x-1/2 translate-y-1/2 z-0"></div>

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#3D1D1D]/10 rounded-full">
            <FaTag className="w-5 h-5 lg:w-6 lg:h-6 text-[#3D1D1D]" />
          </div>
          <h2 className="text-xl font-bold text-[#3D1D1D] tracking-tight">
            Your Order Details
          </h2>
        </div>
        <div className="text-sm text-[#3D1D1D]/70">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div className="relative z-10 space-y-4 bg-[#3D1D1D]/5 p-6 rounded-2xl">
        <div className="space-y-4 text-[#3D1D1D]/80">
          <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 py-3">
            <div className="text-base font-medium text-[#3D1D1D]">Subtotal:</div>
            <div className="text-base text-[#3D1D1D]">
              <Currency value={subtotal.toString()} />
            </div>
          </div>

          <div className="flex flex-col space-y-3 border-b border-[#3D1D1D]/10 py-3">
            <div className="flex items-center justify-between">
              <div className="text-base font-medium text-[#3D1D1D] flex items-center">
                <FaTruck className="mr-2 text-[#3D1D1D]" /> Shipping
              </div>
            </div>
            <select
              value={selectedShipping.label}
              onChange={(e) => {
                const selected = shippingOptions.find(option => option.label === e.target.value);
                if (selected) setSelectedShipping(selected);
              }}
              className="px-4 py-3 border-2 border-[#3D1D1D]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3D1D1D]/50 text-[#3D1D1D] w-full md:w-auto"
            >
              {shippingOptions.map(option => (
                <option key={option.label} value={option.label} className="flex items-center py-1 px-2 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-500">
                  {option.icon} {option.label} - {option.value === 0 ? 'Free' : <Currency value={option.value.toString()} />}
                </option>
              ))}
            </select>
          </div>

          {isPromotionApplied && (
            <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 py-3">
              <div className="text-base font-medium text-green-600 flex items-center">
                <FaPercentage className="mr-2" /> Promotion Applied
              </div>
              <button
                onClick={() => {
                  setIsPromotionApplied(false);
                  setPromotionCode('');
                  setPromotionDiscount(0);
                }}
                className="group flex items-center text-sm text-[#3D1D1D] hover:text-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-200 rounded-md px-2 py-1"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1 transition-transform group-hover:rotate-90" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
                Remove Code
              </button>
            </div>
          )}

          <AnimatePresence>
            {showPromotionInput && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="border-b border-[#3D1D1D]/10 py-3"
              >
                {renderPromotionInput()}
              </motion.div>
            )}
          </AnimatePresence>

          {!showPromotionInput && !isPromotionApplied && (
            <div className="flex justify-end py-2">
              <button
                onClick={() => setShowPromotionInput(true)}
                className="text-[#3D1D1D] hover:text-[#2C1515] flex items-center text-sm transition-colors duration-300"
              >
                <FaTag className="mr-2" /> Add Promotion Code
              </button>
            </div>
          )}

          {isPromotionApplied && (
            <div className="flex items-center justify-between border-b border-[#3D1D1D]/10 py-3 text-green-600">
              <span>Promotion Discount</span>
              <Currency value={-promotionDiscount} />
            </div>
          )}

          <div className="flex items-center justify-between py-3 border-b border-[#3D1D1D]/10">
            <div className="text-base font-bold text-[#3D1D1D]">Total:</div>
            <div className="text-xl font-bold text-[#3D1D1D]">
              <Currency value={total.toString()} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;