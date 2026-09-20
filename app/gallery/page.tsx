import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import SubPageHero from "@/components/SubPageHero";
import { ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";

async function getGallery() {
  return await client.fetch(`
    *[_type == "gallery"] | order(_createdAt desc){
      _id,
      title,
      slug,
      image,
      caption
    }
  `);
}

export default async function GalleryPage() {
  const gallery = await getGallery();

  if (!gallery.length) {
    return (
      <main className="py-24 text-center">
        <h2 className="text-3xl font-bold">No gallery items yet.</h2>
      </main>
    );
  }

  return (
    <main>
      <SubPageHero
        title="Visual Gallery"
        subtitle="See the change we're making in Kaduna State, Northern Nigeria and Africa through education and skills empowerment."
        image={urlFor(gallery[0].image).url()}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatedSection className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              Visual <span className="text-primary">Highlights</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Click any card to view more.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {gallery.map((item: any, index: number) => (
              <AnimatedSection key={item._id} delay={index * 0.1}>
                <Link
                  href={`/gallery/v1/${item.slug.current}`}
                  className="block h-full bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width:768px) 33vw,100vw"
                    />
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="text-gray-900 font-heading font-bold text-lg">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-2">
                      {item.caption}
                    </p>

                    <span className="inline-flex items-center gap-2 text-primary font-semibold uppercase text-sm mt-auto">
                      View More
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}