import FullPageImageView from '~/components/full-image-page';

export default function PhotoPage({ params }: { params: { id: string } }) {
  const idAsNumber = Number(params.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid id");
  
  return <FullPageImageView id={idAsNumber} />;
}
