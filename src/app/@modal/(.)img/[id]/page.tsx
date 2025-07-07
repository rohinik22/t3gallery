import FullPageImageView from '~/components/full-image-page';

import { getImageById } from "~/server/queries";
import { Modal } from "./modal";
// import FullPageImageView from "../../img/[id]/page"; // ✅ Import the full page image view

export default async function PhotoModal(props: {
  params: { id: string };
}) {
  const { id: photoId } = props.params;

  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("invalid photo id");

  // const image = await getImageById(idAsNumber);
let image = null;
try {
  image = await getImageById(idAsNumber);
} catch (err) {
  return null; // or redirect('/') or show a fallback
}
  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
