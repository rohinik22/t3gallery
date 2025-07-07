import FullPageImageView from '~/components/full-image-page';
import {getImageById} from "~/server/queries";
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