import useCart from "@/hooks/use-cart";


const totalAmounnt =()=>{
      const items = useCart((state) => state.items); 
      const totalPrice = items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is handled
            return total + price * quantity; // Multiply price by quantity
          }, 0);
} 

export default totalAmounnt;