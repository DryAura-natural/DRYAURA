import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import { Container } from "@/components/ui/container";
import { Search } from "lucide-react";

export default async function SearchPage({
  searchParams
}: {
  searchParams: { query?: string }
}) {
  // Fetch products based on search query
  const products = await getProducts({
    categoryName: searchParams.query || '',
  });

  return (
    <Container>
      <div className="py-10 min-h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-6">
          {searchParams.query 
            ? `Search Results for "${searchParams.query}"` 
            : "Search Products"}
        </h1>

        {products.length === 0 && (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 bg-gray-50 rounded-lg p-10">
            <Search className="w-24 h-24 text-gray-300" />
            <h2 className="text-3xl font-semibold text-gray-700">
              No Products Found
            </h2>
            <p className="text-gray-500 max-w-md">
              We couldn't find any products matching your search. 
              Try different keywords or browse our collections.
            </p>
            <div className="flex space-x-4">
              <a 
                href="/" 
                className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Back to Home
              </a>
              <a 
                href="/collections" 
                className="px-6 py-3 border border-black text-black rounded-full hover:bg-gray-100 transition-colors"
              >
                Browse Collections
              </a>
            </div>
          </div>
        )}

        {products.length > 0 && (
          <ProductList 
            title="Search Results" 
            items={products} 
            // scrollable={false}
            limit={10}
            enableCategoryFilter 
          />
        )}
      </div>
    </Container>
  );
}