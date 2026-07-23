import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "I'm a software engineer who builds web applications, APIs, and distributed systems. Learn more about me and this blog.",
};

export default function AboutPage() {
  return <AboutContent />;
}
