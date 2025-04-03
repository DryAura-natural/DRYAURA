import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallerys";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import { Container } from "@/components/ui/container";
import Image from "next/image";

interface ProductPageprops {
  params: { 
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageprops> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedproducts = await getProducts({
    categoryId: product?.categories?.length 
      ? product.categories[0].id 
      : undefined
  });
  return (
    <div className="bg-white max-h-fit">
      <Container>
        <div className="px-5 pt-2">
          <h1 className="text-xl font-bold text-[#3d1d1d]">DRYAURA</h1>
          <h1 className="text-base font-medium text-gray-900 block md:hidden capitalize">
            {product?.name}
          </h1>
        </div>

        <div className="px-2 py-2 sm:px-6 lg:px-8">
          {/* Grid layout for Gallery and Info */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 h-full lg:h-screen">
            {/* Fixed Gallery */}
            <div className=" h-full lg:h-screen">
              <Gallery images={product.images} badges={product.badges[0]} />
            </div>

            {/* Scrollable Info */}
            <div className=" overflow-scroll md:overflow-y-scroll hidden-scrollbar ">
              <Info data={product} />
            </div>
          </div>

          <div className="my-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Related Photos
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4  ">
              {product.productBanner.map((banner, index) => (
                <div
                  key={banner.id}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-lg max-h-[700px]"
                >
                  <Image
                    src={banner.url}
                    alt={`Product Banner ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    loading={index > 1 ? "lazy" : "eager"}
                    quality={85}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <ProductList title="Related items" items={suggestedproducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;


