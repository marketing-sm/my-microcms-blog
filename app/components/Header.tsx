import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Tech & Life Blog
          </Link>
        </h1>
        <nav className="flex gap-4 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900">ホーム</Link>
          <Link href="/diagnostic" className="hover:text-blue-600 text-blue-600 font-bold">適職診断</Link>
          <a href="https://microcms.io" target="_blank" rel="noreferrer" className="hover:text-slate-900">microCMS</a>
        </nav>
      </div>
    </header>
  )
}