export function RevealImage({ src, alt, label, className = "" }: { src: string; alt: string; label: string; className?: string }) {
  return <div className={`visual reveal ${className}`} data-label={label}><img className="image-cover opacity-0" src={src} alt={alt} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>;
}
