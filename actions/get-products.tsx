import { Product } from "@/types";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  categoryName?: string;
  minPrice?: string;
  maxPrice?: string;
  priceRange?: string;
}

interface ProductResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    pageSize: number;
  };
}

const getProducts = async (query: Query): Promise<Product[]> => { 
  // Comprehensive logging of initial query
  console.log('🔍 DETAILED Query Received:', JSON.stringify({
    categoryId: query.categoryId,
    categoryName: query.categoryName,
    colorId: query.colorId,
    sizeId: query.sizeId,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice
  }, null, 2));

  // Enhanced category filtering parameters
  const categoryFilters: {
    categoryId?: string;
    categoryName?: string;
    categoryKeywords?: string[];
  } = {};

  // Strategy 1: Direct Category ID Matching
  if (query.categoryId) {
    categoryFilters.categoryId = query.categoryId;
  }

  // Strategy 2: Category Name Matching
  if (query.categoryName) {
    // Extract keywords from category name
    const categoryNameKeywords = query.categoryName
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2); // Ignore very short words

    categoryFilters.categoryName = query.categoryName;
    categoryFilters.categoryKeywords = categoryNameKeywords;

    console.log('🔍 Category Name Parsing:', {
      originalCategoryName: query.categoryName,
      extractedKeywords: categoryNameKeywords
    });
  }

  // Enhanced price range processing
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  // Detailed logging of initial price parameters
  console.log('🔍 Initial Price Parameters:', {
    queryMinPrice: query.minPrice,
    queryMaxPrice: query.maxPrice,
    queryPriceRange: query.priceRange
  });

  // Process price range with more comprehensive handling
  if (query.priceRange) {
    console.log('Processing price range:', query.priceRange);
    switch (query.priceRange) {
      case '0-50':
        minPrice = 0;
        maxPrice = 50;
        break;
      case '50-100':
        minPrice = 50;
        maxPrice = 100;
        break;
      case '100-200':
        minPrice = 100;
        maxPrice = 200;
        break;
      case '200+':
        minPrice = 200;
        maxPrice = undefined; // No upper limit
        break;
      default:
        console.warn(`⚠️ Unrecognized price range: ${query.priceRange}`);
    }
  }

  // Override with explicit min/max prices if provided
  if (query.minPrice !== undefined) {
    minPrice = Number(query.minPrice);
  }
  if (query.maxPrice !== undefined) {
    maxPrice = Number(query.maxPrice);
  }

  // Comprehensive logging of processed price range
  console.log('🔍 Processed Price Range:', {
    finalMinPrice: minPrice,
    finalMaxPrice: maxPrice,
    originalPriceRange: query.priceRange,
    originalMinPrice: query.minPrice,
    originalMaxPrice: query.maxPrice
  });

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      // Advanced category filtering
      ...(categoryFilters.categoryId && { categoryId: categoryFilters.categoryId }),
      ...(categoryFilters.categoryName && { categoryName: categoryFilters.categoryName }),
      ...(categoryFilters.categoryKeywords && { 
        categoryKeywords: categoryFilters.categoryKeywords.join(',') 
      }),
      
      // Other filters
      colorId: query.colorId,
      sizeId: query.sizeId,
      
      // Careful handling of price parameters
      ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
      ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
      
      // Add flag to include full category details
      includeFullCategories: true
    }
  }, { 
    skipNull: true,
    skipEmptyString: true
  });

  // Log the final constructed URL
  console.log('🔍 Final API Request URL:', url);

  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Failed to fetch products:', errorText);
      throw new Error(`Failed to fetch products: ${errorText}`);
    }

    const data: ProductResponse = await res.json();
    
    // Advanced client-side filtering as a fallback
    const filteredProducts = data.products.filter(product => {
      // Strategy 1: Exact Category ID Match using categories.category.id
      const exactIdMatch = categoryFilters.categoryId 
        ? product.categories.some(cat => 
            cat.category && cat.category.id === categoryFilters.categoryId
          )
        : true

      // Strategy 2: Category Name Match
      const categoryNameMatch = categoryFilters.categoryName
        ? product.categories.some(cat => 
            cat.category && 
            cat.category.name && 
            cat.category.name.toLowerCase().includes(
              (categoryFilters.categoryName || '').toLowerCase()
            )
          )
        : true;

      // Strategy 3: Keyword Matching
      const keywordMatch = categoryFilters.categoryKeywords
        ? categoryFilters.categoryKeywords.some(keyword => 
            keyword ? 
            product.name.toLowerCase().includes(keyword.toLowerCase()) 
            : false
          )
        : true;

      // Detailed logging of matching process
      console.log(`🔍 Product Matching Details for "${product.name}":`, {
        exactIdMatch,
        categoryNameMatch,
        keywordMatch,
        categoryFilters: {
          categoryId: categoryFilters.categoryId,
          categoryName: categoryFilters.categoryName,
          categoryKeywords: categoryFilters.categoryKeywords
        },
        productCategories: product.categories.map(cat => ({
          categoryId: cat.category?.id,
          categoryName: cat.category?.name || 'Unnamed Category'
        }))
      });

      return exactIdMatch && (categoryNameMatch || keywordMatch);
    });

    // Logging of filtering results
    console.log('🔍 Product Filtering Results:', {
      totalProductsReceived: data.products.length,
      filteredProductsCount: filteredProducts.length,
      filterCriteria: categoryFilters
    });

    return filteredProducts;
  } catch (error) {
    console.error('❌ Error in getProducts:', error);
    return [];
  }
};

export default getProducts;