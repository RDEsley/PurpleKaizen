export type FormState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialFormState: FormState = {
  success: false,
  message: ""
};
