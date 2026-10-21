import { useEffect, useRef, useState } from "react";
import type { ReportImage } from "../data/reports";
import "./ReportGallery.css";

type ReportGalleryProps = {
  images: ReportImage[];
  /** Names the report in the viewer's accessible label. */
  title: string;
};

/** A main image with thumbnails beneath; clicking the image opens it full size. */
export default function ReportGallery({ images, title }: ReportGalleryProps) {
  const [active, setActive] = useState(0);
  const [viewing, setViewing] = useState<number | null>(null);
  const current = images[active];

  return (
    <div className="report-gallery">
      <button
        type="button"
        className="report-gallery__main"
        onClick={() => setViewing(active)}
        aria-label={`Enlarge: ${current.alt}`}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          loading="lazy"
        />
        <span className="report-gallery__zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            <circle cx="10.5" cy="10.5" r="6" />
            <path d="m15 15 5 5M10.5 8v5M8 10.5h5" />
          </svg>
        </span>
      </button>

      {images.length > 1 && (
        <div className="report-gallery__thumbs" role="group" aria-label={`${title} images`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`report-gallery__thumb ${index === active ? "is-active" : ""}`}
              aria-pressed={index === active}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              onClick={() => setActive(index)}
            >
              <img src={image.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {viewing !== null && (
        <Lightbox
          images={images}
          index={viewing}
          title={title}
          onChange={setViewing}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
}

type LightboxProps = {
  images: ReportImage[];
  index: number;
  title: string;
  onChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({ images, index, title, onChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const image = images[index];
  const many = images.length > 1;
  const step = (delta: number) => onChange((index + delta + images.length) % images.length);

  // No close() on cleanup: it fires `close` asynchronously, which under StrictMode's
  // remount would call onClose and dismiss the viewer the moment it opened.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (!many) return;
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
    >
      <figure className="lightbox__figure">
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
        <figcaption>
          {title}
          {many && (
            <span className="lightbox__count">
              {index + 1} / {images.length}
            </span>
          )}
        </figcaption>
      </figure>

      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
      {many && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </dialog>
  );
}
