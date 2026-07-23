import { getPublishedPosts } from "@/lib/blog";
import { HomeContent } from "@/components/home-content";

export default function Home() {
  const posts = getPublishedPosts().slice(0, 5);
  return <HomeContent posts={posts} />;
}
