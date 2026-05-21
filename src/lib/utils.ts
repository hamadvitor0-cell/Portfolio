import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function padNumber(value: number) {
  return value.toString().padStart(2, "0");
}

export function isExternalHref(href?: string) {
  return Boolean(href && /^https?:\/\//.test(href));
}
