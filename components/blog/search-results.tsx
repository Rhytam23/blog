"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "./post-card";

interface SearchResultsProps {
  posts: PostMeta[];
}

export function SearchResults({ posts }: SearchResultsProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
      }),
    [posts]
  );

  const results = query ? fuse.search(query).map((r) => r.item) : posts;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Search</h1>

      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {query && (
        <p className="text-sm text-foreground/40 mb-6">
          {results.length} result{results.length !== 1 ? "s" : ""}
        </p>
      )}

      <div className="flex flex-col gap-1">
        {results.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
