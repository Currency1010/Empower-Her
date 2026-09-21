import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

type GalleryItem = {
  _id: string;
  title: string;
  caption?: string;
  image?: unknown;
};

const GALLERY_QUERY = `*[_type == "gallery"] | order(_createdAt desc) {
  _id, title, caption, image
}`;

export default async function GalleryPage() {
  const {data} = await sanityFetch({query: GALLERY_QUERY});
  const gallery = data as GalleryItem[];

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
          Community moments
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Gallery</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Explore the people, programs, and moments shaping our work.
        </p>

        {gallery.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-600">
            No gallery items have been published yet.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <article key={item._id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
                {item.image ? (
                  <Image
                    src={urlFor(item.image).width(900).height(600).fit("crop").url()}
                    alt={item.title}
                    width={900}
                    height={600}
                    className="aspect-[3/2] w-full object-cover"
                  />
                ) : null}
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  {item.caption ? <p className="mt-2 text-zinc-600">{item.caption}</p> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
