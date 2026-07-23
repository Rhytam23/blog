import { prisma } from "@/lib/prisma";

export default async function AdminAnalytics() {
  let totalViews = 0;
  let totalLikes = 0;
  let postStats: {
    slug: string;
    title: string;
    views: number;
    likes: number;
  }[] = [];
  let dbConnected = false;

  try {
    dbConnected = true;

    const viewAgg = await prisma.view.groupBy({
      by: ["postId"],
      _count: { id: true },
    });
    totalViews = viewAgg.reduce((sum, v) => sum + v._count.id, 0);

    const likeAgg = await prisma.like.groupBy({
      by: ["postId"],
      _count: { id: true },
    });
    totalLikes = likeAgg.reduce((sum, l) => sum + l._count.id, 0);

    const posts = await prisma.post.findMany({
      select: { id: true, slug: true, title: true },
    });

    const viewCounts = new Map(
      viewAgg.map((v) => [v.postId, v._count.id])
    );
    const likeCounts = new Map(
      likeAgg.map((l) => [l.postId, l._count.id])
    );

    postStats = posts
      .map((post) => ({
        slug: post.slug,
        title: post.title,
        views: viewCounts.get(post.id) || 0,
        likes: likeCounts.get(post.id) || 0,
      }))
      .sort((a, b) => b.views - a.views);
  } catch {
    dbConnected = false;
  }

  if (!dbConnected) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Analytics</h2>
        <div className="rounded-lg border border-border p-6">
          <p className="text-sm text-foreground/50">
            Connect to PostgreSQL and deploy to start tracking views and likes.
          </p>
          <p className="text-xs text-foreground/30 mt-2">
            Set <code className="rounded bg-muted px-1.5 py-0.5">DATABASE_URL</code> in
            your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Analytics</h2>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="rounded-lg border border-border p-6">
          <p className="text-sm text-foreground/50">Total Views</p>
          <p className="text-3xl font-bold mt-1">{totalViews.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border p-6">
          <p className="text-sm text-foreground/50">Total Likes</p>
          <p className="text-3xl font-bold mt-1">{totalLikes.toLocaleString()}</p>
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-3">Per-Post Stats</h3>
      <div className="rounded-lg border border-border">
        {postStats.length === 0 ? (
          <p className="p-4 text-sm text-foreground/40">No posts yet.</p>
        ) : (
          postStats.map((stat, i) => (
            <div
              key={stat.slug}
              className={`flex items-center justify-between p-4 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{stat.title}</p>
                <p className="text-xs text-foreground/40 mt-0.5">
                  /blog/{stat.slug}
                </p>
              </div>
              <div className="flex items-center gap-4 ml-4 text-sm">
                <span className="text-foreground/50">
                  {stat.views} view{stat.views !== 1 ? "s" : ""}
                </span>
                <span className="text-foreground/50">
                  {stat.likes} like{stat.likes !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
