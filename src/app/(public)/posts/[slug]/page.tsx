import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Cover Image could go here */}
        
        <div className="p-8 md:p-12">
            <header className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{post.title}</h1>
                <div className="flex justify-center items-center gap-2 text-slate-500">
                    <time dateTime={post.createdAt.toISOString()}>
                        {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(post.createdAt)}
                    </time>
                    <span>•</span>
                    <span>{post.author.name}</span>
                </div>
            </header>

            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600">
                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </div>
    </article>
  );
}
