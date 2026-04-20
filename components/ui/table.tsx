import type { HTMLAttributes, PropsWithChildren, TableHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Table = ({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto">
    <table className={cn("w-full border-separate border-spacing-0 text-sm", className)} {...props} />
  </div>
);

type ElementProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export const THead = ({ className, ...props }: ElementProps) => (
  <thead className={cn("[&_th]:bg-slate-50 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-medium [&_th]:text-slate-600", className)} {...props} />
);

export const TBody = ({ className, ...props }: ElementProps) => (
  <tbody
    className={cn(
      "[&_td]:border-t [&_td]:border-slate-100 [&_td]:px-4 [&_td]:py-3 [&_td]:text-slate-700",
      className
    )}
    {...props}
  />
);
