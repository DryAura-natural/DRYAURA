"use client";

import {Button} from "@/components/ui/Button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Filter from "./filter";

const priceRanges = [
  { id: '0-500', name: '₹0 - ₹500' },
  { id: '500-1000', name: '₹500 - ₹1000' },
  { id: '1000-2000', name: '₹1000 - ₹2000' },
  { id: '2000+', name: '₹2000 and above' },
];

interface MobileFiltersProps {
  sizes: Size[];
  
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes,  }) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filters
        <Plus size={20} />
      </Button>
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="flex inset-0 bg-black bg-opacity-25" />
        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full  w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* closeButton */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            {/* Render the filters */}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              {/* <Filter valueKey="colorId" name="Colors" data={colors} /> */}
              <Filter valueKey="priceRange" name="Price Range" data={priceRanges} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
