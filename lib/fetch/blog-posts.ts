import { getPayloadClient } from '../payload'

export async function getBlogPosts(locale: string = 'en') {
  console.log(`\n[INSTR] getBlogPosts ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'blog-posts',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  console.log(`[INSTR] getBlogPosts EXIT  ${Date.now() - t}ms`)
  return posts.docs
}

export async function getBlogPostBySlug(
  slug: string,
  locale: string = 'en',
) {
  console.log(`\n[INSTR] getBlogPostBySlug("${slug}") ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'blog-posts',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  console.log(`[INSTR] getBlogPostBySlug EXIT  ${Date.now() - t}ms`)
  return posts.docs[0] || null
}
