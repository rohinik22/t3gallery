export default async function PhotoModal(props: {
  params: { id: string };
}) {
  const { id: photoId } = await Promise.resolve(props.params);

  return (
    <div className="p-4 text-white">
      Photo ID: {photoId}
    </div>
  );
}