import { Modal } from '~/components/modal';
import FullPageImageView from '~/components/full-image-page';

export default function PhotoModalPage({ params }: { params: { id: string } }) {
  const idAsNumber = Number(params.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid id");

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
