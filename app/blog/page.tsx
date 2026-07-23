import type { Metadata } from "next";
import { getPublishedPosts, getAllTags } from "@/lib/blog";
import { BlogContent } from "@/components/blog/blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts about software engineering, design, and technology.",
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const tags = getAllTags();
  return <BlogContent posts={posts} tags={tags} />;
}
