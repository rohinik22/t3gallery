import Link from "next/link";

const mockUrls = [
  "https://fwondivlfr.ufs.sh/f/xBKBguy6vNcXCsYMA2vCtHIADJbl7UgKkhpX5fr1TcPm204Z",
  "https://fwondivlfr.ufs.sh/f/xBKBguy6vNcXgodp3KZsthHaiYyMG5I0bpkzQefx6DwsSZ2V",
  "https://fwondivlfr.ufs.sh/f/xBKBguy6vNcXzLM65DqFXsghTtYSQULR8k0Zrd2O7xnlwGIu",
  "https://fwondivlfr.ufs.sh/f/xBKBguy6vNcXGG9kLbQ2Hrg3GD6dTxFCBiue5bal0JWtq9jh"
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
      Hello (gallery in progress)
    </main>
  );
}
