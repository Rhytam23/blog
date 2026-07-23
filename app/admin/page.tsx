import { getPublishedPosts } from "@/lib/blog";

export default function AdminDashboard() {
  const posts = getPublishedPosts();

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-lg border border-border p-6">
          <p className="text-sm text-foreground/50">Total Posts</p>
          <p className="text-3xl font-bold mt-1">{posts.length}</p>
        </div>
        <div className="rounded-lg border border-border p-6">
          <p className="text-sm text-foreground/50">Total Words</p>
          <p className="text-3xl font-bold mt-1">
            {posts.reduce((sum, p) => sum + p.wordCount, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-border p-6">
          <p className="text-sm text-foreground/50">Total Reading Time</p>
          <p className="text-3xl font-bold mt-1">
            {posts.reduce((sum, p) => sum + p.readingTime, 0)} min
          </p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
      <div className="rounded-lg border border-border">
        {posts.slice(0, 10).map((post, i) => (
          <div
            key={post.slug}
            className={`flex items-center justify-between p-4 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-xs text-foreground/40 mt-0.5">
                {post.date} · {post.readingTime} min · {post.tags.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
