import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/blog";

/**
 * GET /api/posts
 * Returns all published posts as JSON (slug, title, date, description, tags,
 * readingTime, wordCount). Useful for external integrations.
 */
export async function GET() {
  const posts = getPublishedPosts();
  return NextResponse.json(posts);
}
