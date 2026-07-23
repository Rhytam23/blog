"use client";

import { useState } from "react";

interface SettingsFormProps {
  initialTitle: string;
  initialDescription: string;
}

export function SettingsForm({
  initialTitle,
  initialDescription,
}: SettingsFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteTitle: title,
          siteDescription: description,
        }),
      });
      if (res.ok) {
        setSaved(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save settings.");
      }
    } catch {
      setError("Network error. Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-lg border border-border p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Site Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Site Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm"
          rows={3}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
        {saved && (
          <span className="text-sm text-green-600 dark:text-green-400">
            Settings saved.
          </span>
        )}
        {error && (
          <span className="text-sm text-red-600 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
