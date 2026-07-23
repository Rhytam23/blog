import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Blog";
  const description = searchParams.get("description") ?? "";
  const tag = searchParams.get("tag") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#0a0a0a",
          padding: "60px 70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Gradient orbs for visual interest */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "30%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)",
          }}
        />

        {/* Site label */}
        <div
          style={{
            fontSize: "14px",
            color: "#525252",
            marginBottom: "20px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>blog</span>
          {tag && (
            <>
              <span style={{ color: "#333" }}>·</span>
              <span style={{ color: "#6366f1" }}>{tag}</span>
            </>
          )}
        </div>

        {/* Post title */}
        <div
          style={{
            fontSize: title.length > 50 ? "44px" : "56px",
            fontWeight: 700,
            color: "#ededed",
            lineHeight: 1.1,
            maxWidth: "980px",
            marginBottom: "24px",
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: "20px",
              color: "#737373",
              maxWidth: "820px",
              lineHeight: 1.5,
            }}
          >
            {description.length > 140
              ? description.slice(0, 140) + "…"
              : description}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
