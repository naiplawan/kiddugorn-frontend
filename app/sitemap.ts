import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiddugorn.com'

  // Static pages
  const staticPages = [
    '',
    '/create',
    '/pricing',
    '/aboutus',
    '/privacy',
    '/login',
    '/register',
  ]

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page === '' ? 1 : page === '/create' ? 0.9 : 0.7,
  }))

  // Note: Dynamic event pages would need to be fetched from the database
  // For now, we'll just include the static pages
  // In production, you would fetch all public event IDs and add them here

  return staticRoutes
}
