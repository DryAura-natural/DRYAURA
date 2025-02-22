import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const items = useCart((state) => state.items);
  const [promotionCode, setPromotionCode] = useState<string>("");
  const [isPromotionApplied, setIsPromotionApplied] = useState<boolean>(false);
  const [showPromotionInput, setShowPromotionInput] = useState<boolean>(true);

  const totalPrice = items.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is handled
    return total + price * quantity; // Multiply price by quantity
  }, 0);

  // Order details for display
  const itemsTotal = totalPrice;
  const deliveryCharge = 40;
  const promotionDiscount = isPromotionApplied ? -40 : 0; // Apply discount if promotion is valid
  const orderTotal = itemsTotal + deliveryCharge + promotionDiscount;

  // Function to handle promotion code validation
  const applyPromotion = () => {
    if (promotionCode === "SAVE40") {
      setIsPromotionApplied(true);
      setShowPromotionInput(false); // Hide the promotion code input
      toast.success("Promotion code applied successfully!"); // Success message
    } else {
      setIsPromotionApplied(false);
      toast.error("Invalid promotion code. Please try again."); // Error message
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>

      {/* Items Total */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="text-base font-medium text-gray-700">Items:</div>
        <div className="text-base text-gray-900">
          <Currency value={itemsTotal.toString()} />
        </div>
      </div>

      {/* Delivery Charge */}
      <div className="flex items-center justify-between border-b border-gray-200 py-4">
        <div className="text-base font-medium text-gray-700">Delivery:</div>
        <div className="text-base text-gray-900">
          <Currency value={deliveryCharge.toString()} />
        </div>
      </div>

      {/* Promotion Code Input */}
      <AnimatePresence>
        {showPromotionInput && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between border-b border-gray-200 py-4"
          >
            <div className="text-base font-medium text-gray-700">Promotion Code:</div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                placeholder="Enter code"
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D1D1D]"
              />
              <button
                onClick={applyPromotion}
                className="px-3 py-1 bg-[#3D1D1D] text-white rounded-md hover:bg-[#522929] transition-colors"
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Promotion Applied */}
      {isPromotionApplied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between border-b border-gray-200 py-4"
        >
          <div className="text-base font-medium text-gray-700">Promotion Applied:</div>
          <div className="text-base text-red-500">
            <Currency value={promotionDiscount.toString()} />
          </div>
        </motion.div>
 )}

      {/* Order Total */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-100 to-slate-200 p-4 rounded-lg shadow-sm">
        <div className="text-xl font-semibold text-gray-900">Order Total:</div>
        <div className="text-xl font-semibold text-gray-900">
          <Currency value={orderTotal.toString()} />
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;