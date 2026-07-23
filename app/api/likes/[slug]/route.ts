import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json({ likes: 0, liked: false });
    }

    const count = await prisma.like.count({
      where: { postId: post.id },
    });

    return NextResponse.json({ likes: count, liked: false });
  } catch {
    return NextResponse.json({ likes: 0, liked: false });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] || "anonymous";
    const sessionId = ip.slice(0, 100);

    const existing = await prisma.like.findFirst({
      where: { postId: post.id, sessionId },
      select: { id: true },
    });

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
    } else {
      await prisma.like.create({
        data: { postId: post.id, sessionId },
      });
    }

    const count = await prisma.like.count({
      where: { postId: post.id },
    });

    return NextResponse.json({ likes: count, liked: !existing });
  } catch {
    return NextResponse.json({ likes: 0, liked: false });
  }
}
