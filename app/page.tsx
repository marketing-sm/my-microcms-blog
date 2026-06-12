import { createClient } from 'microcms-js-sdk';
import Link from 'next/link';

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

type Blog = {
  id: string;
  title: string;
  publishedAt: string;
};

export default async function Home() {
  const data = await client.get({ endpoint: 'blogs' });
  const blogs: Blog[] = data.contents;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* ヘッダー部分 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Tech & Life Blog
            </Link>
          </h1>
          <nav className="flex gap-4 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-900">ホーム</Link>
            <a href="https://microcms.io" target="_blank" rel="noreferrer" className="hover:text-slate-900">microCMS</a>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl mb-4">
            最新の記事一覧
          </h2>
          <p className="text-lg text-slate-500">
            microCMSとVercelで構築した爆速のブログへようこそ。
          </p>
        </div>

        {/* 記事のカード一覧レイアウト */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <time className="text-xs font-semibold text-slate-400 block mb-2">
                  {new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </time>
                <h3 className="text-lg font-bold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <span className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:underline cursor-pointer">
                  記事を読む →
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white border-t border-slate-200 mt-24 py-8 text-center text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Tech & Life Blog. Powered by Next.js & microCMS.</p>
      </footer>
    </div>
  );
}