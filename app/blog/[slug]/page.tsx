import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts, getRelatedPosts } from "@/lib/blog";
import { PostHeader } from "@/components/blog/post-header";
import { MdxContent } from "@/components/blog/mdx-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { RelatedPosts } from "@/components/blog/related-posts";
import {
  ArticleReveal,
  ArticleContent,
  ArticleRelated,
} from "@/components/blog/article-reveal";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`;
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        url: `/blog/${post.slug}`,
        tags: post.tags,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const related = getRelatedPosts(post.slug, post.tags, 3);

  return (
    <ArticleReveal>
      <PostHeader post={post} />

      <ArticleContent>
        <aside className="hidden lg:block">
          <TableOfContents content={post.content} />
        </aside>
        <div>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MdxContent source={post.content} />
          </div>
        </div>
      </ArticleContent>

      {related.length > 0 && (
        <ArticleRelated>
          <RelatedPosts posts={related} />
        </ArticleRelated>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              "@type": "Person",
              // TODO: Replace with your actual name if different
              name: "Rhytam",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `/blog/${post.slug}`,
            },
          }),
        }}
      />
    </ArticleReveal>
  );
}
