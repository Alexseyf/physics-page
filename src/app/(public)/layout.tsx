
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur transition-all bg-white/80 border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            A Física é Muito Louca
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-sm font-medium hover:text-blue-600">
              Home
            </Link>
            <Link href="/posts" className="text-sm font-medium hover:text-blue-600">
              Posts
            </Link>

          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Physics Page. Built with Next.js & LaTeX.</p>
      </footer>
    </div>
  );
}
