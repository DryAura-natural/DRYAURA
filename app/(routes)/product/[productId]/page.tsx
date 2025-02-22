import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallerys";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import { Container } from "@/components/ui/container";

 
interface ProductPageprops {
 
  params: {
    productId: string;
  }

}

const ProductPage: React.FC<ProductPageprops> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedproducts = await getProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="bg-white max-h-fit">
      <Container>
              <h1 className="text-3xl font-bold text-gray-900 block md:hidden ">{product?.name}</h1>
    
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          {/* Grid layout for Gallery and Info */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 h-full lg:h-screen">

          
            {/* Fixed Gallery */}
            <div className=" ">
              <Gallery images={product.images} />
            </div>

            {/* Scrollable Info */}
            <div className="overflow-y-scroll"> 
              <Info data={product} />
            </div>
          </div>

          {/* Related Products */}
          <hr className="my-10 overflow-x-scroll " />
          <ProductList title="Related items" items={suggestedproducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;