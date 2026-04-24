export default function ProductImageGallery({ images, mainImage, setMainImage, title }: any) {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <img src={mainImage} alt={title} className="h-96 w-full object-cover" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((img: string) => (
          <button
            key={img}
            onClick={() => setMainImage(img)}
            className={`overflow-hidden rounded-xl border-2 transition-all ${
              mainImage === img ? "border-zinc-900 dark:border-zinc-100" : "border-transparent"
            }`}
          >
            <img src={img} alt="Thumbnail" className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}