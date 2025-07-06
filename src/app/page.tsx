import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";
import Image from "next/image";



export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  console.log("Fetched images:", images); 

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {[...images, ...images, ...images, ...images, ...images].map((image) => {
        console.log("Image URL:", image.url); 

        return (
          <div key={image.id} className="flex w-48 flex-col">
            <Link href={`/img/${image.id}`} scroll={false}>
            <Image
              src={image.url}
              alt={image.name}
              width={192}
              height={192}
              className="object-contain"
              priority
            /></Link>
            <div>{image.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="pt-24">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}