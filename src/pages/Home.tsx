import { ArrowLeft, ArrowRight, Facebook, Instagram, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { collegeConfig } from "../data/config";
import { courses } from "../data/courses";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const admissionPreview = ["Discover Your Course", "Counselling & Verification", "Confirm Your Admission"];
const galleryItems = [
  { id: 1, category: "Campus Life", title: "Everyday moments at DC", image: "/images/students/campus%20life.png" },
  { id: 2, category: "Classroom Learning", title: "Learning together", image: "/images/students/classg.png" },
  { id: 3, category: "Cultural Fest", title: "Celebrate talent and culture", image: "/images/students/cultural.png" },
  { id: 4, category: "Graduation", title: "A milestone worth celebrating", image: "/images/students/graduation3.png" },
  { id: 5, category: "Seminar", title: "Ideas beyond the classroom", image: "/images/students/seminars.png" },
  { id: 6, category: "Sports", title: "Play. Compete. Grow.", image: "/images/students/sports.png" },
  { id: 7, category: "Student Clubs", title: "Find your community", image: "/images/students/student_club.png" }
];
const whyDCStats = [
  {
    value: 100,
    suffix: "%",
    title: "Career Guidance",
    description: "Dedicated career counselling, CRT training and interview preparation to help students move confidently toward the right career path."
  },
  {
    value: 20,
    suffix: "+",
    title: "Experienced Faculty",
    description: "Learn from qualified academicians and professionals who combine academic knowledge with practical industry insight."
  },
  {
    value: 50,
    suffix: "+",
    title: "Industry & Recruiter Connections",
    description: "Industry interactions, internships, recruiter engagement, seminars and placement opportunities that connect students with the professional world."
  },
  {
    value: 300,
    suffix: "+",
    title: "Placement Success",
    description: "Students supported through placement training, recruiter drives and career-development opportunities."
  }
];
const studentVoices = [
  {
    quote: "DC College gave me the confidence, guidance and practical exposure I needed to prepare for my career.",
    name: "Ananya Reddy",
    course: "BCA",
    year: "Class of 2026"
  },
  {
    quote: "The CRT training and faculty support helped me understand my strengths and approach placements with clarity.",
    name: "Rahul Varma",
    course: "BBA",
    year: "Class of 2025"
  },
  {
    quote: "From classroom projects to campus events, DC made learning feel purposeful and connected to real opportunities.",
    name: "Meghana Rao",
    course: "B.Com Computer Applications",
    year: "Class of 2026"
  }
];
const enquiryCourses = ["BBA", "BCA", "B.Com Computer Applications", "B.Sc Computer Science", "Not Sure Yet"];
function CountedValue({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(value);
      hasRun.current = true;
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun.current) return;
      hasRun.current = true;
      const start = performance.now();
      const duration = 1300;
      const animate = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className="why-dc-value">{count}<span className="why-dc-symbol">{suffix}</span></span>;
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };
  const graduateWidth = 100 - pos;
  const collegeOpacity = 0.38 + (pos / 100) * 0.62;
  const graduationOpacity = 0.38 + (graduateWidth / 100) * 0.62;
  const balanceClass = pos > 60 ? "college-active" : pos < 40 ? "graduation-active" : "balanced";
  const sliderStyle = { "--slider-position": `${pos}%` } as CSSProperties;

  return <div
    ref={ref}
    className={`graduation-slider reveal ${balanceClass} ${dragging ? "is-dragging" : ""}`}
    style={sliderStyle}
    onPointerDown={(e) => { setDragging(true); update(e.clientX); e.currentTarget.setPointerCapture(e.pointerId); }}
    onPointerMove={(e) => { if (e.buttons) update(e.clientX); }}
    onPointerUp={() => setDragging(false)}
    onPointerCancel={() => setDragging(false)}
    onLostPointerCapture={() => setDragging(false)}
  >
    <img className="graduation-image" src="/images/students/college.png" alt="Four Indian female college students in uniforms on campus" draggable={false} />
    <img className="graduation-image graduation-reveal" src="/images/students/graduate.png" alt="The same four students wearing graduation gowns and caps" draggable={false} style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
    <div className="graduation-label graduation-label-college" style={{ opacity: collegeOpacity }}>COLLEGE DAYS</div>
    <div className="graduation-label graduation-label-grad" style={{ opacity: graduationOpacity }}>GRADUATION</div>
    <div className="graduation-divider">
      <span className="graduation-handle" aria-hidden="true"><span>&lt;</span><span>&gt;</span></span>
      <span className="graduation-status">{Math.round(pos)} / {Math.round(graduateWidth)}</span>
    </div>
    <span className="sr-only">{Math.round(graduateWidth)} percent graduation image revealed</span>
  </div>;
}

function CampusGallery() {
  const [active, setActive] = useState(2);
  const [lightbox, setLightbox] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const total = galleryItems.length;
  const current = galleryItems[active];
  const go = (direction: number) => setActive((value) => (value + direction + total) % total);
  const relativePosition = (index: number) => {
    const raw = index - active;
    if (raw > total / 2) return raw - total;
    if (raw < -total / 2) return raw + total;
    return raw;
  };
  const slotName = (offset: number) => {
    if (offset === -2) return "slot-far-left";
    if (offset === -1) return "slot-left";
    if (offset === 0) return "slot-center";
    if (offset === 1) return "slot-right";
    if (offset === 2) return "slot-far-right";
    return "slot-hidden";
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!lightbox) return;
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || lightbox) return;
    const rotation = window.setInterval(() => go(1), 4200);
    return () => window.clearInterval(rotation);
  }, [lightbox]);

  const endDrag = (clientX: number) => {
    if (dragStart === null) return;
    const delta = clientX - dragStart;
    if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
    setDragStart(null);
    return Math.abs(delta);
  };

  return <section className="campus-gallery-section">
    <div className="campus-gallery-header">
      <div>
        <p className="campus-gallery-label">05 &mdash; Gallery</p>
        <h2>Life at DC, frame by frame.</h2>
      </div>
      <p className="campus-gallery-intro">Click any moment to bring it into focus.</p>
      <div className="campus-gallery-actions">
        <button type="button" aria-label="Previous gallery moment" onClick={() => go(-1)}><ArrowLeft size={17} /></button>
        <button type="button" aria-label="Next gallery moment" onClick={() => go(1)}><ArrowRight size={17} /></button>
      </div>
    </div>
    <div
      className={`campus-gallery-carousel ${dragStart !== null ? "is-dragging" : ""}`}
      tabIndex={0}
      data-gallery-root="true"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
      onPointerCancel={() => setDragStart(null)}
      onLostPointerCapture={() => setDragStart(null)}
    >
      {galleryItems.map((item) => {
        const offset = relativePosition(item.id - 1);
        const visible = Math.abs(offset) <= 2;
        return <button
          className={`campus-gallery-slide ${slotName(offset)} ${offset === 0 ? "is-active" : ""}`}
          type="button"
          key={item.id}
          style={{ display: visible ? "block" : "none" }}
          onPointerDown={(event) => {
            setDragStart(event.clientX);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={(event) => {
            const distance = endDrag(event.clientX) ?? 0;
            if (distance > 8) return;
            offset === 0 ? setLightbox(true) : setActive(item.id - 1);
          }}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            offset === 0 ? setLightbox(true) : setActive(item.id - 1);
          }}
          aria-label={offset === 0 ? `Open ${item.title}` : `Make ${item.title} the active gallery moment`}
        >
          <img src={item.image} alt={item.title} draggable={false} />
          {offset === 0 && <span className="campus-gallery-overlay">
            <span className="campus-gallery-copy">
              <span>{item.category} / 2026</span>
              <strong>{offset === 0 ? "Moments that shape the DC experience" : item.title}</strong>
              <em>DC College / Visakhapatnam</em>
            </span>
            <span className="campus-gallery-cta">View Moment <ArrowRight size={14} /></span>
          </span>}
        </button>;
      })}
    </div>
    <div className="campus-gallery-progress">
      <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      <div><span style={{ width: `${((active + 1) / total) * 100}%` }} /></div>
      <span>05 - Campus Moments</span>
    </div>
    {lightbox && <div className="campus-gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery viewer">
      <button type="button" className="campus-gallery-close" aria-label="Close gallery" onClick={() => setLightbox(false)}><X size={20} /></button>
      <button type="button" className="campus-gallery-light-nav left" aria-label="Previous image" onClick={() => go(-1)}><ArrowLeft /></button>
      <figure>
        <img src={current.image} alt={current.title} />
        <figcaption><span>{current.category}</span>{current.title}</figcaption>
      </figure>
      <button type="button" className="campus-gallery-light-nav right" aria-label="Next image" onClick={() => go(1)}><ArrowRight /></button>
    </div>}
  </section>;
}

function WhyDCCollege() {
  const [activeStat, setActiveStat] = useState<number | null>(null);

  return <section className="why-dc-section">
    <div className="why-dc-inner">
      <div className="why-dc-kicker">03 &mdash; Why DC College</div>
      <h2 className="why-dc-heading">Why students choose DC College.</h2>
      <p className="home-why-intro">Guidance, experienced faculty and practical exposure support learning beyond the classroom. Quality education at affordable fees with scholarships for meritorious and deserving students.</p>
      <div className="why-dc-rule"><span /></div>
      <div className="why-dc-stats" aria-label="DC College student success highlights" onMouseLeave={() => setActiveStat(null)}>
        {whyDCStats.map((stat, index) => <article
          className={`why-dc-stat ${activeStat === index ? "is-active" : ""}`}
          key={stat.title}
          style={{ "--why-delay": `${index * 100}ms` } as CSSProperties}
          tabIndex={0}
          onMouseEnter={() => setActiveStat(index)}
          onFocus={() => setActiveStat(index)}
          onPointerDown={() => setActiveStat(index)}
        >
          <CountedValue value={stat.value} suffix={stat.suffix} />
          <h3>{stat.title}</h3>
          <p>{stat.description}</p>
        </article>)}
      </div>
      <Link className="btn btn-secondary home-why-link" to="/placements">Explore Placements <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </section>;
}

function StudentVoices() {
  const [activeVoice, setActiveVoice] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActiveVoice((current) => (current + 1) % studentVoices.length);
    }, 10000);
    return () => window.clearInterval(id);
  }, []);

  const voice = studentVoices[activeVoice];

  return <section className="student-voices-section">
    <div className="student-voices-inner">
      <p className="student-voices-label">07 &mdash; STUDENT VOICES</p>
      <div className="student-voices-frame">
        <p key={voice.quote} className="student-voices-quote">&ldquo;{voice.quote}&rdquo;</p>
        <div className="student-voices-meta">
          <span>{voice.name}</span>
          <span>{voice.course}</span>
          <span>{voice.year}</span>
        </div>
      </div>
      <div className="student-voices-controls" aria-label="Student voice controls">
        {studentVoices.map((item, index) => <button
          type="button"
          key={item.name}
          className={index === activeVoice ? "is-active" : ""}
          aria-label={`Show ${item.name} testimonial`}
          onClick={() => setActiveVoice(index)}
        >
          <span />
        </button>)}
      </div>
    </div>
  </section>;
}

function HomeEnquirySection({ openEnquiry }: { openEnquiry: (course?: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.course) nextErrors.course = "Please choose a course.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const message = `Hello DC College Admissions Team,

I would like to enquire about admission.

Full Name: ${form.name}
Phone Number: ${form.phone}
Email Address: ${form.email}
Course Interested In: ${form.course}

Message:
${form.message}

Please share further admission details.

Thank you.`;

    window.open(`https://wa.me/${collegeConfig.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return <section id="enquiries" className="home-enquiry-section">
    <div className="home-enquiry-overlay" />
    <div className="home-enquiry-inner">
      <div className="home-enquiry-copy reveal">
        <p>08 &mdash; Enquiries</p>
        <h2>Let&apos;s start your journey at DC College.</h2>
        <span>Your future deserves the right beginning.</span>
        <div className="home-enquiry-actions">
          <a href="#home-enquiry-form" className="home-enquiry-primary">Enquire Now <ArrowRight size={15} /></a>
          <a href={collegeConfig.phoneHref} className="home-enquiry-secondary">Contact DC College</a>
        </div>
      </div>
      <form id="home-enquiry-form" className="home-enquiry-form reveal" onSubmit={submit} noValidate>
        <h3>Admission Enquiry</h3>
        <div className="home-enquiry-fields">
          <label>Full Name *
            <input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Student full name" />
            {errors.name && <small>{errors.name}</small>}
          </label>
          <label>Email Address
            <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" />
          </label>
          <label>Phone Number *
            <input value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+91" />
            {errors.phone && <small>{errors.phone}</small>}
          </label>
          <label>Course Interested In *
            <select value={form.course} onChange={(event) => update("course", event.target.value)}>
              <option value="">Select course</option>
              {enquiryCourses.map((course) => <option value={course} key={course}>{course}</option>)}
            </select>
            {errors.course && <small>{errors.course}</small>}
          </label>
          <label className="home-enquiry-wide">Message / Query
            <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell us what you would like to know" />
          </label>
        </div>
        <p className="home-enquiry-note">Your enquiry will open directly in WhatsApp with the details pre-filled.</p>
        <button className="home-enquiry-submit" type="submit">Submit &amp; Connect on WhatsApp <ArrowRight size={15} /></button>
      </form>
    </div>
  </section>;
}

export default function Home({ openEnquiry }: { openEnquiry: (course?: string) => void }) {
  const location = useLocation();
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref);
  useEffect(() => {
    if (location.hash !== "#enquiries") return;
    window.setTimeout(() => {
      document.getElementById("enquiries")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [location.hash]);
  return <div className="page" ref={ref as React.RefObject<HTMLDivElement>}>
    <section className="hero home-hero">
      <video className="hero-media home-hero-video" src="/videos/home-campus.mp4" autoPlay muted loop playsInline aria-hidden="true" tabIndex={-1} />
      <div className="container home-hero-content">
        <p className="eyebrow home-eyebrow">Welcome to DC College</p>
        <h1 className="home-title">Building Careers, Creating Success Stories</h1>
        <p className="home-hero-copy">Learn with purpose, grow with confidence, and prepare for a future filled with opportunity.</p>
        <div className="home-hero-actions">
          <Link className="btn home-hero-primary" to="/courses">Explore Courses <ArrowRight size={18} aria-hidden="true" /></Link>
          <button className="btn home-hero-secondary" onClick={() => openEnquiry()}>Enquire Now <ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <nav className="home-quick-links" aria-label="Quick links">
        <a href={`https://wa.me/${collegeConfig.whatsapp}`} aria-label="WhatsApp"><MessageCircle size={17} /><span>WhatsApp</span></a>
        <a href={collegeConfig.facebook} aria-label="Facebook"><Facebook size={17} /><span>Facebook</span></a>
        <a href={collegeConfig.instagram} aria-label="Instagram"><Instagram size={17} /><span>Instagram</span></a>
        <a href={collegeConfig.phoneHref} aria-label="Contact DC College"><Phone size={17} /><span>Contact</span></a>
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(collegeConfig.mapQuery)}`} target="_blank" rel="noreferrer" aria-label="DC College address"><MapPin size={17} /><span>Address</span></a>
      </nav>
    </section>
    <section className="home-intro-section">
      <div className="container home-intro-inner">
        <p className="eyebrow">DC College</p>
        <h2>Guidance, training and confidence for every student.</h2>
        <p>Explore career-focused programs designed to combine strong academics, practical learning and industry-ready skills.</p>
      </div>
    </section>
    <section className="section home-courses-section text-white">
      <div className="home-courses-inner">
        <div className="home-courses-header">
          <div>
            <p className="home-courses-label">02 - COURSES</p>
            <h2>Programs shaped for<br />tomorrow&apos;s careers.</h2>
          </div>
          <p>Explore the programs at DC College and choose the path that fits your interests and goals.</p>
        </div>
        <div className="home-courses-grid">{courses.map((course) => <CourseCard course={course} key={course.slug} />)}</div>
      </div>
    </section>
    <WhyDCCollege />
    <section className="section graduation-section bg-cream">
      <div className="container">
        <div className="graduation-editorial-header">
          <div>
            <p className="graduation-editorial-label">04 - TRANSFORMATION</p>
            <h2>Campus confidence to<br />career celebration.</h2>
          </div>
          <p>From everyday campus moments to graduation day, explore the transformation while the composition remains perfectly aligned. Drag the divider to move seamlessly between college life and graduation.</p>
        </div>
        <BeforeAfter />
        <div className="graduation-meta-bar">
          <span>DC College / Student Journey</span>
          <span>Drag to compare / Use arrow keys when focused</span>
        </div>
      </div>
    </section>
    <CampusGallery />
    <section className="home-admissions-preview">
      <div className="container home-admissions-inner">
        <div className="home-admissions-heading">
          <p className="eyebrow">06 &mdash; Admission Process</p>
          <h2>Your journey to DC.</h2>
          <p>From choosing the right program to confirming your admission, explore the steps to begin your journey at DC College.</p>
          <Link className="btn btn-primary home-admissions-link" to="/admission">Explore Admissions <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <ol className="home-admissions-steps">
          {admissionPreview.map((title, index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3></li>)}
        </ol>
      </div>
    </section>
    <StudentVoices />
    <HomeEnquirySection openEnquiry={openEnquiry} />
  </div>;
}
