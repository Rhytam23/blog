import { getPublishedPosts } from "@/lib/blog";
import Link from "next/link";

export default function AdminPosts() {
  const posts = getPublishedPosts();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">All Posts</h2>
      <div className="rounded-lg border border-border">
        {posts.map((post, i) => (
          <div
            key={post.slug}
            className={`flex items-center justify-between p-4 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{post.title}</p>
              <p className="text-xs text-foreground/40 mt-0.5">
                /blog/{post.slug} · {post.date}
              </p>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-600 dark:text-green-400">
                Published
              </span>
              <Link
                href={`/admin/posts/edit/${post.slug}`}
                className="text-xs text-foreground/40 hover:text-foreground transition-colors"
              >
                Edit
              </Link>
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-foreground/40 hover:text-foreground transition-colors"
              >
                View
              </Link>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="p-4 text-sm text-foreground/40">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
