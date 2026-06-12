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
  content: string; // 本文（リッチエディタの中身）
};

// 詳細ページのプログラム
export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  // URLから記事のID（[id]の部分）を取得します
  const { id } = await params;

  // microCMSからそのIDの記事を1件だけ取得します
  const blog: Blog = await client.get({
    endpoint: 'blogs',
    contentId: id,
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      

      {/* 記事本文 */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <time className="text-sm font-semibold text-slate-400 block mb-4">
            {new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })}
          </time>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-8 border-b border-slate-100 pb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* microCMSのリッチエディタ（HTML）を綺麗に表示する呪文 */}
          <div 
            className="prose max-w-none text-slate-800 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </article>
      </main>
    </div>
  );
}