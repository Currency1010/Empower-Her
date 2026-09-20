"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Eye, Search } from "lucide-react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSurface from "@/components/admin/AdminSurface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";

type GalleryItem = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image: any;
  caption: string;
};

export default function GalleryAdminPage() {
  const [query, setQuery] = useState("");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [viewing, setViewing] = useState<GalleryItem | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "gallery"] | order(_createdAt desc) { _id, title, slug, image, caption }`)
      .then((items) => setGalleryItems(items))
      .catch(() => setGalleryItems([]));
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return galleryItems;
    return galleryItems.filter((item) =>
      `${item.title} ${item.caption}`.toLowerCase().includes(normalized),
    );
  }, [query, galleryItems]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Gallery"
        description="Preview and manage gallery images used on the public site. (UI-only mock data)"
      />

      <AdminSurface
        title="Gallery Items"
        subtitle="Click View to preview the image"
        action={
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gallery..."
              className="pl-9"
            />
          </div>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-44 bg-slate-100">
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
                <p className="text-xs uppercase tracking-wide text-primary/80 font-bold">Gallery</p>
                <h3 className="font-heading text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{item.caption}</p>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-300 bg-white hover:border-primary hover:text-primary"
                    onClick={() => setViewing(item)}
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
          <p className="mt-6 text-sm text-slate-600">No gallery items matched.</p>
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
                <Image
                  src={urlFor(viewing.image).url()}
                  alt={viewing.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-primary font-semibold uppercase tracking-wider text-sm">Gallery</p>
              <h2 className="font-heading text-2xl font-bold text-slate-900 leading-tight">{viewing.title}</h2>
              <p className="text-slate-600 leading-relaxed">{viewing.caption}</p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

