import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import AutoScrollLogos from "@/components/autoScrollLogo";
import BannerCrusel from "@/components/banner_crusel";
import OfferBanner from "@/components/bannerOffer";
import { BlogCarousel } from "@/components/blogCard";
import ComboProduct from "@/components/comboProducts";
import Description from "@/components/description";
import StoreLocator from "@/components/dryfruit_stats";
import { HeroSection } from "@/components/hero-section";
import ImageCarousel from "@/components/ImageCarousel";
import DryfruitPhoto from "@/components/Photos";
import {Poster} from "@/components/poster";
import ProductList from "@/components/product-list";
import ShopByPurpose from "@/components/ShopByPurpose";
import CategoryCard from "@/components/ui/CategoryCard";
// import CategoryDisplay from "@/components/ui/CategoryDisplay";
import { Container } from "@/components/ui/container";
import PremiumNutsBanner from "@/components/ui/NutsBanner";
import { OfferCarousel } from "@/components/ui/offerCrousel";

import VideoPlayer from "@/components/ui/VideoPlayer";

export const revalidate = 0;

const HomePage = async () => {
//   ## The Importance of Dry Fruits in a Healthy Diet

// In today’s health-conscious world, dry fruits have become a staple in many diets, offering a convenient and nutritious snack option.

  const descriptionText = `

## About Dryaura

Dryaura stands out as a leading name in the dry fruit industry, committed to providing high-quality products that cater to the diverse needs of consumers. With a focus on sustainability, innovation, and customer satisfaction, Dryaura is not just a brand; it’s a lifestyle choice for those who prioritize health and wellness.

## Our Commitment to Quality

At Dryaura, quality is paramount. The company sources its dry fruits from trusted farmers who practice sustainable agriculture. This commitment ensures that every product is not only delicious but also environmentally friendly. Dryaura’s rigorous quality control processes guarantee that each batch of dry fruits meets the highest standards of freshness, taste, and nutritional value.

## Our Product Range

Dryaura boasts an extensive range of dry fruits, each with unique flavors and health benefits. Here are some of the most popular types available:

- **Almonds**: Rich in vitamin E, healthy fats, and protein.
- **Cashews**: High in magnesium and antioxidants.
- **Walnuts**: Packed with omega-3 fatty acids for heart and brain health.
- **Pistachios**: A great source of protein, fiber, and potassium.
- **Dried Apricots**: Rich in potassium and vitamin A for hydration and eye health.
- **Raisins**: High in iron and antioxidants for digestion and energy.
- **Dried Figs**: A great source of calcium and magnesium for bone health.
- **Dates**: Naturally sweet and nutrient-dense, high in fiber and potassium.
- **Dried Mango**: Rich in vitamin C and antioxidants for immune and skin health.
- **Prunes**: Known for their digestive benefits and high fiber content.

## Health Benefits of Dry Fruits

Incorporating dry fruits into your diet can offer numerous health benefits:

- **Nutrient-Dense**: Concentrated sources of vitamins, minerals, and antioxidants.
- **Heart Health**: Rich in healthy fats and antioxidants that support cardiovascular health.
- **Digestive Health**: High fiber content aids digestion and maintains a healthy gut.
- **Weight Management**: Satisfying snacks that help curb cravings.
- **Bone Health**: Rich in calcium and magnesium for strong bones.
- **Energy Boost**: Natural sugars provide a quick energy boost.

## Why Choose Dryaura?

When it comes to selecting a provider for dry fruits, Dryaura stands out for several reasons:

1. **Quality Assurance**: Every product is carefully sourced and tested to ensure freshness and taste.
2. **Sustainability**: By partnering with farmers who practice sustainable agriculture, Dryaura promotes environmentally friendly practices that benefit both consumers and the planet.
3. **Diverse Product Range**: With a wide variety of dry fruits available, Dryaura caters to different tastes and dietary needs, ensuring there’s something for everyone.
4. **Customer-Centric Approach**: Dryaura prioritizes customer satisfaction, offering excellent support and a seamless shopping experience through its user-friendly website.
5. **Educational Resources**: Dryaura provides valuable information about the health benefits of dry fruits, helping customers make informed choices about their nutrition.

## Conclusion

Dryaura is more than just a brand; it represents a commitment to quality, sustainability, and health. By choosing Dryaura, you are not only indulging in delicious dry fruits but also supporting a company that values the well-being of its customers and the environment. Experience the difference with Dryaura and elevate your snacking habits today!
`;
  // const billboard = await getBillboard("ceef521d-e446-4a0f-82b0-a0f48be35877");
  const products = await getProducts({ });

  return (
    <div className="font border-l">
      <Container>
        <div className="  ">
          {/* <VideoBillboard/> */}
          <div className="flex flex-col lg:flex-col-reverse">
            <CategoryCard />

            <HeroSection />
          </div>

          <div className="flex flex-col gap-y-8 px-1 sm:px-6 lg:px-8 py-5">
            <ProductList title="Top selling Products" items={products} />
          </div>
          <div className="">
            {/* <OfferCarousel /> */}
            <OfferCarousel />
          </div>

          {/* <div className="py-10">
            <OfferBanner />
          </div> */}
          <div className="max-h-full">
            <StoreLocator />
          </div>

          <div className="md:px-4 px-2">
            <PremiumNutsBanner />
          </div>
          <ShopByPurpose />
          <div className=" md:px-5 py-2">
            {" "}
            <Poster
              billboardId={`${process.env.NEXT_POSTER_BILLBOARD_ID}`}
            />
          </div>
          <div className="flex flex-col gap-y-8  px-2 lg:px-0  py-2">
            <ComboProduct items={products} />
          </div>
          <div className="md:p-10 p-2">
            <ImageCarousel />
          </div>

          <div className=" max-w-full">
            <DryfruitPhoto />
          </div>

          <div className="md:p-10 p-2">
            <section className="container mx-auto px-4  lg:my-14">
              <h1 className="text-3xl md:text-3xl font-bold text-center mb-6">
                Our Recent Blogs
              </h1>
              <BlogCarousel />
            </section>
          </div>

          <div className="">
            <Description text={descriptionText} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
