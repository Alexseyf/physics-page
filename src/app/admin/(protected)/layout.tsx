
import { auth, signOut } from '@/auth';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Physics Admin</h2>
          <p className="text-sm text-gray-400">Welcome, {session?.user?.name || 'User'}</p>
        </div>
        <nav className="mt-4 px-2">
          <Link
            href="/admin/dashboard"
            className="block rounded px-4 py-2 hover:bg-slate-800"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/editor/new"
            className="block rounded px-4 py-2 hover:bg-slate-800"
          >
            New Post
          </Link>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="block w-full text-left rounded px-4 py-2 hover:bg-red-900 text-red-200 mt-4">
              Sign Out
            </button>
          </form>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
