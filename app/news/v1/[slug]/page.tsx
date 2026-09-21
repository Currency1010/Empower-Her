import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import BackLink from "@/components/BackLink";

async function getNews(slug: string) {
  return await client.fetch(
    `
    *[_type == "news" && (slug.current == $slug || _id == $slug)][0]{
      _id,
      title,
      slug,
      publishedAt,
      image,
      content
    }
    `,
    { slug }
  );
}

export default async function NewsDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getNews(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <article className="bg-white border border-gray-200 shadow-sm">

            <div className="relative aspect-[16/10]">
              <Image
                src={urlFor(post.image).url()}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="p-8">

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                <Calendar size={16} />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString()}
                </time>
              </div>

              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              <div className="mt-10">
                <BackLink label="Back to News" />
              </div>

            </div>

          </article>

        </div>
      </section>
    </main>
  );
}