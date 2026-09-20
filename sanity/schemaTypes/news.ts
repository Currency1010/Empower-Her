import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),

    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    }),

    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "video",
      title: "Featured Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 8,
    }),
  ],
});