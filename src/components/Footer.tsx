import { Link } from "react-router-dom";
import { collegeConfig } from "../data/config";

export function Footer({ onEnquire }: { onEnquire: () => void }) {
  return <footer className="site-footer">
    <div className="site-footer-wordmark" aria-hidden="true">DC COLLEGE</div>
    <div className="site-footer-inner">
      <div className="site-footer-brand">
        <h2>DC College</h2>
        <p>Empowering minds with guidance, confidence and career-ready learning.</p>
        <button className="btn btn-primary site-footer-cta" onClick={onEnquire}>Enquire Now</button>
      </div>
      <div className="site-footer-column">
        <h3>College</h3>
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/admission">Admissions</Link>
        <Link to="/placements">Placements</Link>
      </div>
      <div className="site-footer-column">
        <h3>Explore</h3>
        <Link to="/life-at-dc">Life at DC</Link>
        <Link to="/about/infrastructure/academic">Infrastructure</Link>
        <Link to="/about">Authorities</Link>
      </div>
      <div className="site-footer-column">
        <h3>Contact</h3>
        <a href={collegeConfig.phoneHref}>{collegeConfig.phone}</a>
        <a href={`mailto:${collegeConfig.email}`}>{collegeConfig.email}</a>
        <p>{collegeConfig.address}</p>
      </div>
      <div className="site-footer-column site-footer-social">
        <h3>Social</h3>
        <a href={`https://wa.me/${collegeConfig.whatsapp}`}>WhatsApp</a>
        <a href={collegeConfig.instagram}>Instagram</a>
        <a href={collegeConfig.facebook}>Facebook</a>
      </div>
    </div>
  </footer>;
}
