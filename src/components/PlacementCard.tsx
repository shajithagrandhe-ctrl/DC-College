import type { Placement } from "../data/placements";

export function PlacementCard({ placement }: { placement: Placement }) {
  return <article className="fine-card reveal overflow-hidden bg-white/65">
    <div className="visual h-64 min-h-0" data-label={placement.name.split(" ")[0]}><img className="image-cover opacity-0" src={placement.image} alt={placement.name} onError={(e)=>{e.currentTarget.style.display="none";}} /></div>
    <div className="p-6"><p className="text-sm font-bold uppercase tracking-[.18em] text-gold">{placement.course} / {placement.year}</p><h3 className="mt-2 text-2xl font-bold text-navy">{placement.name}</h3><div className="mt-5 border-t border-navy/10 pt-5"><p className="font-bold">{placement.company}</p><p className="text-navy/65">{placement.role}</p><p className="mt-3 text-xl font-black text-navy">{placement.package}</p></div></div>
  </article>;
}
