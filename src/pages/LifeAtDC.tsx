import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  { image: "/images/students/herodc.png", label: "Campus friendships", position: "center 42%" },
  { image: "/images/students/herodc1.png", label: "Student celebrations", position: "center 42%" },
  { image: "/images/students/herodc2.png", label: "Learning together", position: "center 42%" }
];
const dayItems = [
  ["01", "08:30 AM", "Arrive. Connect. Begin.", "Students step into campus, meet friends and begin the day with energy.", "/images/students/campus life.png"],
  ["02", "10:00 AM", "Learn Together", "Classroom conversations turn concepts into shared understanding.", "/images/students/class2.png"],
  ["03", "12:30 PM", "Break, Talk, Recharge", "Small pauses become the everyday memories students remember.", "/images/students/studio1.png"],
  ["04", "02:00 PM", "Labs, Projects & Practice", "Learning moves into labs, group work and hands-on practice.", "/images/students/lab.png"],
  ["05", "04:00 PM", "Clubs, Sports & Activities", "The campus opens into interests, performance, movement and community.", "/images/students/Sports Clubs.png"],
  ["06", "05:30 PM", "End the day with memories", "The day closes with conversations that continue beyond class.", "/images/students/graduate.png"]
];
const galleryItems = [
  ["Campus", "/images/students/campus.png"], ["Classroom", "/images/students/class2.png"], ["Library", "/images/students/lib2.png"], ["Cultural Events", "/images/campus/cult.png"],
  ["Sports", "/images/students/cricket.png"], ["Clubs", "/images/campus/clubact.png"], ["Celebrations", "/images/campus/traditional.png"], ["Graduation", "/images/campus/gradcel.png"]
];
const events = [
  ["Cultural Fest", "Music, performance and student creativity come together.", "/images/campus/cult.png"],
  ["Freshers Day", "A warm beginning filled with introductions and campus energy.", "/images/campus/fresher.png"],
  ["Annual Day", "A celebration of talent, achievement and community.", "/images/campus/annual.png"],
  ["Dance", "Movement, rhythm and stage confidence in full flow.", "/images/campus/dance.png"],
  ["Traditional Day", "Culture, style and identity shared across campus.", "/images/campus/traditional.png"],
  ["Sports Day", "Competition, teamwork and movement beyond classrooms.", "/images/campus/sportsday.png"],
  ["Club Activities", "Student-led communities shaping skills and friendships.", "/images/campus/clubact.png"],
  ["Graduation Celebration", "A milestone moment filled with pride.", "/images/campus/gradcel.png"]
];
const clubs = [
  { name: "Coding Club", image: "/images/students/coding club.png" },
  { name: "Commerce Club", image: "/images/students/class2.png" },
  { name: "Management Club", image: "/images/students/campus.png" },
  { name: "Cultural Club", image: "/images/students/Cultural Clubs.png" },
  { name: "Sports Club", image: "/images/students/Sports Clubs.png" },
  { name: "Photography Club", image: "/images/students/cultural.png" },
  { name: "Literary Club", image: "/images/students/lib2.png" },
  { name: "Social Outreach", image: "/images/students/student_club.png" }
];
const sports = [
  { name: "Cricket", image: "/images/students/cricket.png" },
  { name: "Basketball", image: "/images/students/cricket.png" },
  { name: "Badminton", image: "/images/students/sports.png" },
  { name: "Volleyball", image: "/images/students/campus.png" },
  { name: "Indoor Games", image: "/images/students/class2.png" },
  { name: "Fitness Activities", image: "/images/students/graduate.png" }
];
const voices = [
  ["DC gave me more than academics — it gave me friends, confidence and experiences I'll carry forward.", "Ananya Reddy", "BCA - Class of 2026"],
  ["Campus life helped me find my voice through events, clubs and classroom friendships.", "Rahul Varma", "BBA - Class of 2025"],
  ["Everyday moments at DC made college feel purposeful, active and memorable.", "Meghana Rao", "B.Com - Class of 2026"]
];
const why = [
  ["01", "Connected Campus", "A welcoming community built around shared experiences."],
  ["02", "Active Student Life", "Events, clubs and activities throughout the year."],
  ["03", "Learning Beyond Classrooms", "Experiences that support confidence and personality."],
  ["04", "Memories That Last", "Milestones, friendships and celebrations that stay with you."]
];

export default function LifeAtDC({ openEnquiry }: { openEnquiry: () => void }) {
  const [hero, setHero] = useState(0);
  const [gallery, setGallery] = useState(2);
  const [galleryHover, setGalleryHover] = useState(false);
  const [club, setClub] = useState(0);
  const [sport, setSport] = useState(0);
  const [voice, setVoice] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const voiceId = window.setInterval(() => setVoice((current) => (current + 1) % voices.length), 10000);
    return () => window.clearInterval(voiceId);
  }, []);

  useEffect(() => {
    if (galleryHover) return;
    const galleryId = window.setInterval(() => setGallery((current) => (current + 1) % galleryItems.length), 3600);
    return () => window.clearInterval(galleryId);
  }, [galleryHover]);

  useLayoutEffect(() => {
    const node = pageRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".life-hero-title span", { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.85, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".life-reveal").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.74, delay: (index % 4) * 0.05, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%" } });
      });
      gsap.utils.toArray<HTMLElement>(".life-image-reveal").forEach((item) => {
        gsap.fromTo(item, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)", duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%" } });
      });
    }, node);
    return () => ctx.revert();
  }, []);

  const slot = (index: number) => {
    const total = galleryItems.length;
    let offset = index - gallery;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    if (offset === -2) return "far-left";
    if (offset === -1) return "left";
    if (offset === 0) return "center";
    if (offset === 1) return "right";
    if (offset === 2) return "far-right";
    return "hidden";
  };

  return <div className="life-page" ref={pageRef}>
    <section className="life-hero">
      {heroSlides.map((slide, index) => <img key={slide.label} src={slide.image} alt="" className={index === hero ? "is-active" : ""} style={{ objectPosition: slide.position }} />)}
      <div className="life-hero-overlay" />
      <div className="life-hero-content">
        <p className="life-eyebrow">Life at DC</p>
        <h1 className="life-hero-title"><span>More than a college.</span><span>A whole experience.</span></h1>
        <p>Learning, friendships, events and everyday moments come together to shape life at DC College.</p>
        <div className="life-actions"><button onClick={() => dayRef.current?.scrollIntoView({ behavior: "smooth" })}>Explore Campus Life <ArrowRight size={15} /></button><button onClick={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })}>View Gallery</button></div>
      </div>
      <div className="life-hero-indicators" aria-label="Campus hero images">{heroSlides.map((slide, index) => <button key={slide.label} className={index === hero ? "is-active" : ""} aria-label={`Show ${slide.label}`} aria-pressed={index === hero} onClick={() => setHero(index)}>{String(index + 1).padStart(2, "0")}</button>)}</div>
    </section>

    <section className="life-day-section" ref={dayRef}>
      <header className="life-section-head life-reveal"><p className="life-eyebrow">A Day at DC</p><h2>Moments that make campus feel alive.</h2></header>
      <div className="life-day-list">{dayItems.map(([no, time, title, text, image], index) => <article className={`life-day-item ${index % 2 ? "is-reversed" : ""}`} key={title}><div className="life-day-media life-image-reveal"><img src={image} alt={title} loading="lazy" /></div><div className="life-day-copy life-reveal"><p>{no} - {time}</p><h3>{title}</h3><span>{text}</span></div></article>)}</div>
    </section>

    <section className="life-gallery-section" ref={galleryRef}>
      <div className="life-gallery-header"><div><p className="life-eyebrow">Campus Moments</p><h2>Life at DC, frame by frame.</h2></div><div className="life-gallery-controls"><button aria-label="Previous campus moment" onClick={() => setGallery((gallery - 1 + galleryItems.length) % galleryItems.length)}><ArrowLeft /></button><button aria-label="Next campus moment" onClick={() => setGallery((gallery + 1) % galleryItems.length)}><ArrowRight /></button></div></div>
      <div className="life-gallery-carousel" onMouseEnter={() => setGalleryHover(true)} onMouseLeave={() => setGalleryHover(false)}>{galleryItems.map(([label, image], index) => <button className={`life-gallery-frame ${slot(index)}`} key={label} aria-label={`Show ${label} campus moment`} aria-pressed={index === gallery} onClick={() => setGallery(index)}><img src={image} alt="" loading="lazy" />{slot(index) === "center" && <span><strong>{label}</strong><em>DC College / Campus Moments</em></span>}</button>)}</div>
      <div className="life-gallery-counter">{String(gallery + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}</div>
    </section>

    <section className="life-events-section">
      <header className="life-section-head light life-reveal"><p className="life-eyebrow">Events & Fests</p><h2>Energy, performance and campus tradition in motion.</h2></header>
      <div className="life-event-marquee" aria-label="Events and fests"><div className="life-event-track">{[...events, ...events].map(([title, text, image], index) => <article className="life-event-card" key={`${title}-${index}`}><img src={image} alt="" loading="lazy" /><span><strong>{title}</strong><em>{text}</em></span></article>)}</div></div>
    </section>

    <section className="life-clubs-section">
      <div className="life-clubs-inner">
        <div className="life-reveal"><p className="life-eyebrow">Student Communities</p><h2>Find your people. Build your interests.</h2><img src={clubs[club].image} alt={clubs[club].name} /></div>
        <div>{clubs.map((item, index) => <button className={index === club ? "is-active" : ""} aria-pressed={index === club} onMouseEnter={() => setClub(index)} onFocus={() => setClub(index)} onClick={() => setClub(index)} key={item.name}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}<ArrowRight size={16} /></button>)}</div>
      </div>
    </section>

    <section className="life-sports-section">
      <div className="life-sports-inner"><div className="life-image-reveal"><img src={sports[sport].image} alt={sports[sport].name} loading="lazy" /></div><div className="life-reveal"><p className="life-eyebrow">Sports & Wellness</p><h2>Balance ambition with movement.</h2>{sports.map((item, index) => <button className={index === sport ? "is-active" : ""} aria-pressed={index === sport} onMouseEnter={() => setSport(index)} onFocus={() => setSport(index)} onClick={() => setSport(index)} key={item.name}>{item.name}</button>)}</div></div>
    </section>

    <section className="life-spaces-section">
      <header className="life-section-head light life-reveal"><p className="life-eyebrow">Spaces to Belong</p><h2>From quiet corners to shared experiences.</h2></header>
      <div className="life-spaces-grid">{[["Library", "A quieter place to focus.", "/images/students/lib2.png"], ["Classrooms", "Where ideas become conversations.", "/images/students/class2.png"], ["Computer Labs", "Hands-on learning in action.", "/images/students/comp_lab.png"], ["Campus Grounds", "Where conversations continue after class.", "/images/students/campus life.png"], ["Auditorium", "A stage for campus energy.", "/images/students/adit.png"], ["Cafeteria", "Breaks, stories and friendships.", "/images/students/c1.png"]].map(([title, text, image]) => <figure className="life-image-reveal" key={title}><img src={image} alt={title} /><figcaption><strong>{title}</strong>{text}</figcaption></figure>)}</div>
    </section>

    <section className="life-voices-section"><div><p className="life-eyebrow">Student Voices</p><h2>What campus life feels like, in their words.</h2><blockquote key={voice}>“{voices[voice][0]}”</blockquote><p><strong>{voices[voice][1]}</strong><span>{voices[voice][2]}</span></p><div>{voices.map((item, index) => <button key={item[1]} className={index === voice ? "is-active" : ""} aria-label={`Show testimonial by ${item[1]}`} aria-pressed={index === voice} onClick={() => setVoice(index)} />)}</div></div></section>

    <section className="life-why-section"><header className="life-section-head life-reveal"><p className="life-eyebrow">Why Students Love Life at DC</p><h2>Why students love life at DC.</h2></header><div>{why.map(([no, title, text]) => <article className="life-reveal" key={title}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="life-cta-section"><img src="/images/students/c3.png" alt="Experience DC campus life" /><div><p className="life-eyebrow">Experience DC</p><h2>Come see campus life for yourself.</h2><p>Visit DC College and experience the people, spaces and energy that make campus life memorable.</p><div className="life-actions"><button onClick={openEnquiry}>Enquire Now <ArrowRight size={15} /></button><Link to="/courses">Explore Courses</Link></div></div></section>
  </div>;
}
