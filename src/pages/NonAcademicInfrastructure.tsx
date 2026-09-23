import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    src: "/images/students/non2.png",
    alt: "DC College non-academic infrastructure"
  },
  {
    src: "/images/students/non1.png",
    alt: "DC College campus life infrastructure"
  },
  {
    src: "/images/students/non.png",
    alt: "DC College student support infrastructure"
  }
];

const sections = [
  { id: "sports", no: "01", tab: "Sports" },
  { id: "hostel", no: "02", tab: "Hostel" },
  { id: "dining", no: "03", tab: "Dining" },
  { id: "facilities", no: "04", tab: "Facilities" },
  { id: "it-network", no: "05", tab: "IT Network" }
];

const sports = [
  ["Cricket", "/images/students/cricket.png"],
  ["Basketball", "/images/students/basket.png"],
  ["Volleyball", "/images/students/volley.png"],
  ["Indoor Games", "/images/students/caroom.png"],
  ["Outdoor Competitions", "/images/students/run.png"]
];

const hostelImages = ["/images/students/hostel.png", "/images/students/h1.png"];

const galleryItems = [
  ["Sports", "/images/students/sports.png"],
  ["Hostel Life", "/images/students/hostel.png"],
  ["Dining", "/images/students/dining.png"],
  ["Campus Services", "/images/students/our_story.png"],
  ["IT Network", "/images/courses/bca.png"],
  ["Community", "/images/students/c3.png"],
  ["Everyday Campus", "/images/students/cllg.png"]
];

function ExploreGallery() {
  const [active, setActive] = useState(0);
  const slot = (index: number) => {
    const total = galleryItems.length;
    let offset = index - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    if (offset === -2) return "far-left";
    if (offset === -1) return "left";
    if (offset === 0) return "center";
    if (offset === 1) return "right";
    if (offset === 2) return "far-right";
    return "hidden";
  };
  return <section className="infra-gallery-section">
    <div className="infra-gallery-head infra-reveal">
      <div>
        <p className="infra-eyebrow">Explore the Campus</p>
        <h2>Explore the spaces that shape DC College.</h2>
      </div>
      <div className="infra-gallery-controls">
        <button onClick={() => setActive((active - 1 + galleryItems.length) % galleryItems.length)} aria-label="Previous image"><ChevronLeft size={18} /></button>
        <button onClick={() => setActive((active + 1) % galleryItems.length)} aria-label="Next image"><ChevronRight size={18} /></button>
      </div>
    </div>
    <div className="infra-gallery-carousel">
      {galleryItems.map(([label, image], index) => <button className={`infra-gallery-frame ${slot(index)}`} key={label} onClick={() => setActive(index)}>
        <img src={image} alt={`${label} at DC College`} />
        {slot(index) === "center" && <span><strong>{label}</strong><em>DC College / Campus Life</em></span>}
      </button>)}
    </div>
    <p className="infra-gallery-counter">{String(active + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}</p>
  </section>;
}

export default function NonAcademicInfrastructure() {
  const [active, setActive] = useState("sports");
  const [sport, setSport] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".infra-hero-title span", { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.85, ease: "power3.out" });
      gsap.to(".infra-hero-image", { scale: 1.025, ease: "none", scrollTrigger: { trigger: ".infrastructure-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".infra-reveal").forEach((item) => {
        gsap.fromTo(item, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%" } });
      });
      gsap.utils.toArray<HTMLElement>(".infra-collage").forEach((collage) => {
        gsap.fromTo(
          collage.querySelectorAll(".infra-image-reveal"),
          { clipPath: "inset(100% 0 0 0)", y: 34 },
          { clipPath: "inset(0 0 0 0)", y: 0, duration: 1, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: collage, start: "top 84%" } }
        );
      });
      gsap.utils.toArray<HTMLElement>(".infra-single-image-reveal").forEach((item) => {
        gsap.fromTo(item, { clipPath: "inset(100% 0 0 0)", y: 34 }, { clipPath: "inset(0 0 0 0)", y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%" } });
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const jumpTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <div className="infra-page nonacademic-infra-page">
    <section className="infrastructure-hero nonacademic">
      <div className="infra-hero-slider" aria-hidden="true">
        {heroSlides.map((slide, index) => <img className={`infra-hero-image infra-hero-slide ${heroSlide === index ? "is-active" : ""}`} src={slide.src} alt="" key={slide.src} />)}
      </div>
      <div className="infra-hero-overlay" />
      <div className="infra-hero-content">
        <p className="infra-eyebrow">Non-Academic Infrastructure</p>
        <h1 className="infra-hero-title"><span>Beyond the</span><span>classroom.</span></h1>
        <p>Spaces that support wellbeing, community, recreation and everyday campus life.</p>
      </div>
      <div className="infra-hero-dots" aria-label="Non-academic infrastructure hero slides">
        {heroSlides.map((slide, index) => <button className={heroSlide === index ? "is-active" : ""} key={slide.src} onClick={() => setHeroSlide(index)} aria-label={`Show ${slide.alt}`} />)}
      </div>
    </section>

    <nav className="infra-tabs" aria-label="Non-academic infrastructure sections">
      {sections.map((item) => <button className={active === item.id ? "is-active" : ""} key={item.id} onClick={() => jumpTo(item.id)}>
        <span>{item.no}</span>{item.tab}
      </button>)}
    </nav>

    <section className="infra-sports-section" id="sports">
      <div className="infra-sports-inner">
        <figure className="infra-image-reveal infra-single-image-reveal"><img src={sports[sport][1]} alt={`${sports[sport][0]} at DC College`} /></figure>
        <div className="infra-reveal">
          <p className="infra-eyebrow">01 - Sports</p>
          <h2>Sports for everyday growth.</h2>
          <div className="infra-sport-list">
            {sports.map(([name], index) => <button className={index === sport ? "is-active" : ""} key={name} onMouseEnter={() => setSport(index)} onClick={() => setSport(index)}><span>{String(index + 1).padStart(2, "0")}</span>{name}<ArrowRight size={15} /></button>)}
          </div>
        </div>
      </div>
    </section>

    <section className="infra-lifestyle-section warm" id="hostel">
      <div className="infra-lifestyle-inner">
        <div className="infra-reveal">
          <p className="infra-eyebrow">02 - Hostel</p>
          <h2>A comfortable space to live, study and belong.</h2>
          <p>Hostel and residential support spaces are planned around comfort, community, safety and the everyday rhythm of student life.</p>
          <div className="infra-highlight-lines"><span>Comfort</span><span>Community</span><span>Safety</span></div>
        </div>
        <div className="infra-collage lifestyle hostel-collage">
          {hostelImages.map((image, index) => <figure className="infra-image-reveal" key={image}><img src={image} alt={index === 0 ? "Hostel common space" : "Hostel student room"} /></figure>)}
        </div>
      </div>
    </section>

    <section className="infra-dining-section" id="dining">
      <img className="infra-dining-bg infra-single-image-reveal" src="/images/students/dining.png" alt="Dining space at DC College" />
      <div className="infra-dining-copy infra-reveal">
        <p className="infra-eyebrow">03 - Dining</p>
        <h2>Spaces to pause, connect and recharge.</h2>
        <p>Dining and cafeteria spaces bring warmth into the campus day, giving students time to rest, talk and return to learning with renewed energy.</p>
      </div>
    </section>

    <section className="infra-facilities-section" id="facilities">
      <div className="infra-facilities-inner">
        <header className="infra-reveal">
          <p className="infra-eyebrow">04 - Facilities</p>
          <h2>Everyday convenience across campus.</h2>
        </header>
        <div className="infra-editorial-list">
          {["Student Support", "Common Areas", "Campus Services", "Safety & Security", "Accessibility"].map((item, index) => <p className="infra-reveal" key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</p>)}
        </div>
      </div>
    </section>

    <section className="infra-it-section" id="it-network">
      <div className="infra-it-inner">
        <div className="infra-reveal">
          <p className="infra-eyebrow">05 - IT Network</p>
          <h2>Connected spaces for a connected campus.</h2>
          <p>Digital learning zones, system access and tech-enabled campus spaces support students as academic work becomes more connected.</p>
          <div className="infra-stat-lines"><span>Campus-wide connectivity</span><span>Digital learning support</span><span>Tech-enabled spaces</span></div>
        </div>
        <figure className="infra-image-reveal"><img src="/images/courses/bca.png" alt="Students using digital learning systems" /></figure>
      </div>
    </section>

    <ExploreGallery />
  </div>;
}
