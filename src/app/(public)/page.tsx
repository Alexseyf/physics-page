import { prisma } from '@/lib/prisma';
import Link from 'next/link';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
};

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Pesquisas e notas recentes</h1>
        <p className="text-xl text-slate-600">Explorando o universo através de fórmulas e experimentos.</p>
      </div>

      <div className="grid gap-8">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma nota publicada ainda.</p>
        ) : (
          posts.map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <span>{formatDate(post.createdAt)}</span>
                <span>•</span>
                <span>{post.author.name || 'Anonymous'}</span>
              </div>
              <Link href={`/posts/${post.slug}`} className="block group">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-slate-600 mb-4">{post.excerpt}</p>
                )}
              </Link>
              <Link href={`/posts/${post.slug}`} className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1">
                Read more &rarr;
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
