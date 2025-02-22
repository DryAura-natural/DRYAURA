import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface PinnedCardProps {
  product: {
    name: string;
    images: { url: string }[];
  };
}

const PinnedCard: React.FC<PinnedCardProps> = ({ product }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16">
          <Image
            src={product.images[0].url}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <Button className="mt-2">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default PinnedCard;