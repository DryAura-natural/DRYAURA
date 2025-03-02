// BlogPostPage.tsx
import Image from "next/image";
import { BlogPost, blogPosts } from "@/constants/blogs";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === Number(params.id));

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground animate-fadeIn">
        Post not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Image Section */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] mb-8 overflow-hidden rounded-xl shadow-lg animate-fadeIn">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            unoptimized // Remove if next.config.js is configured
          />
        </div>

        {/* Content Section */}
        <div className="space-y-6 animate-slideUp">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-muted-foreground mb-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <span className="mt-2 sm:mt-0 px-3 py-1 bg-muted rounded-full text-xs md:text-sm">
              {post.category}
            </span>
          </div>

          {/* Prose Content */}
          <div className="prose prose-md sm:prose-lg max-w-none text-foreground">
            <p className="text-lg leading-relaxed">{post.excerpt}</p>
            <div className="mt-6 space-y-4">
              {post.fullContent?.split("\n").map((paragraph, index) =>
                paragraph.trim() ? (
                  <p key={index} className="leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}