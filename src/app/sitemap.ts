import type { MetadataRoute } from 'next';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = new URL('https://seu-dominio.vercel.app');
  const routes = ['', '/relatorios', '/configuracoes'];
  return routes.map((r) => ({
    url: new URL(r || '/', base).toString(),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.7,
  }));
}
