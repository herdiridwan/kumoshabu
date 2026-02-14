import { CoverHero } from "@/components/layout/CoverHero";
import { BeefBanner } from "@/components/layout/BeefBanner";
import { BeefCutsGrid } from "@/components/beef/BeefCutsGrid";
import { SignatureCarousel } from "@/components/sections/SignatureCarousel";
import { MenuSectionsTracker } from "@/components/menu/MenuSectionsTracker";
import { InfoSection } from "@/components/layout/InfoSection";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/ui/StickyBar";

export default function Home() {
  return (
    <>
      <CoverHero />
      <main id="main">
        <BeefBanner />
        <BeefCutsGrid />
        <SignatureCarousel />
        <MenuSectionsTracker />
        <InfoSection />
        <Footer />
      </main>
      <StickyBar />
    </>
  );
}
