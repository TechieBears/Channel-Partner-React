import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'

export default function ImageGallery({ images }) {
    return <SlideshowLightbox
        theme="lightbox"
        iconColor="silver"
        thumbnailBorder="silver"
        imgAnimation="fade"
        className='container grid grid-cols-4 gap-2 mx-auto'
        showThumbnails={true}>
        {images?.map((curElem, i) => {
            return (
                <img className='object-contain w-full p-2 rounded-lg h-52 bg-slate-50' src={curElem?.url} alt={curElem.url} key={i} title={curElem.url} />
            )
        })}
    </SlideshowLightbox>
}