"use client"
import {Button} from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import{Color,Size} from "@/types"
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps{
      data:(Size | Color | {id: string, name: string})[];
      name:string;
      valueKey:string;
}

const Filter:React.FC<FilterProps> = ({data,name,valueKey}) => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const selectedvalue = searchParams.get(valueKey);
  
  const onClick = (id:string)=>{
    console.error('Filter Debug:', {
      valueKey,
      id,
      currentParams: searchParams.toString(),
      parsedParams: qs.parse(searchParams.toString())
    });

    try {
      const current = qs.parse(searchParams.toString());
      
      // Special handling for price range
      const query = valueKey === 'priceRange' 
        ? {
            ...current,
            minPrice: id.split('-')[0] !== '2000' ? id.split('-')[0] : undefined,
            maxPrice: id !== '2000+' ? id.split('-')[1] : undefined,
            [valueKey]: id
          }
        : {
            ...current,
            [valueKey]: id
          };

      // Toggle off if already selected
      if (current[valueKey] === id) {
        delete query[valueKey];
        if (valueKey === 'priceRange') {
          delete query.minPrice;
          delete query.maxPrice;
        }
      }
      
      const url = qs.stringifyUrl({
        url: window.location.href,
        query
      }, {skipNull: true});

      console.error('Generated Filter URL:', url);
      
      router.push(url);
    } catch (error) {
      console.error('Filter Error:', error);
    }
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">
        {name}
      </h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter)=>(
          <div key={filter.id} className="flex items-center">
            <Button 
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 hover:bg-black hover:text-white",
                selectedvalue === filter.id && "bg-black text-white"
              )} 
              onClick={()=>onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter;