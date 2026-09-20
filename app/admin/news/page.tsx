"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Eye, Search } from "lucide-react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSurface from "@/components/admin/AdminSurface";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";

type NewsPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image: any;
  content: string;
};

export default function NewsAdminPage() {
  const [query, setQuery] = useState("");
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [viewing, setViewing] = useState<NewsPost | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "news"] | order(publishedAt desc) { _id, title, slug, publishedAt, image, content }`)
      .then((posts: NewsPost[]) => setNewsPosts(posts))
      .catch(() => setNewsPosts([]));
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return newsPosts;
    return newsPosts.filter((post) =>
      `${post.title} ${post.content} ${new Date(post.publishedAt).toLocaleDateString()}`.toLowerCase().includes(normalized),
    );
  }, [query, newsPosts]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="News Admin"
        description="Manage and preview published news updates. (UI-only mock data)"
      />

      <AdminSurface
        title="Published Stories"
        subtitle="Click View to preview the full article"
        action={
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="pl-9"
            />
          </div>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-44 bg-slate-100">
                <Image
                  src={urlFor(post.image).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <time className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                </div>

                <h3 className="font-heading text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.content?.slice(0, 150) ?? ""}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-300 bg-white hover:border-primary hover:text-primary"
                    onClick={() => setViewing(post)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-primary hover:text-secondary"
                    disabled
                    aria-disabled
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-6 text-sm text-slate-600">No news matched your search.</p>
        ) : null}
      </AdminSurface>

      <Dialog
        open={Boolean(viewing)}
        onOpenChange={(open) => {
          if (!open) setViewing(null);
        }}
      >
        <DialogContent className="max-w-2xl">
          {viewing ? (
            <div className="space-y-4">
              <div className="relative h-56 overflow-hidden rounded-xl bg-slate-100">
                <Image src={urlFor(viewing.image).url()} alt={viewing.title} fill className="object-cover" />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <time className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {new Date(viewing.publishedAt).toLocaleDateString()}
                </time>
              </div>

              <h2 className="font-heading text-2xl font-bold text-slate-900 leading-tight">{viewing.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{viewing.content}</p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
