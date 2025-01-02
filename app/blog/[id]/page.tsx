import { client } from "@/libs/microcms";
import styles from "./page.module.css";
import dayjs from "dayjs";

type Props = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  category: {
    name: string;
  };
};

async function getBlogPost(id: string): Promise<Props> {
  const data = await client.get({
    endpoint: `blog/${id}`,
  });
  return data;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(id);

  const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1> {/* タイトルを表示 */}
      <div className={styles.date}>{formattedDate}</div> {/* 日付を表示 */}
      <div className={styles.category}>カテゴリー：{post.category && post.category.name}</div> {/* カテゴリーを表示 */}
      <div className={styles.post} dangerouslySetInnerHTML={{ __html: post.body }} /> {/* 記事本文を表示 */}
    </main>
  );
}

export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: 'blog' });

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}