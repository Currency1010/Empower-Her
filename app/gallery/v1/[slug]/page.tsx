import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import BackLink from "@/components/BackLink";

async function getGalleryItem(slug: string) {
  const item = await client.fetch(
    `*[_type == "gallery" && (slug.current == $slug || _id == $slug)][0]{
      _id,
      title,
      slug,
      image,
      caption
    }`,
    { slug }
  );

  console.log(item);

  return item;
}

export default async function GalleryDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = await getGalleryItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <article className="bg-white border border-gray-200 shadow-sm">

            <div className="relative aspect-[16/10]">
              <Image
                src={urlFor(item.image).url()}
                alt={item.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="p-8">

              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-6">
                {item.title}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {item.caption}
              </p>

              <div className="mt-10">
                <BackLink label="Back to Gallery" />
              </div>

            </div>

          </article>

        </div>
      </section>
    </main>
  );
}