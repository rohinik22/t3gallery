import { clerkClient } from "@clerk/clerk-sdk-node";
import { getImageById } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImageById(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  console.log("Uploader full info =>", JSON.stringify(uploaderInfo, null, 2));

  const name =
    uploaderInfo.username ??
    uploaderInfo.emailAddresses?.[0]?.emailAddress ??
    "Unknown User";

  return (
    <div className="pt-10 flex min-h-screen bg-black text-white">
      {/* Left: Image */}
  <div className="flex-1">
  <img
    src={image.url}
    alt={image.name}
    className="w-full h-auto max-h-screen object-contain"

  />
</div>

      {/* Right: Info panel */}
      <div className="w-48 border-l border-white p-2 flex flex-col justify-start">
       <div className="text-lg font-semibold mb-2 -mx-2 border-b border-white pb-1 text-center">
  {image.name}
</div>
        <div className="text-sm text-gray-300 p-2">
        <span>Uploaded by:</span>
  <div className="text-white">{name}</div>
</div>
        <div className="text-sm text-gray-300 p-2">
          <span>Created On:</span>
          <div className="text-white">{new Date(image.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}
