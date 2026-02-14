import { CoverHero } from "@/components/layout/CoverHero";
import { BeefBanner } from "@/components/layout/BeefBanner";
import { BeefCutsGrid } from "@/components/beef/BeefCutsGrid";
import { ChefSpotlight } from "@/components/sections/ChefSpotlight";
import { MenuList } from "@/components/menu/MenuList";
import { InfoSection } from "@/components/layout/InfoSection";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/ui/StickyBar";
import { getCategories } from "@/lib/menu";

export default function Home() {
  const categories = getCategories();
  return (
    <>
      <CoverHero />
      <main id="main">
        <BeefBanner />
        <BeefCutsGrid />
        <ChefSpotlight />
        <div id="menu" className="px-4 pb-32">
          {categories.map((cat, index) => (
            <MenuList key={cat.id} category={cat} isFirst={index === 0} />
          ))}
        </div>
        <InfoSection />
        <Footer />
      </main>
      <StickyBar />
    </>
  );
}
