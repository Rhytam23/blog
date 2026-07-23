import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./settings-form";

export default async function AdminSettings() {
  let settings: Record<string, string> = {};
  let dbConnected = false;

  try {
    const rows = await prisma.setting.findMany();
    settings = Object.fromEntries(rows.map((s) => [s.key, s.value]));
    dbConnected = true;
  } catch {
    dbConnected = false;
  }

  if (!dbConnected) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <div className="rounded-lg border border-border p-6">
          <p className="text-sm text-foreground/50">
            Connect to PostgreSQL to manage settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <SettingsForm
        initialTitle={settings.siteTitle || "Blog"}
        initialDescription={
          settings.siteDescription || "A personal blog about code, design, and engineering."
        }
      />
    </div>
  );
}
