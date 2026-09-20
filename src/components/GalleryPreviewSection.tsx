import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/image";

interface GalleryItem {
  _id: string;
  title: string;
  image: any;
  caption: string;
  slug: {
    current: string;
  };
}

interface Props {
  gallery: GalleryItem[];
}

const GalleryPreviewSection = ({ gallery }: Props) => {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <p className="text-secondary font-body font-bold tracking-widest uppercase text-sm">
              Our Impact in Action
            </p>
            <div className="h-px w-12 bg-secondary" />
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Visual <span className="text-primary">Gallery</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {gallery.map((item, index) => (
            <AnimatedSection key={item._id} delay={index * 0.15}>
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
                  <h3 className="text-gray-900 font-heading font-bold text-lg leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-2">
                    {item.caption}
                  </p>

                  <span className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors uppercase text-sm mt-auto">
                    View More
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link href="/gallery">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-8 py-6 font-bold tracking-wide uppercase text-sm"
            >
              View Full Gallery
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GalleryPreviewSection;