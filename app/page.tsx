// app/page.tsx
import { client } from '@/libs/client';
import Link from 'next/link';

// microCMSのデータ型定義（カスタムフィールドに合わせて調整してください）
type Blog = {
  id: string;
  title: string;
  publishedAt: string;
};

export default async function Home() {
  // microCMSから「blogs」というエンドポイントのデータを取得
  const data = await client.get({ endpoint: 'blogs' });
  const blogs: Blog[] = data.contents;

  return (
    <main style={{ padding: '20px' }}>
      <h1>記事一覧</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} style={{ margin: '10px 0' }}>
            <Link href={`/blog/${blog.id}`}>
              {blog.title}
            </Link>
            <span style={{ marginLeft: '10px', color: '#666' }}>
              ({new Date(blog.publishedAt).toLocaleDateString()})
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}