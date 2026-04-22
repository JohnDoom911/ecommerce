"use client";
type ImageGalleryProps = {
    thumbnail: string;
    images: string[];
    title: string;
};
export const ProductImageGallery = ({ thumbnail, images,title}: ImageGalleryProps)=> (
    <div>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:bg-zinc-900">
            <img src={thumbnail}
                 alt={title}
                 className="h-96 w-full object-cover"/>
        </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                    <div 
                        key={idx}
                        className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900">
                <img src={img}
                    alt={`${title} view ${idx + 1}`}
                    className="h-96 w-full object-cover"/>
                </div>
            ))}
        </div>
    </div>
);