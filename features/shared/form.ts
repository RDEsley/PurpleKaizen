export const formValue = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export const formBoolean = (formData: FormData, key: string) => formData.get(key) === "on";
