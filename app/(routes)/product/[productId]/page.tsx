import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallerys";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import { Container } from "@/components/ui/container";

interface ProductPageprops {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageprops> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedproducts = await getProducts({
    categoryId: product?.category?.id,
  });
  return (
    <div className="bg-white max-h-fit">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8 ">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 boder border-red-800">
            {/* Gallery */}
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-19 sm:px-0 lg:mt-0">
              {" "}
              <Info data={product} />
            </div>
          </div>

          <hr className="my-10" />
          <ProductList title="Related items" items={suggestedproducts} />
        </div>
      </Container>
    </div>
  );  
};

export default ProductPage;
