import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const filePath = `content/posts/${post.slug}/index.mdx`;

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/posts"
            className="text-sm text-foreground/40 hover:text-foreground transition-colors"
          >
            ← All posts
          </Link>
          <h2 className="text-lg font-semibold mt-1 truncate max-w-xl">
            {post.title}
          </h2>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg border border-border px-4 py-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
        >
          View post →
        </Link>
      </div>

      <div className="space-y-4">
        {/* Post details */}
        <div className="rounded-lg border border-border divide-y divide-border">
          {[
            { label: "Title", value: post.title },
            { label: "Date", value: formatDate(post.date) },
            { label: "Tags", value: post.tags.join(", ") },
            {
              label: "Stats",
              value: `${post.wordCount.toLocaleString()} words · ${post.readingTime} min read`,
            },
            {
              label: "Featured",
              value: post.featured ? "Yes" : "No",
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-4 px-5 py-3.5 text-sm">
              <span className="text-foreground/40 w-20 shrink-0">{label}</span>
              <span className="text-foreground/80">{value}</span>
            </div>
          ))}
        </div>

        {/* File location */}
        <div className="rounded-lg border border-border p-5 space-y-3">
          <p className="text-sm font-medium">Edit this post</p>
          <p className="text-sm text-foreground/50">
            Posts are file-based MDX. To edit this post, open the file in your
            editor:
          </p>
          <code className="block rounded-md bg-muted px-3 py-2 text-sm font-mono text-foreground/70">
            {filePath}
          </code>
          <p className="text-xs text-foreground/40">
            After saving, the post updates automatically in development. For
            production, push your changes and redeploy.
          </p>
        </div>

        {/* Frontmatter template */}
        <div className="rounded-lg border border-border p-5 space-y-3">
          <p className="text-sm font-medium">Current frontmatter</p>
          <pre className="rounded-md bg-muted px-3 py-3 text-sm font-mono text-foreground/70 overflow-x-auto">{`---
title: "${post.title}"
date: "${post.date}"
description: "${post.description}"
tags: [${post.tags.map((t) => `"${t}"`).join(", ")}]
featured: ${post.featured}
---`}</pre>
        </div>
      </div>
    </div>
  );
}
