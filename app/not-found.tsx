import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-lg text-foreground/60 mb-8">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Go Home
      </Link>
    </div>
  );
}
