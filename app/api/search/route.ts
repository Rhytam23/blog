import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json([]);
  }

  const posts = getPublishedPosts();
  const lower = query.toLowerCase();
  const results = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lower) ||
      post.description.toLowerCase().includes(lower) ||
      post.tags.some((t) => t.toLowerCase().includes(lower))
  );

  return NextResponse.json(results);
}
