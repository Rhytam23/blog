import type { Metadata } from "next";
import { UsesContent } from "@/components/uses-content";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The software, hardware, and tools I use on a daily basis for development, design, and productivity.",
};

export default function UsesPage() {
  return <UsesContent />;
}
