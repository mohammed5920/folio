import { readMe } from "@/lib/actions/user";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

async function authMiddleware() {
  const user = await readMe();
  if (!user) throw new UploadThingError("Unauthorized");
  return { user };
}

export const mixedFileRouter = {
  mixedFileTypeUploader: f({
    blob: { maxFileSize: "64MB", maxFileCount: 1 },
  })
    .middleware(authMiddleware)
    .onUploadError((e) => console.log(e))
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`File [${file.name}] upload complete.`);
    }),
} satisfies FileRouter;

export type mixedFileRouter = typeof mixedFileRouter;
