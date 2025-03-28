"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/Button";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ 
  minPrice, 
  maxPrice 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Parse existing price range from URL or use default
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice') || minPrice),
    Number(searchParams.get('maxPrice') || maxPrice)
  ]);

  // Update price range when component mounts or minPrice/maxPrice changes
  useEffect(() => {
    setPriceRange([
      Number(searchParams.get('minPrice') || minPrice),
      Number(searchParams.get('maxPrice') || maxPrice)
    ]);
  }, [minPrice, maxPrice, searchParams]);

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    router.push(`?${params.toString()}`);
  };

  const clearPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('minPrice');
    params.delete('maxPrice');
    
    router.push(`?${params.toString()}`);
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Price Range</h3>
      
      <Slider
        defaultValue={priceRange}
        min={minPrice}
        max={maxPrice}
        step={1}
        onValueChange={handlePriceChange}
        formatLabel={(value) => `$${value}`}
      />
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          onClick={applyPriceFilter} 
          className="w-full"
          variant="outline"
        >
          Apply Filter
        </Button>
        <Button 
          onClick={clearPriceFilter} 
          className="w-full"
          variant="destructive"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};