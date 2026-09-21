import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

type NewsItem = {
  _id: string;
  title: string;
  publishedAt?: string;
  content?: string;
  image?: unknown;
};

const NEWS_QUERY = `*[_type == "news"] | order(publishedAt desc) {
  _id, title, publishedAt, content, image
}`;

export default async function NewsPage() {
  const {data} = await sanityFetch({query: NEWS_QUERY});
  const news = data as NewsItem[];

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
          Latest updates
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">News</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Stories and updates from our programs and communities.
        </p>

        {news.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-600">
            No news items have been published yet.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article key={item._id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
                {item.image ? (
                  <Image
                    src={urlFor(item.image).width(900).height(560).fit("crop").url()}
                    alt={item.title}
                    width={900}
                    height={560}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : null}
                <div className="p-6">
                  {item.publishedAt ? (
                    <time className="text-sm text-zinc-500">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </time>
                  ) : null}
                  <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                  {item.content ? (
                    <p className="mt-3 line-clamp-4 text-zinc-600">{item.content}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
