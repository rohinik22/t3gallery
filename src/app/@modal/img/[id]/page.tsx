import FullPageImageView from '~/components/full-image-page';
import { redirect } from 'next/navigation';

export default async function PhotoPage({ params }: { params: { id: string } }) {
  const idAsNumber = Number(params.id);
  if (Number.isNaN(idAsNumber)) {
    redirect('/');  // or a 404
  }

  return (
    <FullPageImageView id={idAsNumber} />
  );
}
