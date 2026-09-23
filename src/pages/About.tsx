import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authorities } from "../data/authorities";

gsap.registerPlugin(ScrollTrigger);

const aboutHeroImages = [
  { src: "/images/students/cllg.png", className: "slide-campus" },
  { src: "/images/students/class.png", className: "slide-classroom" },
  { src: "/images/students/lib.png", className: "slide-library" }
];

const storyItems = ["Why DC College was established", "Student-centered philosophy", "Academic excellence", "Career preparation", "Practical learning", "Campus culture", "Student development"];

export default function About({ openEnquiry: _openEnquiry }: { openEnquiry: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActiveImage((index) => (index + 1) % aboutHeroImages.length), 4800);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const node = pageRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".cornerstone-section", start: "top 45%", once: true }
      });

      tl.fromTo(".cornerstone-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(".cornerstone-main-image", { clipPath: "inset(100% 0 0 0)", y: 80, scale: 0.96, opacity: 0 }, { clipPath: "inset(0% 0 0 0)", y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=.1")
        .fromTo(".cornerstone-image-2", { x: -70, y: 40, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=.6")
        .fromTo(".cornerstone-image-3", { x: 70, y: -30, scale: 0.94, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, "-=.65")
        .fromTo(".cornerstone-title-line span", { yPercent: 55, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.14, duration: 0.9, ease: "power3.out", immediateRender: false }, "-=.7")
        .fromTo(".cornerstone-copy", { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power3.out" }, "-=.45");

      const infraTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-infrastructure-section", start: "top 74%", once: true }
      });
      infraTl
        .fromTo(".infrastructure-label", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
        .fromTo(".infrastructure-title-line span", { yPercent: 110 }, { yPercent: 0, stagger: 0.13, duration: 0.9, ease: "power3.out" }, "-=.1")
        .fromTo(".infrastructure-copy", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=.45")
        .fromTo(".infrastructure-image-wrap", { clipPath: "inset(100% 0 0 0)", y: 46, opacity: 0 }, { clipPath: "inset(0% 0 0 0)", y: 0, opacity: 1, duration: 1.05, ease: "power3.out" }, "-=.55")
        .fromTo(".infrastructure-link", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.58, ease: "power3.out" }, "-=.45");
      const authoritiesTl = gsap.timeline({
        scrollTrigger: { trigger: ".authorities-section", start: "top 74%", once: true }
      });
      authoritiesTl
        .fromTo(".authorities-eyebrow", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, ease: "power3.out" })
        .fromTo(".authorities-title-line span", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }, "-=.1")
        .fromTo(".authorities-intro", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=.42")
        .fromTo(".authority-entry", { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.78, ease: "power3.out" }, "-=.25")
        .fromTo(".authority-portrait", { clipPath: "inset(100% 0 0 0)", scale: 0.97 }, { clipPath: "inset(0% 0 0 0)", scale: 1, stagger: 0.1, duration: 0.86, ease: "power3.out" }, "-=.85");

      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-final-cta-section", start: "top 78%", once: true }
      });
      ctaTl
        .fromTo(".about-cta-eyebrow", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
        .fromTo(".about-cta-title-line span", { yPercent: 110 }, { yPercent: 0, stagger: 0.13, duration: 0.9, ease: "power3.out" }, "-=.05")
        .fromTo(".about-cta-copy", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.68, ease: "power3.out" }, "-=.42")
        .fromTo(".about-cta-link", { x: 25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.72, ease: "power3.out" }, "-=.4");
    }, node);

    return () => ctx.revert();
  }, []);

  const leadership = authorities.filter((person) => person.group === "Leadership");
  const coordinators = authorities.filter((person) => person.group === "Academic Coordinators");
  const departmentHeads = authorities.filter((person) => person.group === "Department Heads");
  const departmentLabel = (designation: string) => designation.replace("Head, ", "");
  const authorityClass = (name: string) => `authority-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  const goToEnquiries = () => navigate("/#enquiries");

  return <div className="page" ref={pageRef}>
    <section className="hero about-hero">
      <div className="about-hero-slider" aria-hidden="true">
        {aboutHeroImages.map((image, index) => <div className={`about-hero-slide ${image.className} ${activeImage === index ? "is-active" : ""}`} key={image.src}>
          <img className="about-hero-image" src={image.src} alt="" />
        </div>)}
      </div>
      <div className="about-hero-content"><p className="about-hero-eyebrow">About DC College</p><h1 className="about-hero-title">SHAPING MINDS<br />BUILDING FUTURES</h1><p className="about-hero-description">Empowering students through knowledge, opportunity, confidence and meaningful learning experiences.</p><div className="about-hero-accent" /></div>
    </section>
    <section className="cornerstone-section">
      <div className="cornerstone-inner">
        <div className="cornerstone-collage" aria-label="DC College cornerstone moments">
          <img className="cornerstone-photo cornerstone-main-image" src="/images/students/c2.png" alt="Students at DC College" />
          <img className="cornerstone-photo cornerstone-image-2" src="/images/students/c1.png" alt="DC College classroom learning" />
          <img className="cornerstone-photo cornerstone-image-3" src="/images/students/c3.png" alt="DC College campus activity" />
        </div>
        <div className="cornerstone-content">
          <p className="cornerstone-label cornerstone-eyebrow">Our Cornerstone</p>
          <h2 className="cornerstone-heading cornerstone-title">
            <span className="cornerstone-title-line"><span>Purpose at the heart</span></span>
            <span className="cornerstone-title-line"><span>of education.</span></span>
          </h2>
          <div className="cornerstone-copy">
            <p>DC College is built on the belief that education should prepare students not only for examinations, but also for life, careers and opportunities beyond the classroom. Through strong academics, practical exposure, career guidance and an encouraging campus environment, we help students discover their potential and confidently move toward their future.</p>
            <p>Our focus is to create knowledgeable, skilled and responsible graduates who are prepared to contribute meaningfully to industry and society.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="our-story-section">
      <img className="our-story-image" src="/images/students/our_story.png" alt="DC College building at night" />
      <div className="our-story-overlay" />
      <div className="our-story-content">
        <p className="our-story-label">Our Story</p>
        <span className="our-story-gold-line" />
        <h2 className="our-story-title">A journey built around<br />education, opportunity<br />and student success.</h2>
        <div className="our-story-list">{storyItems.map((item, i) => <p key={item} className="our-story-item"><span className="story-number">0{i + 1}</span><span className="story-item-title">{item}</span></p>)}</div>
      </div>
    </section>
    <section className="about-infrastructure-section">
      <div className="about-infrastructure-inner">
        <div className="infrastructure-content">
          <p className="infrastructure-label"><span />Infrastructure</p>
          <h2 className="infrastructure-title">
            <span className="infrastructure-title-line"><span>Spaces designed for</span></span>
            <span className="infrastructure-title-line"><span>learning, growth</span></span>
            <span className="infrastructure-title-line"><span>and campus life.</span></span>
          </h2>
          <p className="infrastructure-copy">Purposeful spaces shape meaningful learning. From classrooms and labs to sports, dining and student life, every environment at DC is designed to support progress.</p>
          <div className="infrastructure-links">
            <Link className="infrastructure-link" to="/about/infrastructure/academic"><span>01</span><strong>Academic Infrastructure</strong><i /><ArrowRight size={18} /></Link>
            <Link className="infrastructure-link" to="/about/infrastructure/non-academic"><span>02</span><strong>Non-Academic Infrastructure</strong><i /><ArrowRight size={18} /></Link>
          </div>
        </div>
        <figure className="infrastructure-visual">
          <div className="infrastructure-image-wrap">
            <img className="infrastructure-image" src="/images/students/infra.png" alt="DC College infrastructure environment" loading="lazy" />
          </div>
          <figcaption>DC College<br />Academic &amp; Campus Environments</figcaption>
        </figure>
      </div>
    </section>
    <section className="authorities-section">
      <div className="authorities-inner">
        <header className="authorities-header">
          <p className="authorities-eyebrow">Authorities <span /></p>
          <h2 className="authorities-title">
            <span className="authorities-title-line"><span>Leadership that keeps academics</span></span>
            <span className="authorities-title-line"><span>personal and purposeful.</span></span>
          </h2>
          <p className="authorities-intro">Guided by experience, academic integrity and a shared commitment to student success.</p>
        </header>
        <div className="authorities-group authorities-leadership">
          <p className="group-title">Leadership</p>
          <div className="leadership-grid authorities-leadership-grid">
            {leadership.map((person, index) => <article className={`authority-card authority-entry leadership-card leadership-entry ${authorityClass(person.name)}`} key={person.name}>
              <p className="authority-kicker">{String(index + 1).padStart(2, "0")} &mdash; {person.designation}</p>
              <div className="authority-image authority-portrait">
                <img src={person.image} alt={person.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </div>
              <h3 className="authority-name">{person.name}</h3>
              <span className="authority-accent authority-gold-line" />
              <p className="authority-role authority-designation">{person.designation} <ArrowRight size={13} /></p>
            </article>)}
          </div>
        </div>
        <div className="authorities-group authorities-coordinators">
          <p className="group-title">Academic Coordinators</p>
          <div className="coordinator-grid authorities-coordinator-grid">
            {coordinators.map((person, index) => <article className={`authority-card authority-entry coordinator-card coordinator-entry ${authorityClass(person.name)}`} key={person.name}>
              <p className="authority-kicker">{String(index + 1).padStart(2, "0")} &mdash; Academic Coordinator</p>
              <div className="authority-image authority-portrait">
                <img src={person.image} alt={person.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </div>
              <h3 className="authority-name">{person.name}</h3>
              <span className="authority-accent authority-gold-line" />
              <p className="authority-role authority-designation">{person.designation} <ArrowRight size={13} /></p>
            </article>)}
          </div>
        </div>
        <div className="authorities-group authorities-departments">
          <p className="group-title">Department Heads</p>
          <div className="department-grid authorities-department-grid">
            {departmentHeads.map((person, index) => <article className={`authority-card authority-entry department-card department-entry ${authorityClass(person.name)}`} key={person.name}>
              <p className="authority-kicker department-label">{String(index + 1).padStart(2, "0")} &mdash; {departmentLabel(person.designation)}</p>
              <div className="authority-image authority-portrait">
                <img src={person.image} alt={person.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </div>
              <h3 className="authority-name">{person.name}</h3>
              <span className="authority-accent authority-gold-line" />
              <p className="authority-role authority-designation">{person.designation.replace("Head, ", "")} <ArrowRight size={13} /></p>
            </article>)}
          </div>
        </div>
      </div>
    </section>
    <section className="about-final-cta-section">
      <div className="about-final-cta-inner">
        <div className="about-cta-copy-block">
          <p className="about-cta-eyebrow">Your Next Step <span /></p>
          <h2 className="about-cta-title">
            <span className="about-cta-title-line"><span>Begin a focused academic</span></span>
            <span className="about-cta-title-line"><span>journey at DC College.</span></span>
          </h2>
          <p className="about-cta-copy">Explore programs, understand admissions and take the next step with confidence.</p>
        </div>
        <div className="about-cta-action">
          <span>10 &mdash; Enquiries</span>
          <button type="button" className="about-cta-link" onClick={goToEnquiries}>Enquire Now <ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  </div>;
}
