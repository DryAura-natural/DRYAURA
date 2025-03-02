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
    categoryId: product?.category?.id,
  });

  const relatedPhotos = [
    "https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-3862.jpg?t=st=1740759789~exp=1740763389~hmac=276a61abd49d8c3ecc3d4684465c21bb80d96da46a57f8e703c2a738aedc932e&w=1380",
    "https://img.freepik.com/free-psd/special-offer-black-friday-facebook-cover-banner-template_120329-1057.jpg?t=st=1740759869~exp=1740763469~hmac=db9d92821d5c150e2b2b2efd87d82a5eca14d31c33c4ae962a03359c42a1148d&w=1380",
    "https://img.freepik.com/free-psd/delicious-burger-food-menu-facebook-cover-template_106176-377.jpg?t=st=1740759832~exp=1740763432~hmac=d5f1a236ea2fbdf9c9250c636a7ef9f5d8def85a76d0cc1178acce834f515354&w=1380",
    "https://img.freepik.com/free-psd/back-school-facebook-cover-banner-template_106176-1199.jpg?t=st=1740759843~exp=1740763443~hmac=f862396e960d936210257800fe2acc68046eb857339666927459a39cebd3f1c7&w=1800",
  ];

  return (
    <div className="bg-white max-h-fit">
      <Container>
        <div className="px-5 pt-2">
          <h1 className="text-xl font-bold text-[#3d1d1d]">DRYAURA</h1>
          <h1 className="text-base font-medium text-gray-900 block md:hidden capitalize">
            {product?.name}
          </h1>
        </div>

        <div className="px-4 py-2 sm:px-6 lg:px-8">
          {/* Grid layout for Gallery and Info */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 h-full lg:h-screen">
            {/* Fixed Gallery */}
            <div className=" h-full lg:h-screen">
              <Gallery images={product.images} />
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
              {relatedPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-lg max-h-[700px]"
                >
                  <Image
                    src={photo}
                    alt={`Related Photo ${index + 1}`}
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
