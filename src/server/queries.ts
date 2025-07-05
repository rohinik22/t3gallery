import { auth } from "@clerk/nextjs/server";
import { db } from "@vercel/postgres";
import { or } from "drizzle-orm";
import "server-only";

export async function getMyImages() {

    const user = auth();
    if (!user || !(await user).userId) {
        throw new Error("Unauthorized");
    }

  const { rows: images } = await db.query(
    "SELECT * FROM t3gallery_image WHERE \"userId\" = $1 ORDER BY id DESC",
    [(await user).userId]
  );
  return images;
}