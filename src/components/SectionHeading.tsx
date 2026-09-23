export function SectionHeading({ label, title, text, light = false }: { label: string; title: string; text?: string; light?: boolean }) {
  return <div className="mb-12 max-w-3xl"><p className="eyebrow">{label}</p><h2 className={`h2 mt-3 ${light ? "text-white" : "text-navy"}`}>{title}</h2>{text && <p className={`mt-5 text-lg leading-8 ${light ? "text-white/70" : "text-navy/68"}`}>{text}</p>}</div>;
}
