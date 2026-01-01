import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function DashboardPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
         <Link href="/admin/editor/new" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
            Create Post
         </Link>
      </div>

      <div className="bg-white rounded shadow p-6">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found. Create one to get started!</p>
        ) : (
          <ul className="divide-y">
            {posts.map(post => (
              <li key={post.id} className="py-4 flex justify-between">
                <div>
                   <h3 className="font-bold text-lg text-gray-900">{post.title}</h3>
                   <span className={`text-sm ${post.published ? 'text-green-600' : 'text-yellow-600'}`}>
                     {post.published ? 'Published' : 'Draft'}
                   </span>
                </div>
                <Link href={`/admin/editor/${post.id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
