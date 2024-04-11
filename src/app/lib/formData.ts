export const get = (formData: FormData, name: string, fallback = "") =>
  (formData.get(name) || fallback) as string
