import { eq } from 'drizzle-orm'; // make sure this import exists
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

export async function getImageById(id: number) {
  const user = auth();
  if(!(await user).userId) throw new Error("Unauthorized");
  const { rows } = await db.query(
    'SELECT * FROM t3gallery_image WHERE id = $1 LIMIT 1',
    [id]
  );

  const image = rows[0];
  if (!image) throw new Error('Image not found');

  if (image.userId !== (await user).userId) {
    throw new Error('Unauthorized to access this image');
  }


  return image;
}