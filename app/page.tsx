import { CreativeGallerySection } from "@/app/components/CreativeGallerySection";
import { CreativeHero } from "@/app/components/CreativeHero";
import { CreativeMiddleSection } from "@/app/components/CreativeMiddleSection";
import { CreativeShowcaseSection } from "@/app/components/CreativeShowcaseSection";
import { TrustedPortfolioSection } from "@/app/components/TrustedPortfolioSection";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildPageMetadata,
  buildWebPageSchema,
  buildWebsiteSchema,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  category: "marketing",
  description:
    "Bangalore digital marketing agency for performance marketing, custom web development, technical SEO, and creative management that helps ambitious brands grow.",
  keywords: [
    "digital marketing agency",
    "digital marketing agency Bangalore",
    "performance marketing agency Bangalore",
    "web development agency Bangalore",
    "creative agency Bangalore",
    "technical SEO agency",
    "creative management services",
  ],
  path: "/",
  title: "Bangalore Digital Marketing Agency for Performance, Web & Creative",
});

const homePageStructuredData = [
  buildOrganizationSchema(),
  buildWebsiteSchema(),
  buildBreadcrumbSchema("/", [{ name: "Home", path: "/" }]),
  buildWebPageSchema({
    description:
      "Homepage for Sthyra Digital, a Bangalore digital marketing agency focused on performance marketing, web development, and creative management.",
    name: "Sthyra Digital Homepage",
    path: "/",
  }),
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageStructuredData),
        }}
      />

      <main>
        <CreativeHero />
        <CreativeMiddleSection />
        <TrustedPortfolioSection />
        <CreativeShowcaseSection />
        <CreativeGallerySection />
      </main>
    </>
  );
}
