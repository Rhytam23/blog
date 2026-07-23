import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminNav } from "./admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="text-sm text-foreground/50">
            Welcome back, {session.user?.name || "Admin"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            View Site
          </Link>
          <Link
            href="/admin/posts/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            New Post
          </Link>
        </div>
      </div>

      <AdminNav />

      {children}
    </div>
  );
}
