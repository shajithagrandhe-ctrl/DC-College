import { ArrowUp } from "lucide-react";

export function MoveToTop() {
  return <button className="move-to-top" type="button" aria-label="Move to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    <ArrowUp size={18} strokeWidth={1.5} />
  </button>;
}
