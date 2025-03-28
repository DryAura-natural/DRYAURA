import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// Add this component just before the Summary component
const OrderConfirmationModal = ({ 
  isOpen, 
  onClose, 
  orderDetails 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  orderDetails?: { orderId?: string } 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              className="mx-auto mb-6 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-[#3D1D1D] mb-4">
              Order Placed Successfully!
            </h2>
            
            {orderDetails?.orderId && (
              <p className="text-sm text-gray-600 mb-6">
                Your Order ID: 
                <span className="font-semibold ml-2">
                  {orderDetails.orderId}
                </span>
              </p>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-[#3D1D1D] text-white px-6 py-3 rounded-xl hover:bg-[#2C1515] transition-all"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


export default OrderConfirmationModal;