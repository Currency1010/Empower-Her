import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FoundersSection from "@/components/FoundersSection";
import ProgramsSection from "@/components/ProgramsSection";
import ImpactSection from "@/components/ImpactSection";
import NewsPreviewSection from "@/components/NewsPreviewSection";
import GalleryPreviewSection from "@/components/GalleryPreviewSection";
import { client } from "@/lib/sanity";

export default async function Index() {
  const news = await client.fetch(
    `*[_type == "news"] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      image,
      content
    }`
  );
  const gallery = await client.fetch(
    `*[_type == "gallery"] | order(_createdAt desc){
      _id,
      title,
      slug,
      image,
      caption
    }`
  );

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FoundersSection />

      <ProgramsSection
        limit={3}
        showViewAllButton
        viewAllHref="/programs"
        viewAllLabel="View More"
      />

      <ImpactSection />

      <NewsPreviewSection news={news} />

      <GalleryPreviewSection gallery={gallery} />
    </main>
  );
  }
