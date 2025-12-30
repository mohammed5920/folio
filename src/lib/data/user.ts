import { createHash, timingSafeEqual } from "crypto";
import { env } from "process";
import "server-only";

export const rejectionMessages = [
  "Who are you?",
  "Give it another go!",
  "Password was right, but I'm just not in the mood.",
  "You gotta try harder than that!",
  "I don't believe you...",
  "Can you type it again? I missed it.",
  "The real password was the friends we made along the way!",
  "Take a deep breath, and try again.",
  "Password must be entered between 8AM and 10AM GMT",
  "Password was so wildly incorrect, I'm honestly surprised.",
  "Random dice roll failed, access not granted",
  "Verification failed - is your heart in it?",
];

export function hash(val: string) {
  return createHash("sha256")
    .update(val + env.MASTER_SALT)
    .digest("hex");
}

export function safeCompare(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
