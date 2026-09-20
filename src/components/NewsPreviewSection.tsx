import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import { Calendar, ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/image";

interface NewsItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  image: any;
  content: string;
}

interface Props {
  news: NewsItem[];
}

const NewsPreviewSection = ({ news }: Props) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <p className="text-secondary font-body font-bold tracking-widest uppercase text-sm">
              Latest Updates
            </p>
            <div className="h-px w-12 bg-secondary" />
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            News & <span className="text-primary">Stories</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {news.slice(0, 3).map((post, index) => (
            <AnimatedSection key={post._id} delay={index * 0.15}>
              <article className="bg-gray-50 border border-gray-200 h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={urlFor(post.image).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:768px) 50vw,100vw"
                  />
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Calendar size={16} />
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-4 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                    {post.content.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content}
                  </p>

                  <Link
                    href={`/news/v1/${post.slug.current}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors mt-auto"
                  >
                    Read More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link href="/news">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-8 py-6 font-bold tracking-wide uppercase text-sm"
            >
              View All News
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NewsPreviewSection;