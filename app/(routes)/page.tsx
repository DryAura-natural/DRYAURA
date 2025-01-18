import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import VideoBillboard from "@/components/background-video";
import OfferBanner from "@/components/bannerOffer";
// import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import { Container } from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("f6fce844-c914-43d5-8083-5ff7ecab61da");
  const products = await getProducts({ isFeatured: true });
  
  return (
    <div className="font border-l">
      <Container>
        <div className="space-y-10 pb-10">
          {/* <Billboard data={billboard} /> */}
          <VideoBillboard data={billboard} />
          <div className="max-h-full">
            <OfferBanner/>
          </div>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
