"use server";

import { deleteImage } from "~/server/queries";
import { redirect } from "next/navigation";

export async function deleteImageAction(id: number) {
  await deleteImage(id);
  redirect("/"); // Redirect after successful deletion
}