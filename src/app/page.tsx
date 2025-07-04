import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://fwondivlfr.ufs.sh/f/xBKBguy6vNcXla7jzZfRqmZaVQKswD9vj6WGphnr2zxAuMYO",
  "https://fwondivlfr.ufs.sh/f/xBKBguy6vNcXCsYMA2vCtHIADJbl7UgKkhpX5fr1TcPm204Z",
  "https://fwondivlfr.ufs.sh/f/xBKBguy6vNcXzLM65DqFXsghTtYSQULR8k0Zrd2O7xnlwGIu",
  "https://fwondivlfr.ufs.sh/f/xBKBguy6vNcXGG9kLbQ2Hrg3GD6dTxFCBiue5bal0JWtq9jh"
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  
  const posts = await db.query.posts.findMany();

  console.log(posts);


  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post)=>(
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
  <div key={`${image.id}-${index}`} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
      Hello (gallery in progress)
    </main>
  );
}
