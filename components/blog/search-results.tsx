"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "./post-card";
import { Reveal } from "@/components/animations/reveal";

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
    <div className="mx-auto max-w-3xl px-4 py-20 sm:py-32">
      <Reveal>
        <h1 className="font-heading text-5xl sm:text-6xl font-medium tracking-tighter uppercase mb-12">
          Search
        </h1>
      </Reveal>

      <div className="mb-16">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter entries by keyword..."
          className="w-full border-b border-border/20 bg-transparent py-4 text-sm tracking-wide text-foreground placeholder:text-foreground/20 focus:border-foreground/50 focus:outline-none transition-colors duration-300"
        />
      </div>

      {query && (
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-foreground/45 mb-10">
            Found {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
        </Reveal>
      )}

      <div className="flex flex-col">
        {results.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {results.length === 0 && (
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-foreground/40 text-center py-16">
            No matching entries found.
          </p>
        </Reveal>
      )}
    </div>
  );
}
