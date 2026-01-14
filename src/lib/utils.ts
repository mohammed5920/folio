import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: Date) {
  const SECONDS_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const DAYS_PER_MONTH = 30.436875;
  const DAYS_PER_YEAR = 365.2425;

  const now = new Date().getTime();
  const timeDifferenceMs = date.getTime() - now;
  const deltaSeconds = timeDifferenceMs / 1000;

  const cutoffs = [
    SECONDS_PER_MINUTE,
    MINUTES_PER_HOUR * SECONDS_PER_MINUTE,
    HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE,
    DAYS_PER_MONTH * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE,
    DAYS_PER_YEAR * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE,
    Infinity,
  ];

  const units = ["second", "minute", "hour", "day", "month", "year"];

  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );
  const unit = units[unitIndex];
  const value = Math.floor(deltaSeconds / (cutoffs[unitIndex - 1] || 1));

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit);
}

export function stringToHSL(str: string) {
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    total += str.charCodeAt(i);
  }
  const hue = Math.abs(total % 360);
  return `hsl(${hue}, 100%, 75%)`;
}
