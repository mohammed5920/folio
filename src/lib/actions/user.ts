"use server";

import { env } from "process";
import { cookies } from "next/headers";
import { hash, rejectionMessages, safeCompare } from "../data/user";
import { randomInt } from "crypto";
import { Result } from "../types/util";

export async function readMe() {
  const sessionCookie = (await cookies()).get("mbm")?.value;
  if (!env.MASTER_PASSWORD || !env.MASTER_SALT || !sessionCookie) return false;
  const targetHash = hash(env.MASTER_PASSWORD);
  return safeCompare(sessionCookie, targetHash);
}

export async function challengeMe(pass: string): Promise<Result<true>> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!env.MASTER_PASSWORD || !env.MASTER_SALT)
    return { ok: false, error: "Server Error" };
  const inputHash = hash(pass);
  const targetHash = hash(env.MASTER_PASSWORD);
  const match = safeCompare(inputHash, targetHash);
  if (!match) {
    console.warn(`Incorrect password attempt: ${pass}`);
    return {
      ok: false,
      error: rejectionMessages[randomInt(rejectionMessages.length)],
    };
  }
  (await cookies()).set({
    name: "mbm",
    value: targetHash,
    secure: true,
    httpOnly: true,
    maxAge: 31536000,
    sameSite: "strict",
  });
  console.log(`Correct password attempt - access granted.`);
  return { ok: true, data: true };
}
