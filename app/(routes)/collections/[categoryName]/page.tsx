import Billboard from "@/components/billboard";
import { Container } from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-result";
import Filter from "./components/filter";

import getProducts from "@/actions/get-products";
import { getSizes } from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getCategory from "@/actions/get-category";

export const revalidate = 0;

interface CollectionPageProps {
  params: {
    categoryName: string;
  };
  searchParams: {
    colorId?: string;
    sizeId?: string;
  };
}

const CollectionPage: React.FC<CollectionPageProps> = async ({
  params,
  searchParams,
}) => {
  const category = await getCategory(params.categoryName);
  if (!category) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
        <p>The category you are looking for does not exist.</p>
      </div>
    );
  }

  const products = await getProducts({
    categoryName: params.categoryName,
    categoryId: category.id,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();

  return (
    <div className="bg-white">
      <Container>
        {category && category.billboard ? (
          <Billboard data={category.billboard} />
        ) : (
          <div className="p-4 text-center text-gray-500">
            No billboard available for this category
          </div>
        )}

        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              {/* <Filter 
                valueKey="colorId" 
                name="Colors" 
                data={colors} 
              /> */}
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    data={product}
                    variants={product.variants}
                    categories={product.categories}
                    badges={product.badges}
                    productBanner={product.productBanner}
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
