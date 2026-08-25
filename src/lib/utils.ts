import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Resolves a file in `public/` against the base path the app is served from. */
export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/")
  return `${base}${path.replace(/^\//, "")}`
}
