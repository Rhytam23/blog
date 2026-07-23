import { cn } from "@/lib/utils";
import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react";

type CalloutType = "info" | "warning" | "error" | "success";

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  info: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-yellow-500/30 bg-yellow-500/5 text-yellow-700 dark:text-yellow-400",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400",
  },
  success: {
    icon: CheckCircle,
    className:
      "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400",
  },
};

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-none border p-4 text-sm",
        config.className
      )}
    >
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="flex-1 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
