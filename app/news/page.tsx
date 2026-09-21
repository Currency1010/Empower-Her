import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";

import { Calendar, ArrowRight, Search } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SubPageHero from "@/components/SubPageHero";
import newsBg from "@/assets/newsbg.jpeg";

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

async function getNews() {
  return await client.fetch(`
    *[_type == "news"] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      image,
      content
    }
  `);
}

export default async function NewsPage() {
  const news: NewsItem[] = await getNews();

  return (
    <main>
      <SubPageHero
        title="News & Stories"
        subtitle="Stay updated on our programs, stories, and community impact."
        image={newsBg}
      />

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatedSection className="mb-14 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4">
              Latest Updates
            </p>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">
              Community Newsroom
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mb-10">
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search coming soon..."
                disabled
                className="w-full pl-11 h-12 bg-white border border-gray-200 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {news.map((post, index) => (
              <AnimatedSection key={post._id} delay={index * 0.1}>
                <article className="bg-gray-50 border border-gray-200 h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden">

                  <div className="relative aspect-[16/10]">
                    <Image
                      src={urlFor(post.image).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-1">

                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <Calendar size={16} />

                      <time>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-6 flex-1">
                      {post.content.length > 150
                        ? post.content.slice(0, 150) + "..."
                        : post.content}
                    </p>

                    <Link
                      href={`/news/v1/${post.slug?.current ?? post._id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary mt-auto"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>

                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}