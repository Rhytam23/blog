import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const postsDirectory = path.join(process.cwd(), "content", "posts");

const frontmatterSchema = z.object({
  title: z.string().min(5).max(300),
  date: z.string(),
  description: z.string().min(20).max(500),
  tags: z.array(z.string()).min(1).max(10),
  cover: z.string().optional(),
  featured: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
  featured: boolean;
  readingTime: number;
  wordCount: number;
}

export interface Post extends PostMeta {
  content: string;
}

function getPostsSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostsSlugs();
  const posts = slugs
    .map((slug) => {
      try {
        return getPostBySlug(slug);
      } catch {
        return null;
      }
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      description: p.description,
      tags: p.tags,
      cover: p.cover,
      featured: p.featured,
      readingTime: p.readingTime,
      wordCount: p.wordCount,
    }));
  return posts;
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, slug, "index.mdx");
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const parsed = frontmatterSchema.parse(data);
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    slug,
    ...parsed,
    date: parsed.date,
    content,
    readingTime,
    wordCount,
  };
}

export function getPublishedPosts(): PostMeta[] {
  return getAllPosts();
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function searchPosts(query: string): PostMeta[] {
  const posts = getAllPosts();
  const lowerQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
