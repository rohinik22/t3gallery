import { auth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/clerk-sdk-node";
import { clerkClient } from "@clerk/nextjs/server";

import { db } from "@vercel/postgres";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { ratelimit } from "~/server/ratelimit";

const f = createUploadthing();

const clerk = await clerkClient();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 40,
    },
  })
    .middleware(async ({ req }) => {
const { userId } = await auth(); 

      if (!userId) throw new UploadThingError("Unauthorized");

      const fullUserData = await clerk.users.getUser(userId);
      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User Does Not Have Upload Permissions");

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new UploadThingError("Ratelimited");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      try {
        await db`
          INSERT INTO t3gallery_image (name, url, "userId")
          VALUES (${file.name}, ${file.ufsUrl}, ${metadata.userId})
        `;
        console.log("DB insert success");
      } catch (error) {
        console.error("DB insert failed:", (error as Error).message);
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
