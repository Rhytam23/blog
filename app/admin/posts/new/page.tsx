import Link from "next/link";

export default function AdminNewPost() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">New Post</h2>
      <div className="rounded-lg border border-border p-6 space-y-4">
        <p className="text-sm text-foreground/70">
          Posts are written as MDX files in your repository. Here&apos;s how to
          create one:
        </p>

        <div className="space-y-3">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs font-medium text-foreground/50 mb-2">
              1. Create a directory
            </p>
            <code className="text-sm">
              content/posts/your-slug/index.mdx
            </code>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs font-medium text-foreground/50 mb-2">
              2. Add frontmatter
            </p>
            <pre className="text-sm overflow-x-auto">
{`---
title: "Your Post Title"
date: "2025-01-15"
description: "A description between 20 and 500 characters."
tags: ["nextjs", "typescript"]
featured: false
---`}
            </pre>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs font-medium text-foreground/50 mb-2">
              3. Write your content below the frontmatter
            </p>
            <code className="text-sm">
              Use standard Markdown with MDX extensions.
            </code>
          </div>
        </div>

        <p className="text-sm text-foreground/50">
          Push to your repository and deploy. The post will appear on your blog
          automatically.
        </p>

        <Link
          href="/blog"
          className="inline-block text-sm text-foreground/50 transition-colors hover:text-foreground"
        >
          View blog &rarr;
        </Link>
      </div>
    </div>
  );
}
