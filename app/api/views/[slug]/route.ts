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
      return NextResponse.json({ views: 0 });
    }

    const count = await prisma.view.count({
      where: { postId: post.id },
    });

    return NextResponse.json({ views: count });
  } catch {
    return NextResponse.json({ views: 0 });
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
    const ip = forwarded?.split(",")[0] || "unknown";
    const sessionId = ip.slice(0, 100);

    const existing = await prisma.view.findFirst({
      where: { postId: post.id, sessionId },
      select: { id: true },
    });

    if (!existing) {
      await prisma.view.create({
        data: { postId: post.id, sessionId },
      });
    }

    const count = await prisma.view.count({
      where: { postId: post.id },
    });

    return NextResponse.json({ views: count });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
