import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  ["Home", "/"], ["About", "/about"], ["Courses", "/courses"], ["Admission", "/admission"], ["Placements", "/placements"], ["Life at DC", "/life-at-dc"], ["Contact", "/contact"]
];

export function Navbar({ onEnquire }: { onEnquire: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div className="container site-header-inner">
      <Link to="/" className="site-header-brand" aria-label="DC College home"><span className="site-header-mark">DC</span><span>DC College</span></Link>
      <nav className="site-header-nav" aria-label="Main navigation">{links.map(([label, to]) => <NavLink key={to} to={to} end={to === "/"} className="nav-link">{label}</NavLink>)}<button className="btn btn-primary site-header-cta" onClick={onEnquire}>Enquire Now</button></nav>
      <button className="site-menu-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="site-mobile-menu" onClick={() => setOpen(true)}><Menu /></button>
    </div>
    {open && <div id="site-mobile-menu" className="site-mobile-menu">
      <div className="site-mobile-menu-top"><span className="font-display text-2xl">DC College</span><button aria-label="Close menu" className="site-menu-close" onClick={() => setOpen(false)}><X /></button></div>
      <nav className="site-mobile-nav" aria-label="Mobile navigation">{links.map(([label, to]) => <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)} className="site-mobile-link">{label}</NavLink>)}<button className="btn btn-primary site-mobile-cta" onClick={() => { setOpen(false); onEnquire(); }}>Enquire Now</button></nav>
    </div>}
  </header>;
}
