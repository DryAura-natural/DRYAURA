
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
const OrderSummary = () => {
      const items = useCart((state) => state.items); 
      const totalPrice = items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is handled
            return total + price * quantity; // Multiply price by quantity
          }, 0);
          // Order details for display (These values can come from your cart state or props)
          const itemsTotal = totalPrice.toString();
          const deliveryCharge = 40;
          const promotionApplied = -40.0;
          const orderTotal = (parseFloat(itemsTotal) + deliveryCharge + promotionApplied).toString();
        
  return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Items:</div>
          <div className="text-base text-gray-900">
            <Currency value={itemsTotal} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-base font-medium text-gray-900">Delivery:</div>
          <div className="text-base text-gray-900">
            <Currency value={deliveryCharge.toString()} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-base font-medium text-gray-900">
            Promotion Applied:
          </div>
          <div className="text-base text-gray-900 text-red-500">
            <Currency value={promotionApplied.toString()} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 p-2 bg-slate-300 rounded-sm  ">
          <div className="text-xl font-semibold text-gray-900 ">
            Order Total:
          </div>
          <div className="text-xl font-semibold text-gray-900">
            <Currency value={orderTotal} />
          </div>
        </div>
      </div>
  )
}

export default OrderSummary