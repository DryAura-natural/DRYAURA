import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const items = useCart((state) => state.items);
  const [promotionCode, setPromotionCode] = useState<string>('');
  const [isPromotionApplied, setIsPromotionApplied] = useState<boolean>(false);
  const [showPromotionInput, setShowPromotionInput] = useState<boolean>(false);

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + price * quantity;
    }, 0);
  }, [items]);

  const handleApplyPromotion = () => {
    if (!promotionCode.trim()) {
      toast.error('Please enter a promotion code.');
      return;
    }
    if (promotionCode === 'SAVE40') {
      setIsPromotionApplied(true);
      setShowPromotionInput(false);
      toast.success('Promotion code applied successfully!');
    } else {
      setIsPromotionApplied(false);
      toast.error('Invalid promotion code. Please try again.');
    }
  };

  const shippingOptions = [
    { label: 'Standard (4-5 days)', value: 0 },
    { label: 'Express (2-3 days)', value: 30 },
    { label: 'Next Day', value: 50 }
  ];
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  const subtotal = totalPrice;
  const shipping = selectedShipping.value;
  const discount = isPromotionApplied ? 40 : 0;
  const orderTotal = subtotal + shipping - discount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 p-2 bg-white rounded-xl shadow-xl w-full"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Order Details</h2>

      <div className="flex items-center justify-between border-b border-gray-200 py-3">
        <div className="text-base font-medium text-gray-700">Items Total:</div>
        <div className="text-base text-gray-900">
          <Currency value={subtotal.toString()} />
        </div>
      </div>

      <div className="flex flex-col space-y-3 border-b border-gray-200 py-3">
        <div className="text-base font-medium text-gray-700">Shipping:</div>
        <select
          value={selectedShipping.label}
          onChange={(e) => {
            const selected = shippingOptions.find(option => option.label === e.target.value);
            if (selected) setSelectedShipping(selected);
          }}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3D1D1D] focus:border-transparent transition-all text-base"
        >
          {shippingOptions.map(option => (
            <option key={option.label} value={option.label}>
              {option.label} - {option.value === 0 ? 'Free' : <Currency value={option.value.toString()} />}
            </option>
          ))}
        </select>
      </div>

      {isPromotionApplied && (
        <div className="flex items-center justify-between border-b border-gray-200 py-3">
          <div className="text-base font-medium text-red-600">Discount:</div>
          <div className="text-base text-red-600">
            -<Currency value={discount.toString()} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-gray-200 py-3">
        <div className="text-base font-medium text-gray-700">Estimated Delivery:</div>
        <div className="text-base text-gray-900">
          {new Date(Date.now() + (selectedShipping.label.includes('Next Day') ? 86400000 : selectedShipping.label.includes('Express') ? 259200000 : 604800000)).toLocaleDateString()}
        </div>
      </div>

      <AnimatePresence>
        {showPromotionInput && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-between border-b border-gray-200 py-3"
          >
            <div className="flex items-center border-b border-gray-200 py-3">
              <div className="text-base font-medium text-gray-700 ">
                Discount Code:
              </div>
              <div className="flex items-center gap-1 ">
                <input
                  type="text"
                  value={promotionCode}
                  onChange={(e) => setPromotionCode(e.target.value)}
                  placeholder="Enter code"
                  className="px-4 py-1 flex-1 border w-full border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3D1D1D] focus:border-transparent transition-all text-base"
                />
                <button
                  onClick={handleApplyPromotion}
                  className="px-2 py-2  text-sm bg-[#3D1D1D]  text-white rounded-xl hover:bg-[#522929] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D1D1D] "
                >
                  Apply Code
                </button>
              </div>
            </div>
            {showPromotionInput && !isPromotionApplied && (
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPromotionInput(false)}
                  className="text-gray-600 hover:text-gray-800 underline cursor-pointer text-sm"
                >
                  Proceed Without Promotion
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!showPromotionInput && !isPromotionApplied && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowPromotionInput(true)}
            className="text-[#3D1D1D] hover:text-[#522929] underline cursor-pointer text-sm"
          >
            Add Promotion Code
          </button>
        </div>
      )}

      {isPromotionApplied && (
        <div className="flex items-center justify-between border-b border-gray-200 py-3">
          <div className="text-base font-medium text-green-600">
            Promotion Applied Successfully!
          </div>
          <button
            onClick={() => {
              setIsPromotionApplied(false);
              setPromotionCode('');
              setShowPromotionInput(false);
            }}
            className="text-red-600 hover:text-red-800 underline cursor-pointer text-sm"
          >
            Remove Promotion
          </button>
        </div>
      )}

      <div className="flex items-center justify-between bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-xl shadow-sm">
        <div className="text-xl font-semibold text-gray-900">Order Total:</div>
        <div className="text-xl font-semibold text-gray-900">
          <Currency value={orderTotal.toString()} />
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
