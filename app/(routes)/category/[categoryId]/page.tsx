import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import { getSizes } from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import { Container } from "@/components/ui/container";
import Filter from "./components/filter";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import CategoryCard from "@/components/ui/CategoryCard";
import { PriceFilter } from "@/components/ui/price-filter";
import { GridIcon, ListIcon } from "lucide-react";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId?: string;
    sizeId?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popularity';
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  // Fetch products with extended filtering options
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
    minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
    sortBy: searchParams.sortBy,
  });

  // Fetch additional data
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  // Sort products if needed
  const sortedProducts = products.sort((a, b) => {
    switch (searchParams.sortBy) {
      case 'price-asc':
        return parseFloat(a.price.toString()) - parseFloat(b.price.toString());
      case 'price-desc':
        return parseFloat(b.price.toString()) - parseFloat(a.price.toString());
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white">
      <Container>
        {/* Billboard with category information */}
        <Billboard 
          data={category.billboard} 
          title={category.name}
          description={category.description}
        />

        {/* Category Details */}
        <div className="pb-5 px-5"> 
          <CategoryCard 
            name={category.name}
            productCount={products.length}
            averagePrice={
              products.length > 0 
                ? products.reduce((sum, product) => sum + parseFloat(product.price.toString()), 0) / products.length
                : 0
            }
          />
        </div>

        {/* Filtering and Sorting Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Mobile Filters */}
            <MobileFilters 
              sizes={sizes.value} 
              colors={colors}
              priceRange={{
                min: products.length > 0 
                  ? Math.min(...products.map(p => parseFloat(p.price.toString()))) 
                  : 0,
                max: products.length > 0 
                  ? Math.max(...products.map(p => parseFloat(p.price.toString()))) 
                  : 0
              }}
            />

            {/* Desktop Filters */}
            <div className="hidden lg:block space-y-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
              <PriceFilter 
                minPrice={
                  products.length > 0 
                    ? Math.min(...products.map(p => parseFloat(p.price.toString()))) 
                    : 0
                }
                maxPrice={
                  products.length > 0 
                    ? Math.max(...products.map(p => parseFloat(p.price.toString()))) 
                    : 0
                }
              />
            </div>

            {/* Product Grid */}
          {/* Product Grid */}
<div className="mt-6 lg:col-span-4 lg:mt-0 w-full">
  {sortedProducts.length === 0 ? (
    <NoResult />
  ) : (
    <div className="space-y-6">
      {/* Advanced Filtering and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
        {/* Product Count and Pagination Info */}
        <div className="text-sm text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
        </div>

        {/* Sorting and View Options */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <select 
            className="border rounded px-3 py-2 text-sm"
            defaultValue={searchParams.sortBy || 'default'}
          >
            <option value="default">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button 
              className={`p-2 rounded ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <GridIcon />
            </button>
            <button 
              className={`p-2 rounded ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setViewMode('list')}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Product Display */}
      <div 
        className={`
          grid gap-6 
          ${viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1'
          }
        `}
      >
        {sortedProducts.map((item) => (
          <ProductCard 
            key={item.id} 
            data={item} 
            showPriceRange={true}
            viewMode={viewMode}
            className={viewMode === 'list' ? 'w-full' : ''}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / productsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )}
</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
