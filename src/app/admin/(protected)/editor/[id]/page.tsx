import { prisma } from '@/lib/prisma';
import PostEditor from '@/components/admin/PostEditor';
import { savePost } from '@/lib/post-actions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorPage({ params }: PageProps) {
  const { id } = await params;
  
  let post = null;

  if (id !== 'new') {
    post = await prisma.post.findUnique({
       where: { id }
    });
  }

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4">{id === 'new' ? 'New Post' : 'Edit Post'}</h1>
      <form action={savePost} className="h-full">
         <PostEditor post={post} />
      </form>
    </div>
  );
}
