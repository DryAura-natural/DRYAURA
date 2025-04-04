import Billboard from "@/components/billboard";
import { Container } from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-result";
import Filter from "./components/filter";
import MobileFilters from "./components/mobile-filters";
import Link from "next/link";

import getProducts from "@/actions/get-products";
import { getSizes } from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getCategory from "@/actions/get-category";
import CategoryCard from "@/components/ui/CategoryCard";

export const revalidate = 0;

interface CollectionPageProps {
  params: {
    categoryName: string;
  };
  searchParams: {
    sizeId?: string;
    colorId?: string;
    minPrice?: string;
    maxPrice?: string;
    priceRange?: string;
  };
}

const priceRanges = [
  { id: "0-500", name: "₹0 - ₹500" },
  { id: "500-1000", name: "₹500 - ₹1000" },
  { id: "1000-2000", name: "₹1000 - ₹2000" },
  { id: "2000+", name: "₹2000 and above" },
];

const CollectionPage: React.FC<CollectionPageProps> = async ({
  params,
  searchParams,
}) => {
  // console.log(
  //   "Collection Page Search Params:",
  //   JSON.stringify(searchParams, null, 2)
  // );

  const category = await getCategory(params.categoryName);
  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="max-w-xl text-center">
          <div className="mb-8 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-red-500 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            Oops! Category Vanished
          </h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            The delightful category you're seeking has temporarily escaped our
            shelves. Our culinary explorers are on a mission to track down more
            delicious collections!
          </p>
          <div className="flex justify-center space-x-4 mt-6 opacity-70 hover:opacity-100 transition-all">
            <Link
              href="/collections/all"
              className="text-primary hover:underline text-lg font-semibold"
            >
              Explore All Products →
            </Link>
            <Link
              href="/collections/jumbo-nuts"
              className="text-primary hover:underline text-lg font-semibold"
            >
              Jumbo Nuts Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // console.log(
  //   "Category Details:",
  //   JSON.stringify({
  //     categoryName: params.categoryName,
  //     categoryId: category.id,
  //     categoryBillboard: category.billboard?.label
  //   }, null, 2)
  // );

  const sizes = await getSizes();
  const colors = await getColors();

  // Fetch products with minimal filtering
  const normalizedSearchParams = {
    categoryId: category.id,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    priceRange: searchParams.priceRange,
  };

  const products = await getProducts(normalizedSearchParams);

  // Advanced category filtering with multiple strategies
  const filteredProducts = products.filter(product => {
    // Strategy 1: Exact category ID match
    const exactIdMatch = product.categories.some(cat => cat.id === category.id);
    
    // Strategy 2: Category name match (case-insensitive)
    const categoryNameMatch = product.categories.some(cat => 
      cat.name && 
      cat.name.toLowerCase().trim() === params.categoryName.toLowerCase().trim()
    );

    // Strategy 3: Partial category name match
    const partialCategoryNameMatch = product.categories.some(cat => 
      cat.name && 
      cat.name.toLowerCase().includes(params.categoryName.toLowerCase())
    );

    // Strategy 4: Product name keyword match
    const productNameKeywordMatch = params.categoryName && 
      product.name.toLowerCase().includes(params.categoryName.toLowerCase());

    // Detailed logging for each matching strategy
    // console.log(`🔍 Product Matching Analysis for "${product.name}":`, {
    //   exactIdMatch,
    //   categoryNameMatch,
    //   partialCategoryNameMatch,
    //   productNameKeywordMatch,
    //   productCategories: product.categories.map(cat => ({
    //     categoryId: cat.id,
    //     categoryName: cat.name || 'Unnamed Category'
    //   })),
    //   requestedCategory: {
    //     id: category.id,
    //     name: params.categoryName
    //   }
    // });

    // Combine matching strategies
    return exactIdMatch || 
           categoryNameMatch || 
           partialCategoryNameMatch || 
           productNameKeywordMatch;
  });

  // Comprehensive logging of filtering results
  console.log('🔍 Category Filtering Detailed Results:', {
    requestedCategory: {
      id: category.id,
      name: params.categoryName
    },
    totalProductsCount: products.length,
    filteredProductsCount: filteredProducts.length,
    filterStrategies: {
      exactIdMatching: filteredProducts.filter(p => 
        p.categories.some(cat => cat.id === category.id)
      ).length,
      exactNameMatching: filteredProducts.filter(p => 
        p.categories.some(cat => 
          cat.name && 
          cat.name.toLowerCase().trim() === params.categoryName.toLowerCase().trim()
        )
      ).length,
      partialNameMatching: filteredProducts.filter(p => 
        p.categories.some(cat => 
          cat.name && 
          cat.name.toLowerCase().includes(params.categoryName.toLowerCase())
        )
      ).length,
      productNameKeywordMatching: filteredProducts.filter(p => 
        params.categoryName && 
        p.name.toLowerCase().includes(params.categoryName.toLowerCase())
      ).length
    }
  });

  // Use filtered products, with fallback to all products if no match
  const productsToRender = filteredProducts.length > 0 ? filteredProducts : products;

  // Additional logging of final products to render
  // console.log('🔍 Final Products to Render:', JSON.stringify({
  //   requestedCategoryName: params.categoryName,
  //   requestedCategoryId: category.id,
  //   productsCount: productsToRender.length,
  //   productDetails: productsToRender.map(product => ({
  //     id: product.id,
  //     name: product.name,
  //     categories: product.categories.map(cat => ({
  //       categoryId: cat.id,
  //       categoryName: cat.name || 'Unnamed Category'
  //     }))
  //   }))
  // }, null, 2));

  return (
    <div className="bg-white">
      <Container>
        {category.billboard ? (
          <Billboard data={category.billboard} />
        ) : (
          <div className="px-4  pt-4 text-center">
            No billboard available for this category
          </div>
        )}
        <div className="pb-4">
          <CategoryCard />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="flex items-center justify-between">
            <MobileFilters sizes={sizes} />
          </div>
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              {/* <Filter valueKey="colorId" name="Colors" data={colors} /> */}
              <Filter
                valueKey="priceRange"
                name="Price Range"
                data={priceRanges}
              />
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {productsToRender.length === 0 && <NoResults />}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {productsToRender.map((product) => (
                  <ProductCard
                    key={product.id}
                    data={product}
                    variants={product.variants}
                    categories={product.categories}
                    badges={product.badges}
                    
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CollectionPage;
