import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    src: "/images/students/ainf.png",
    alt: "DC College academic infrastructure"
  },
  {
    src: "/images/students/class3.png",
    alt: "DC College classroom infrastructure"
  },
  {
    src: "/images/students/computerlab.png",
    alt: "DC College computer lab infrastructure"
  }
];

const facilities = [
  {
    id: "campus",
    no: "01",
    tab: "Campus",
    heading: "Campus built for focus and discovery.",
    copy: "DC College campus spaces are designed to support disciplined learning, open discussion and practical academic experiences.",
    images: ["/images/students/campus life.png", "/images/students/dc1.png", "/images/students/dccol.png"],
    highlights: ["Academic Focus", "Open Discussion", "Practical Exposure"],
    tone: "warm"
  },
  {
    id: "classrooms",
    no: "02",
    tab: "Classrooms",
    heading: "Classrooms made for active learning.",
    copy: "Faculty-led sessions, peer interaction and modern classroom tools create an environment where students can question, participate and understand with clarity.",
    images: ["/images/students/class8.png", "/images/students/class5.png", "/images/students/class7.png"],
    highlights: ["Discussion", "Collaboration", "Focused Learning"],
    tone: "mist"
  },
  {
    id: "syndicate-rooms",
    no: "03",
    tab: "Syndicate Rooms",
    heading: "Smaller spaces for deeper conversations.",
    copy: "Syndicate rooms give students room for case discussions, mentoring sessions, team projects and quieter academic exchange.",
    images: ["/images/students/studio.png", "/images/students/c1.png", "/images/students/c2.png"],
    highlights: ["Team Work", "Case Discussions", "Mentoring"],
    tone: "dark"
  },
  {
    id: "auditorium",
    no: "04",
    tab: "Auditorium",
    heading: "A stage for ideas, events and expression.",
    copy: "Seminars, guest lectures, cultural programs and conferences come together in a space designed for presence, attention and shared experience.",
    images: ["/images/students/adit.png", "/images/students/seminars.png", "/images/students/c3.png"],
    highlights: ["Seminars", "Guest Lectures", "Conferences"],
    tone: "warm"
  },
  {
    id: "labs",
    no: "05",
    tab: "Labs",
    heading: "Where concepts become practical experience.",
    copy: "Computer labs and hands-on learning environments help students test ideas, work on systems and build confidence through practice.",
    images: ["/images/students/lab.png", "/images/students/comp3.png", "/images/students/comp_lab.png"],
    highlights: ["Practice", "Experiment", "Create"],
    tone: "dark"
  },
  {
    id: "learning-studios",
    no: "06",
    tab: "Learning Studios",
    heading: "Spaces built for exploration and creation.",
    copy: "Project tables, collaborative corners and presentation-ready zones support active learning beyond a traditional classroom setup.",
    images: ["/images/students/studio1.png", "/images/students/studio2.png", "/images/students/studio.png"],
    highlights: ["Explore", "Present", "Build"],
    tone: "mist"
  },
  {
    id: "libraries",
    no: "07",
    tab: "Libraries",
    heading: "Quiet spaces for deeper thinking.",
    copy: "Library environments at DC encourage reading, research and reflective study for students who want space to go deeper.",
    images: ["/images/students/lib2.png", "/images/students/lib3.png", "/images/students/lib4.png"],
    highlights: ["Read", "Reflect", "Discover"],
    quote: "A space to read, reflect and discover.",
    tone: "warm"
  },
  {
    id: "convocation",
    no: "08",
    tab: "Convocation",
    heading: "Where the academic journey becomes a milestone.",
    copy: "Convocation marks the emotional close of an academic journey, bringing achievement, family pride and future ambition into one memorable moment.",
    images: ["/images/students/grad1.png", "/images/students/grad.png", "/images/students/grad2.png"],
    highlights: ["Achievement", "Pride", "Milestone"],
    tone: "dark",
    cta: true
  }
];

const galleryItems = [
  ["Campus", "/images/students/campus life.png"],
  ["Classrooms", "/images/students/class8.png"],
  ["Library", "/images/students/lib4.png"],
  ["Labs", "/images/students/lab.png"],
  ["Auditorium", "/images/students/adit.png"],
  ["Learning Studios", "/images/students/studio1.png"],
  ["Convocation", "/images/students/grad1.png"]
];

function ExploreGallery() {
  const [active, setActive] = useState(2);
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
        {slot(index) === "center" && <span><strong>{label}</strong><em>DC College / Infrastructure</em></span>}
      </button>)}
    </div>
    <p className="infra-gallery-counter">{String(active + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}</p>
  </section>;
}

export default function AcademicInfrastructure() {
  const [active, setActive] = useState("campus");
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

  return <div className="infra-page academic-infra-page">
    <section className="infrastructure-hero">
      <div className="infra-hero-slider" aria-hidden="true">
        {heroSlides.map((slide, index) => <img className={`infra-hero-image infra-hero-slide ${heroSlide === index ? "is-active" : ""}`} src={slide.src} alt="" key={slide.src} />)}
      </div>
      <div className="infra-hero-overlay" />
      <div className="infra-hero-content">
        <p className="infra-eyebrow">Academic Infrastructure</p>
        <h1 className="infra-hero-title"><span>Spaces designed</span><span>for learning.</span></h1>
        <p>Purpose-built academic environments that support focus, collaboration, experimentation and discovery.</p>
      </div>
      <div className="infra-hero-dots" aria-label="Academic infrastructure hero slides">
        {heroSlides.map((slide, index) => <button className={heroSlide === index ? "is-active" : ""} key={slide.src} onClick={() => setHeroSlide(index)} aria-label={`Show ${slide.alt}`} />)}
      </div>
    </section>

    <nav className="infra-tabs" aria-label="Academic infrastructure sections">
      {facilities.map((item) => <button className={active === item.id ? "is-active" : ""} key={item.id} onClick={() => jumpTo(item.id)}>
        <span>{item.no}</span>{item.tab}
      </button>)}
    </nav>

    {facilities.map((item, index) => <section className={`infra-facility-section tone-${item.tone} ${index % 2 ? "is-reversed" : ""}`} id={item.id} key={item.id}>
      <div className="infra-facility-inner">
        <div className="infra-facility-copy infra-reveal">
          <p className="infra-eyebrow">{item.no} - {item.tab}</p>
          <h2>{item.heading}</h2>
          <p>{item.copy}</p>
          <div className="infra-highlight-lines">
            {item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
          </div>
          {item.quote && <blockquote>{item.quote}</blockquote>}
          {item.cta && <Link className="infra-cta-link" to="/courses">Explore Courses <ArrowRight size={15} /></Link>}
        </div>
        <div className="infra-collage">
          <figure className="infra-image-reveal"><img src={item.images[0]} alt={`${item.tab} main view`} /></figure>
          <figure className="infra-image-reveal"><img src={item.images[1]} alt={`${item.tab} detail`} /></figure>
          <figure className="infra-image-reveal"><img src={item.images[2]} alt={`${item.tab} academic detail`} /></figure>
        </div>
      </div>
    </section>)}

    <ExploreGallery />
  </div>;
}
