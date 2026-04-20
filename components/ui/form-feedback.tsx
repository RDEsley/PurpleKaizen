import { AlertCircle, CheckCircle2 } from "lucide-react";

import type { FormState } from "@/features/shared/form-state";
import { cn } from "@/lib/utils";

type FormFeedbackProps = {
  state: FormState;
};

export const FormFeedback = ({ state }: FormFeedbackProps) => {
  if (!state.message) {
    return null;
  }

  const success = state.success;

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
        success ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"
      )}
      role={success ? "status" : "alert"}
    >
      {success ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
      <span>{state.message}</span>
    </div>
  );
};
