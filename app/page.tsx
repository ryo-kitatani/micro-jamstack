import { client } from "@/libs/microcms";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
};

async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "blog",
    queries: {
      fields: "id,title",
      limit: 5,
    }
  })
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <main>
      <h1>ブログ記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}