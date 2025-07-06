import { getImageById } from "~/server/queries";

export default async function PhotoModal(props: {
  params: { id: string };
}) {
  const { id: photoId } = await Promise.resolve(props.params);

  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImageById(idAsNumber);

  return (
    <div>
      <img src={image.url} className="w-96" />
    </div>
  );
}
