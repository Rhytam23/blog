import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've built — web apps, APIs, component libraries, and developer tools.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
