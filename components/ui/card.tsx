import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn("rounded-2xl border border-slate-200 bg-white shadow-subtle", className)}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }: CardProps) => (
  <div className={cn("border-b border-slate-100 p-5", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: CardProps) => (
  <h3 className={cn("text-base font-semibold text-slate-900", className)} {...props} />
);

export const CardContent = ({ className, ...props }: CardProps) => (
  <div className={cn("p-5", className)} {...props} />
);
