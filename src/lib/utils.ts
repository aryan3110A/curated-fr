import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatLongDate = (value: string | Date) => format(new Date(value), "MMMM d, yyyy");

export const formatCompactDate = (value: string | Date) => format(new Date(value), "MMM d, yyyy");

export const stripHtml = (value: string) => value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
