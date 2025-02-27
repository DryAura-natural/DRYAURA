"use client";
import { useRef } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react"; // Import Share2 icon
import Image from "next/image";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Different Types of Dates and Their Amazing Health Benefits",
    excerpt: "Dates are soft, chewy, and sweet flavored fruit widely eaten in Middle Eastern countries. They are highly beneficial as they contain vital nutrients for maintaining good health. Low in fat...",
    category: "Nutritional Blog",
    author: "Admin",
    date: "Feb 19, 2025",
    image: "https://img.freepik.com/free-photo/networking-media-sharing-icons-graphic-concept_53876-120836.jpg?t=st=1740676371~exp=1740679971~hmac=5c2304876269b66918973c8753676d30dd1420e4e9ae500c6649fa84d5534bba&w=900",
  },
  {
    id: 2,
    title: "Dates Benefits for Skin and Hair: Top 6 Ways They Make a Difference",
    excerpt: "Dates are one of the most versatile ingredients found in many households. Unfortunately, with its high sugar content, people often confuse it with high-calorie food and avoid adding it to...",
    category: "Health Benefits",
    author: "Admin",
    date: "Feb 15, 2025",
    image: "https://img.freepik.com/free-photo/networking-media-sharing-icons-graphic-concept_53876-120836.jpg?t=st=1740676371~exp=1740679971~hmac=5c2304876269b66918973c8753676d30dd1420e4e9ae500c6649fa84d5534bba&w=900",
  },
  {
    id: 3,
    title: "Top 8 Benefits of Dates for Men: An Informative Guide",
    excerpt: "Dates offer numerous health benefits and come packed with great nutritive values. The sweet caramel-like flavor of dates make them a popular dry fruit worldwide. Grown in the...",
    category: "Health Benefits",
    author: "Admin",
    date: "Feb 10, 2025",
    image: "https://img.freepik.com/free-photo/networking-media-sharing-icons-graphic-concept_53876-120836.jpg?t=st=1740676371~exp=1740679971~hmac=5c2304876269b66918973c8753676d30dd1420e4e9ae500c6649fa84d5534bba&w=900",
  },
  {
    id: 4,
    title: "Top 8 Benefits of Dates for Men: An Informative Guide",
    excerpt: "Dates offer numerous health benefits and come packed with great nutritive values. The sweet caramel-like flavor of dates make them a popular dry fruit worldwide. Grown in the...",
    category: "Health Benefits",
    author: "Admin",
    date: "Feb 10, 2025",
    image: "https://img.freepik.com/free-photo/networking-media-sharing-icons-graphic-concept_53876-120836.jpg?t=st=1740676371~exp=1740679971~hmac=5c2304876269b66918973c8753676d30dd1420e4e9ae500c6649fa84d5534bba&w=900",
  },
];

export const BlogCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 transition-all duration-200"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 transition-all duration-200"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

const BlogCard = ({ post }: { post: BlogPost }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href + `/${post.id}`, // Use specific URL for the blog post
        });
        console.log('Post shared successfully');
      } catch (error) {
        console.error('Error sharing the post:', error);
      }
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  return (
    <Card className="flex-shrink-0 w-full md:w-[400px] overflow-hidden snap-center transform transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative h-48 overflow-hidden transition-opacity duration-500 opacity-0 animate-fadeIn">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">{post.author}</span>
            <span>{post.date}</span>
          </div>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold line-clamp-2 hover:text-gray-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" /> Share
          </button>
          <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Read More...
          </button>
        </div>
      </div>
    </Card>
  );
};