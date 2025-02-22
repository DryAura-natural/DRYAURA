// components/Description.tsx

"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


interface DescriptionProps {
  text: string;
}
const Description = ({ text }: DescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const formattedText = text
    .replace(/## (.*?)\n/g, '<h1 class="text-xl font-semibold mb-2">$1</h1>')
    .replace(/### (.*?)\n/g, '<h3 class="text-lg font-medium mb-2">$1</h3>')
    .replace(/- (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n/g, '<br>');

  return (
    <div className="max-h-screen overflow-scroll p-5">
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-full p-5' : 'max-h-24 overflow-hidden'} bg-gray-100 p-4 rounded-md`}>
        {isExpanded ? (
          <div dangerouslySetInnerHTML={{ __html: formattedText }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: `${formattedText.substring(0, 100)}...` }} />
        )}
      </div>
      <button 
  onClick={toggleReadMore} 
  className="mt-2 text-blue-500 hover:text-blue-700 transition-colors duration-200 flex items-center gap-1"
>
  {isExpanded ? (
    <>
      <span>Read Less</span>
      <ChevronUp className="w-4 h-4 animate-bounce" />
    </>
  ) : (
    <>
      <span>Read More</span>
      <ChevronDown className="w-4 h-4 animate-bounce" />
    </>
  )}
</button>
    </div>
  );
};
export default Description;