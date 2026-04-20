import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const statusClasses: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700",
  inactive: "bg-slate-100 text-slate-600",
  lead: "bg-amber-50 text-amber-700",
  done: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-700"
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: keyof typeof statusClasses;
};

export const Badge = ({ tone = "inactive", className, ...props }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize",
      statusClasses[tone],
      className
    )}
    {...props}
  />
);
