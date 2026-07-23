import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { SearchResults } from "@/components/blog/search-results";

export const metadata: Metadata = {
  title: "Search",
  description: "Search blog posts.",
};

export default function SearchPage() {
  const posts = getPublishedPosts();
  return <SearchResults posts={posts} />;
}
