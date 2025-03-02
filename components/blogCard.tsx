"use client";
import { useRef } from "react";
import { Card } from "./ui/card";
import { Share2 } from "lucide-react"; // Removed unused Chevron imports
import Image from "next/image";
import Link from "next/link";

import { BlogPost, blogPosts } from '@/constants/blogs';  
export const BlogCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
          url: window.location.href + `/${post.id}`,
        });
        console.log("Post shared successfully");
      } catch (error) {
        console.error("Error sharing the post:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <Card className="flex-shrink-0 w-full md:w-[400px] overflow-hidden snap-center transform transition-all duration-300 hover:shadow-xl ">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={192}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          // For external URLs without domain config
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
          <button
            className="flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-1" /> Share
          </button>
          <Link href={`/blog/${post.id}`} className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Read More...
          </Link>
        </div>
      </div>
    </Card>
  );
};