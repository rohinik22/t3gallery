// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { deleteImage, getImageById } from "~/server/queries";
// import { Button } from "./ui/button";

// export default async function FullPageImageView(props: { id: number }) {
//   const image = await getImageById(props.id);
//   const uploaderInfo = await clerkClient.users.getUser(image.userId);

//   console.log("Uploader full info =>", JSON.stringify(uploaderInfo, null, 2));

//   const name =
//     uploaderInfo.username ??
//     uploaderInfo.emailAddresses?.[0]?.emailAddress ??
//     "Unknown User";

//   return (
//     <div className="pt-10 flex min-h-screen bg-black text-white">
//       {/* Left: Image */}
//   <div className="flex-1">
//   <img
//     src={image.url}
//     alt={image.name}
//     className="w-full h-auto max-h-screen object-contain"

//   />
// </div>

//       {/* Right: Info panel */}
//       <div className="w-48 border-l border-white p-2 flex flex-col justify-start">
//        <div className="text-lg font-semibold mb-2 -mx-2 border-b border-white pb-1 text-center">
//   {image.name}
// </div>
//         <div className="text-sm text-gray-300 p-2">
//         <span>Uploaded by:</span>
//   <div className="text-white">{name}</div>
// </div>
//         <div className="text-sm text-gray-300 p-2">
//           <span>Created On:</span>
//           <div className="text-white">{new Date(image.createdAt).toLocaleDateString()}</div>
//         </div>

//         <div className="text-sm text-gray-300 p-2">
//           <form action={async () =>{
//             "use server";

//             await deleteImage(idAsNumber);
//           }}>
//             <Button type="submit" variant="destructive">Delete</Button>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }
//import { clerkClient } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { redirect } from "next/navigation";

import { Button } from "~/components/ui/button";
import { getImageById } from "~/server/queries";
import { deleteImageAction } from "~/app/actions/delete-image"; // ✅ use server action


export default async function FullPageImageView(props: { id: string }) {
  const idAsNumber = Number(props.id);

  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImageById(idAsNumber);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  const userInfo = await clerkClient.users.getUser(image.userId);

    const name =
    uploaderInfo.username ??
    uploaderInfo.emailAddresses?.[0]?.emailAddress ??
    "Unknown User";

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      <div className="flex-shrink flex-grow">
        <img src={image.url} className="object-contain" alt={image.name} />
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>

        <div className="p-2">
          <div>Uploaded By:</div>
          <div>{name}</div>
        </div>

        <div className="p-2">
          <div>Created On:</div>
          <div>{image.createdAt.toLocaleDateString()}</div>
        </div>

        <div className="p-2">
          {/* <form
            action={async () => {
              "use server";

              await deleteImage(idAsNumber);
              redirect("/");

            }}
          > */}
<form action={deleteImageAction.bind(null, idAsNumber)}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}