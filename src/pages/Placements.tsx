import { ArrowRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { placements, placementStats } from "../data/placements";
import { recruiters } from "../data/recruiters";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "BBA", "BCA", "B.Com", "B.Sc CS"];
const placementImages: Record<string, string> = {
  BBA: "/images/courses/bba.png",
  BCA: "/images/courses/bca.png",
  "B.Com": "/images/courses/bcom.png",
  "B.Sc CS": "/images/courses/b.sc.png"
};
const development = [
  ["01", "CRT Training", "Structured aptitude, reasoning and placement readiness sessions."],
  ["02", "Communication Skills", "Practice confident speaking, professional writing and interview presence."],
  ["03", "Resume Building", "Shape a clear profile for recruiters and first career opportunities."],
  ["04", "Mock Interviews", "Rehearse real interview situations before placement drives."],
  ["05", "Industry Exposure", "Understand workplace expectations through sessions and interactions."],
  ["06", "Internships", "Build early experience through guided professional exposure."]
];
const journey = ["Aptitude Training", "Communication", "Resume Preparation", "Mock Interviews", "Recruiter Drive", "Placement Offer"];
const industry = [
  ["Recruiter Interactions", "Direct exposure to hiring expectations and career pathways.", "/images/students/class2.png"],
  ["Corporate Workshops", "Sessions that connect classroom preparation with workplace skills.", "/images/courses/bba.png"],
  ["Industry Visits", "Experience professional environments beyond the campus.", "/images/students/college.png"],
  ["Internship Opportunities", "Practical work exposure that builds confidence and readiness.", "/images/courses/bca.png"]
];
const testimonials = [
  ["The placement preparation gave me confidence before my first interview.", "Meera Shah", "BBA - Placed at Deloitte"],
  ["CRT sessions and mock interviews helped me understand what recruiters expect.", "Aarav Reddy", "BCA - Placed at Infosys"],
  ["The support made the placement process feel clear and achievable.", "Ishaan Varma", "B.Com - Placed at ICICI Bank"]
];

function RecruiterStrip() {
  return <section className="placement-recruiter-strip">
    <div className="placement-recruiter-inner">
      <h2>Our Recruiting Partners</h2>
      <div className="placement-recruiter-marquee" aria-label="Recruiting partners">
        <div>{recruiters.map((recruiter) => <span className="placement-recruiter-item" key={recruiter.name}>
          <img src={recruiter.logo} alt={recruiter.name} loading="lazy" />
        </span>)}</div>
      </div>
    </div>
  </section>;
}

export default function Placements({ openEnquiry }: { openEnquiry: () => void }) {
  const [filter, setFilter] = useState("All");
  const [voice, setVoice] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLElement>(null);
  const visible = filter === "All" ? placements : placements.filter((p) => p.course === filter);
  const featured = placements[1] || placements[0];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setVoice((current) => (current + 1) % testimonials.length), 10000);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const node = pageRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".placement-hero-image", { scale: 1 }, { scale: 1.025, duration: 8, ease: "power1.out" });
      gsap.fromTo(".placement-hero-title span", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".placement-reveal").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.72, delay: (index % 4) * 0.05, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%" } });
      });
      gsap.utils.toArray<HTMLElement>(".student-placement-card").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 30, clipPath: "inset(14% 0 0 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)", delay: index * 0.06, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%" } });
      });
      gsap.fromTo(".placement-journey-line span", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: ".placement-journey-track", start: "top 84%" } });
    }, node);
    return () => ctx.revert();
  }, []);

  return <div className="placement-page" ref={pageRef}>
    <section className="placement-hero">
      <img className="placement-hero-image" src="/images/students/grad2.png" alt="Students preparing for career opportunities" />
      <div className="placement-hero-overlay" />
      <div className="placement-hero-content">
        <p className="placement-eyebrow">Placements</p>
        <h1 className="placement-hero-title"><span>From campus</span><span>to career.</span></h1>
        <p>Training, mentorship and recruiter connections help students step into professional life with confidence.</p>
        <div className="placement-actions">
          <button type="button" onClick={() => storiesRef.current?.scrollIntoView({ behavior: "smooth" })}>Explore Success Stories <ArrowRight size={15} /></button>
          <button type="button" onClick={openEnquiry}>Talk to Placement Cell</button>
        </div>
      </div>
    </section>

    <section className="placement-metrics-section">
      <div className="placement-metrics">{placementStats.map((stat) => {
        const parts = stat.match(/^((?:Rs\. )?[\d.]+(?:%|\+)?(?: LPA)?) (.+)$/);
        return <article className="placement-reveal" key={stat} aria-label={stat}><strong>{parts?.[1] ?? stat}</strong><span>{parts?.[2] ?? ""}</span></article>;
      })}</div>
    </section>

    <RecruiterStrip />

    <section className="placement-stories-section" ref={storiesRef}>
      <div className="placement-section-head placement-reveal">
        <p className="placement-eyebrow">Student Success Stories</p>
        <h2>Student success stories shaped by preparation.</h2>
        <span>Meet students who turned academic preparation, training and confidence into real career opportunities.</span>
      </div>
      <div className="placement-filters">{filters.map((item) => <button className={filter === item ? "is-active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
      <div className="student-placement-grid">{visible.map((p) => <article className="student-placement-card" key={p.name}>
        <div className="student-photo-wrap">
          <img className="student-photo" src={p.image} alt={p.name} />
          <div className="student-placement-overlay"><span>Placed at</span><strong>{p.company}</strong><em>{p.package}</em></div>
        </div>
        <div className="student-placement-body">
          <p>{p.course} / Class of {p.year}</p>
          <h3>{p.name}</h3>
          <span>Placed at <strong>{p.company}</strong></span>
          <b>{p.package}</b>
          <i>{p.role} <ArrowRight size={14} /></i>
        </div>
      </article>)}</div>
    </section>

    <section className="placement-featured-section">
      <div className="placement-featured-inner">
        <div className="placement-featured-image placement-reveal"><img src={featured.image} alt={featured.name} /></div>
        <div className="placement-featured-copy placement-reveal">
          <p className="placement-eyebrow">Student Story</p>
          <blockquote>"The CRT sessions and mock interviews helped me prepare with confidence."</blockquote>
          <h3>{featured.name}</h3>
          <p>{featured.course} / {featured.company} / {featured.package}</p>
        </div>
      </div>
    </section>

    <section className="placement-development-section">
      <div className="placement-development-inner">
        <div className="placement-reveal"><p className="placement-eyebrow">Career Development</p><h2>We prepare before we place.</h2></div>
        <div>{development.map(([no, title, text]) => <article className="placement-dev-row placement-reveal" key={title}><span>{no}</span><strong>{title}</strong><p>{text}</p><ArrowRight size={16} /></article>)}</div>
      </div>
    </section>

    <section className="placement-journey-section">
      <div className="placement-section-head placement-reveal"><p className="placement-eyebrow">Placement Journey</p><h2>From preparation to recruiter conversations.</h2></div>
      <div className="placement-journey-track"><span className="placement-journey-line"><span /></span>{journey.map((item, index) => <article className="placement-reveal" key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>)}</div>
    </section>

    <section className="placement-industry-section">
      <div className="placement-section-head placement-reveal"><p className="placement-eyebrow">Industry Connections</p><h2>Learning connected to the world of work.</h2></div>
      <div className="placement-industry-grid">{industry.map(([title, text, image]) => <article className="placement-industry-item placement-reveal" key={title}><img src={image} alt={title} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>

    <section className="placement-testimonials-section">
      <div className="placement-testimonial-inner">
        <p className="placement-eyebrow">What Our Students Say</p>
        <blockquote key={voice}>"{testimonials[voice][0]}"</blockquote>
        <p><strong>{testimonials[voice][1]}</strong><span>{testimonials[voice][2]}</span></p>
        <div>{testimonials.map((item, index) => <button key={item[1]} className={index === voice ? "is-active" : ""} aria-pressed={index === voice} onClick={() => setVoice(index)} aria-label={`Show testimonial by ${item[1]}`} />)}</div>
      </div>
    </section>

    <section className="placement-cta-section">
      <div className="placement-cta-panel placement-reveal">
        <p className="placement-eyebrow">Placement Support</p>
        <h2>Ready to prepare for your career?</h2>
        <p>Connect with the placement team for training, recruiter updates and career guidance.</p>
        <div className="placement-actions"><button type="button" onClick={openEnquiry}>Talk to Placement Cell <ArrowRight size={15} /></button><button type="button" onClick={openEnquiry}>Enquire Now</button></div>
      </div>
    </section>
  </div>;
}
