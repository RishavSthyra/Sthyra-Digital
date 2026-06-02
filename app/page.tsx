import { CreativeGallerySection } from "@/app/components/CreativeGallerySection";
import { CreativeHero } from "@/app/components/CreativeHero";
import { CreativeMiddleSection } from "@/app/components/CreativeMiddleSection";
import { CreativeShowcaseSection } from "@/app/components/CreativeShowcaseSection";

export default function Home() {
  return (
    <>
      <CreativeHero />
      <CreativeMiddleSection />
      <CreativeShowcaseSection />
      <CreativeGallerySection />
    </>
  );
}
