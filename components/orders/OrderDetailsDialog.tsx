'use client';
import React from 'react';
import Image from 'next/image';
import { X, Package, CreditCard, MapPin, Truck, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface OrderDetailsModalProps {
  order: any;
  isOpen?: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ 
  order, 
  isOpen = false, 
  onClose 
}: OrderDetailsModalProps) {
  if (!order || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-black">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-600 hover:text-black transition-colors group"
        >
          <X className="h-8 w-8 stroke-2 group-hover:scale-110 transition-transform" />
        </button>
  
        {/* Order Header */}
        <div className="space-y-6 border-b-2 border-black pb-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">
                  Order Details
                </h2>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Placed on {new Date(order.createdAt).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            {/* Order Status */}
            <span 
              className={`px-2 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${
                order.orderStatus === "DELIVERED"
                  ? "bg-green-100 text-green-800"
                  : order.orderStatus === "PROCESSING"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>
  
        {/* Order Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Package className="h-5 w-5 mr-2 text-gray-600" />
              <p className="text-xs font-bold text-gray-500">Total Amount</p>
            </div>
            <p className="text-2xl font-black text-black">
              {formatCurrency(order.totalAmount)}
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-600">
                Subtotal: {formatCurrency(order.subtotalAmount || 0)}
              </p>
              <p className="text-xs text-gray-600">
                Tax: {formatCurrency(order.taxAmount || 0)}
              </p>
              {order.discountAmount && (
                <p className="text-xs text-green-600">
                  Discount: -{formatCurrency(order.discountAmount)}
                </p>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
              <p className="text-xs font-bold text-gray-500">Payment Status</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-bold ${
                order.isPaid ? 'text-green-600' : 'text-red-600'
              }`}>
                {order.isPaid ? 'Paid' : 'Pending'}
              </span>
              {order.paymentMethod && (
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {order.paymentMethod}
                </span>
              )}
            </div>
            {order.paymentDate && (
              <p className="text-xs text-gray-600 mt-2">
                Paid on: {new Date(order.paymentDate).toLocaleString()}
              </p>
            )}
            {!order.isPaid && (
              <div className="mt-2 bg-red-50 p-2 rounded-lg">
                <p className="text-xs text-red-600 font-medium">
                  Payment is pending. Please complete your payment.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Truck className="h-5 w-5 mr-2 text-gray-600" />
              <p className="text-xs font-bold text-gray-500">Shipping Details</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-800">
                {order.shippingMethod || 'Standard Shipping'}
              </p>
              <p className="text-xs text-gray-600">
                Estimated Delivery: {order.estimatedDelivery 
                  ? new Date(order.estimatedDelivery).toLocaleDateString() 
                  : 'Pending'}
              </p>
              {order.trackingId && (
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-600">
                    Tracking ID: {order.trackingId}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
  
        {/* Delivery Address */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 mr-2 text-gray-600" />
            <h3 className="text-sm font-bold text-gray-500">Delivery Address</h3>
          </div>
          <p className="text-sm text-gray-800 font-medium">
            {order.address || 'Address not provided'}
          </p>
        </div>
  
        {/* Order Items */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-grow">
                  <p className="text-sm font-bold text-gray-900">
                    {item.productName|| 'Unknown Product'}
                  </p>
                  <p className="text-xs text-gray-600">
                    Variant: {item.variant?.size?.name || 'Unknown Size'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}