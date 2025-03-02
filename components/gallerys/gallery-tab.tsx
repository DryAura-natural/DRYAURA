import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";

interface GalleryTabProps {
  image: ImageType;
}
const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative h-16 flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div className="aspect-square max-h-[400px] md:max-h-[300px]">
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <Image
              fill
              src={image.url}
              alt=""
              className="object-contain object-center scale-110 aspect-square object-cover rounded-lg w-full h-full"
            />
          </span>
          <span className={cn(
            "absolute inset-0 rounded-md ring-2 ring-offset-2",selected?"ring-black":"ring-transparent"
          )}/>

        
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
