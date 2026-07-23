"use client";

import dynamic from "next/dynamic";

// Three.js Canvas must only run on the client. This client wrapper
// holds the dynamic import with ssr:false, which is illegal in Server Components
// but perfectly valid here as a Client Component.
const WebGLCanvas = dynamic(
  () =>
    import("@/components/webgl-background").then((m) => ({
      default: m.WebGLBackground,
    })),
  { ssr: false }
);

export function WebGLBackgroundWrapper() {
  return <WebGLCanvas />;
}
