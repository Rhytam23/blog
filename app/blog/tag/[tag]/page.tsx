import type { Metadata } from "next";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import Link from "next/link";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({
    tag,
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Tag: ${tag}`,
    description: `Posts tagged with "${tag}".`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-sm text-foreground/40 hover:text-foreground transition-colors"
        >
          &larr; All posts
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Tag: {tag}
        </h1>
        <p className="mt-1 text-foreground/50">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
