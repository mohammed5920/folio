import { createRouteHandler } from "uploadthing/next";
import { mixedFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: mixedFileRouter,
});
