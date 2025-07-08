// import { eq } from 'drizzle-orm'; // make sure this import exists
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@vercel/postgres";
// import { or } from "drizzle-orm";
// import "server-only";

// export async function getMyImages() {

//     const user = auth();
//     if (!user || !(await user).userId) {
//         throw new Error("Unauthorized");
//     }

//   const { rows: images } = await db.query(
//     "SELECT * FROM t3gallery_image WHERE \"userId\" = $1 ORDER BY id DESC",
//     [(await user).userId]
//   );
//   return images;
// }

// export async function getImageById(id: number) {
//   const user = auth();
//   if(!(await user).userId) throw new Error("Unauthorized");
//   const { rows } = await db.query(
//     'SELECT * FROM t3gallery_image WHERE id = $1 LIMIT 1',
//     [id]
//   );

//   const image = rows[0];
//   if (!image) throw new Error('Image not found');

//   if (image.userId !== (await user).userId) {
//     throw new Error('Unauthorized to access this image');
//   }


//   return image;
// }

// export async function deleteImage(id: number){
//   const user = auth();
//   if(!(await user).userId) throw new Error("Unauthorized");
//   const { rows } = await db.query(
//     'SELECT * FROM t3gallery_image WHERE id = $1 LIMIT 1',
//     [id]
//   );

//   const image = rows[0];
//   if (!image) throw new Error('Image not found');

//   if (image.userId !== (await user).userId) {
//     throw new Error('Unauthorized to access this image');
//   }

//   await db.query(
//     'DELETE FROM t3gallery_image WHERE id = $1',
//     [id]
//   );
// }


import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db"; // <-- your drizzle `db` instance
import { images } from "~/server/db/schema"; // <-- drizzle table definition
import "server-only";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import analyticsServerClient from "./analytics";

export async function getMyImages() {
  const user = await auth();
  if (!user?.userId) {
    throw new Error("Unauthorized");
  }

  const myImages = await db
    .select()
    .from(images)
    .where(eq(images.userId, user.userId))
    .orderBy(images.id);

  return myImages;
}

export async function getImageById(id: number) {
  const user = await auth();
  if (!user?.userId) throw new Error("Unauthorized");

  const [image] = await db
    .select()
    .from(images)
    .where(eq(images.id, id));

  if (!image) throw new Error("Image not found");
  if (image.userId !== user.userId) {
    throw new Error("Unauthorized to access this image");
  }

  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user?.userId) throw new Error("Unauthorized");


  await db
    .delete(images)
    .where(eq(images.id, id));

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "delete_image",
      properties: {
        imageId: id,
      }
    })

  revalidatePath("/");
  redirect("/");
}
