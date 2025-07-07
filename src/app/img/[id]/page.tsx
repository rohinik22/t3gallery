import FullPageImageView from '~/components/full-image-page';

// export default function PhotoPage({ params }: { params: { id: string } }) {
//   const idAsNumber = Number(params.id);
//   if (Number.isNaN(idAsNumber)) throw new Error("Invalid id");
  
//   return <FullPageImageView id={idAsNumber} />;
// }
import {getImageById} from "~/server/queries";
// import { Modal } from "./modal";
export default async function PhotoModal({
    params:{id:photoId},
}:{params:{id:string};}

){
    const idAsNumber=Number(photoId);
    if (Number.isNaN(idAsNumber)) throw new Error("invalid photo id");
    const image=await getImageById(idAsNumber);
    return (
        <div>
           return <FullPageImageView id={idAsNumber} />;
            {/* <img src={image.url} className="w-96"/> */}
        </div>

    );
}