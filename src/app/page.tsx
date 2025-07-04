import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";
import Image from "next/image";



export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  console.log("Fetched images:", images); // ✅ Add this

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image) => {
        console.log("Image URL:", image.url); // ✅ Now inside a block

        return (
          <div key={image.id} className="flex w-48 flex-col">
            <Image
              src={image.url}
              alt={image.name}
              width={192}
              height={192}
              className="object-contain"
            />
            <div>{image.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}