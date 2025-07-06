import { getImageById } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImageById(props.id);

  return (
    <div className="flex h-full w-fullmin-w-0">
        <div className="flex-shrink flex justify-center items-center">
        <img
          src={image.url}
          alt="Preview"
          className="object-contain flex-shrink"
        />
        </div>
        <div className="w-48 flex flex-col flex-shrink-0">
            <div className="text-xl font-bold">{image.name}</div>
        </div>
      </div>
   
  );
}
