import {defineField, defineType} from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'content', title: 'Content', type: 'text', rows: 8}),
  ],
})
