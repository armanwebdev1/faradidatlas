import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getBlogPosts = cache(async function getBlogPosts(locale: string = 'en') {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'blog-posts',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
    depth: 0,
    select: {
      id: true,
      title: true,
      slug: true,
      author: true,
      excerpt: true,
      content: true,
      featuredImage: true,
      tags: true,
      publishedAt: true,
    },
  })

  return posts.docs
})

export const getBlogPostBySlug = cache(async function getBlogPostBySlug(
  slug: string,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'blog-posts',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    select: {
      id: true,
      title: true,
      slug: true,
      author: true,
      excerpt: true,
      content: true,
      featuredImage: true,
      tags: true,
      publishedAt: true,
    },
  })

  return posts.docs[0] || null
})
