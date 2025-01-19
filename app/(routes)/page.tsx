// import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import AutoScrollLogos from "@/components/autoScrollLogo";
import VideoBillboard from "@/components/background-video";
import BannerCrusel from "@/components/banner_crusel";
import OfferBanner from "@/components/bannerOffer";
import DryFruitStats from "@/components/dryfruit_stats";
import DryfruitPhoto from "@/components/Photos";
import ProductList from "@/components/product-list";
import { Container } from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  // const billboard = await getBillboard("fe5fabe4-ccb8-4879-9d8e-2c11e1987932");
  const products = await getProducts({ isFeatured: true });
  
  return (
    <div className="font border-l">
      <Container>
        <div className="space-y-10 pb-10">
            <VideoBillboard/>
          <div className="max-h-full py-10">
            <OfferBanner/>
          </div>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
          <div className="max-h-full py-10">
            <BannerCrusel/>
          </div>
          <div className="max-h-full">
            <DryFruitStats/>
          </div>
          <div className="max-h-full max-w-full">
            <DryfruitPhoto/>
          </div>
          <div className="max-h-full max-w-full">
            <AutoScrollLogos/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
