"use client";
import { MouseEventHandler, useState, useMemo } from "react";
import { Product } from "@/types";
import {
  ShoppingCart,
  WalletCards,
  Plus,
  Minus,
  ChevronDownIcon,
} from "lucide-react";
import Currency from "./ui/currency";
import { Button } from "./ui/Button";
import toast from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GreeneryBanner from "./ui/greenerybanner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";

interface InfoProps {
  data: Product;
  showDescription?: boolean;
  showBenefits?: boolean;
  showSpecifications?: boolean;
  showReviews?: boolean;
  showNutritionInfo?: boolean;
  showShowBanner?: boolean;
}

const Info: React.FC<InfoProps> = ({
  data,
  showDescription = true,
  showShowBanner = true,
}) => {
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onIncrement = () => {
    if (quantity < 5) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("Maximum quantity reached!");
    }
  };

  const onDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      toast.error("Minimum quantity reached!");
    }
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    
    // Ensure a variant is selected
    if (!currentVariant) {
      toast.error('Please select a variant');
      return;
    }

    const itemWithQuantity = { 
      ...data, 
      quantity, 
      selectedVariant: currentVariant 
    };

    cart.addItem(itemWithQuantity);
    
 
  };

  const onPurchased: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    
    // Ensure a variant is selected
    if (!currentVariant) {
      toast.error('Please select a variant');
      return;
    }

    const itemWithQuantity = { 
      ...data, 
      quantity, 
      selectedVariant: currentVariant 
    };

    cart.addItem(itemWithQuantity);
    router.push("/cart");
  };

  // Determine available variants
  const availableVariants = data.variants?.filter(variant => variant.sizeId) || [];

  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    availableVariants.length > 0 ? availableVariants[0].sizeId : null
  );

  // Get selected variant details with fallback
  const currentVariant = useMemo(() => {
    if (availableVariants.length === 0) return null;
    return availableVariants.find(
      variant => variant.sizeId === selectedVariant
    ) || availableVariants[0];
  }, [availableVariants, selectedVariant]);

  // Pricing calculations with null check
  const mrp = currentVariant?.mrp || data.mrp || 1300;
  const price = currentVariant?.price || data.price;
  const save = mrp - price;
  const percentage = Math.round((save / mrp) * 100);

  // Handle variant selection
  const handleVariantSelect = (value: string) => {
    setSelectedVariant(value);
  };

  return (
    <div className="max-h-full md:max-h-screen overflow-visible  overflow-y-auto hide-scrollbar">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 hidden md:block capitalize">
        {data.name}
      </h1>

      <div className="mt-3 flex items-end justify-between ">
        <p className="text-lg md:text-xl text-gray-900 flex flex-col gap-2">
          <div className="flex text-sm md:text-lg space-x-1">
            <span>MRP:</span>
            <span className="text-gray-700 stroke-current">
              <del>
                <Currency value={mrp} />
              </del>
            </span>
            <span className="text-xs md:text-sm text-orange-600">
              Save ₹{save}
            </span>
          </div>
          <div className="flex space-x-1">
            <span className="text-red-800 font-black">
              <Currency value={price} />
            </span>
            <span className="text-xs md:text-sm">(incl. of all taxes)</span>
          </div>
        </p>
        <div>
          <Badge className=" top-5 right-5 px-2 bg-green-900 z-10 text-white">
            {percentage}% off
          </Badge>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black text-base md:text-lg">
            Size:
          </h3>
          <ToggleGroup 
            type="single" 
            size="lg" 
            value={selectedVariant || ''}
            onValueChange={handleVariantSelect}
          >
            {availableVariants.map((variant) => (
              <ToggleGroupItem
                key={variant.sizeId}
                value={variant.sizeId}
                aria-label={`Select ${variant.sizeId} variant`}
                className="bg-none data-[state=on]:bg-green-900 data-[state=on]:text-white border border-gray-700"
              >
                {variant.size?.value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <h3 className="font-semibold text-black text-base md:text-lg">
          Quantity:
        </h3>
        <div className="flex items-center space-x-2 w-24 justify-between border border-gray-300 rounded-lg p-1">
          <button
            onClick={onDecrement}
            className="bg-gray-100 p-2 rounded-full text-sm hover:bg-gray-200 text-black transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="text-lg font-semibold text-black">{quantity}</span>
          <button
            onClick={onIncrement}
            className="bg-gray-100 p-2 rounded-full text-sm hover:bg-gray-200 text-black transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
      <div className="my-5 flex  flex-col items-center gap-x-3 w-full gap-y-2 ">
        <Button
          className="bg-[#3D1D1D] text-base font-semibold flex items-center gap-x-2 w-full hover:bg-[#502a2a] text-white"
          onClick={onAddToCart}
        >
          Add to Cart <ShoppingCart />
        </Button>
        <Button
          className="bg-transparent border text-base font-semibold text-[#3D1D1D] hover:bg-[#3d202000] hover:text-black px-4 py-2 rounded-lg w-full"
          onClick={onPurchased}
        >
          Buy It Now <WalletCards />
        </Button>
      </div>

      {showShowBanner && <GreeneryBanner />}
      {showDescription && (
        <>
          <Accordion
            type="single"
           collapsible
            className="mt-6 w-full"
          >
            <AccordionItem value="description">
              <AccordionTrigger
                className="flex w-full items-center justify-between py-4 font-medium text-gray-900 hover:text-green-900"
                onClick={() => setIsOpen(!isOpen)}
              >
                Description
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
              
                {data.description}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="benefits">
              <AccordionTrigger className="flex w-full items-center justify-between py-4 font-medium text-gray-900 hover:text-green-900">
                Benefits
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  {data.benefits ? (
                    typeof data.benefits === 'string' ? (
                      <li>{data.benefits}</li>
                    ) : Array.isArray(data.benefits) ? (
                      data.benefits.map((benefit, index) => (
                        <li key={index}>{String(benefit)}</li>
                      ))
                    ) : (
                      Object.entries(data.benefits).map(([key, value], index) => (
                        <li key={index}>{`${key}: ${String(value)}`}</li>
                      ))
                    )
                  ) : (
                    <>
                    <li>Calories: 250 kcal</li>
                    <li>Protein: 15g</li>
                    <li>Carbohydrates: 30g</li>
                    <li>Fat: 10g</li>
                    <li>Fiber: 5g</li>
                    </>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="specifications">
              <AccordionTrigger className="flex w-full items-center justify-between py-4 font-medium text-gray-900 hover:text-green-900">
                Specifications
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  {data.specifications ? (
                    typeof data.specifications === 'string' ? (
                      <li>{data.specifications}</li>
                    ) : Array.isArray(data.specifications) ? (
                      data.specifications.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))
                    ) : (
                      Object.entries(data.specifications).map(([key, value], index) => (
                        <li key={index}>{`${key}: ${String(value)}`}</li>
                      ))
                    )
                  ) : (
                    <>
                   <li>Material: 100% Organic</li>
                      <li>Dimensions: 30 x 20 x 10 cm</li>
                      <li>Weight: 500 grams</li>
                      <li>Color Options: Red, Blue, Green</li>
                      <li>Care Instructions: Machine Washable</li>
                    </>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default Info;
