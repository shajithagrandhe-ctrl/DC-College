import { ArrowRight, BookOpen, Building, Facebook, GraduationCap, Instagram, Landmark, MapPin, MessageCircle, Palette, Phone, Trophy, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { ExpandingCards, type CardItem } from "../components/ui/expanding-cards";
import { collegeConfig } from "../data/config";
import { courses } from "../data/courses";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const admissionPreview = ["Discover Your Course", "Counselling & Verification", "Confirm Your Admission"];
const galleryItems: CardItem[] = [
  {
    id: "campus-life",
    title: "Everyday moments at DC",
    description: "Campus days shaped by friendships, learning spaces and everyday college life.",
    imgSrc: "/images/students/campus%20life.png",
    icon: <Building size={24} />,
    linkHref: "/life-at-dc"
  },
  {
    id: "classroom-learning",
    title: "Learning together",
    description: "Classroom conversations, peer learning and faculty guidance in motion.",
    imgSrc: "/images/students/classg.png",
    icon: <BookOpen size={24} />,
    linkHref: "/life-at-dc"
  },
  {
    id: "cultural-fest",
    title: "Celebrate talent and culture",
    description: "Student creativity, performance and campus energy during cultural moments.",
    imgSrc: "/images/students/cultural.png",
    icon: <Palette size={24} />,
    linkHref: "/life-at-dc"
  },
  {
    id: "graduation",
    title: "A milestone worth celebrating",
    description: "A proud academic milestone that marks confidence, growth and achievement.",
    imgSrc: "/images/students/graduation3.png",
    icon: <GraduationCap size={24} />,
    linkHref: "/life-at-dc"
  },
  {
    id: "seminar",
    title: "Ideas beyond the classroom",
    description: "Seminars and academic sessions that connect learning with real-world thinking.",
    imgSrc: "/images/students/seminars.png",
    icon: <Landmark size={24} />,
    linkHref: "/life-at-dc"
  },
  {
    id: "sports",
    title: "Play. Compete. Grow.",
    description: "Sports and movement that build teamwork, discipline and campus spirit.",
    imgSrc: "/images/students/sports.png",
    icon: <Trophy size={24} />,
    linkHref: "/life-at-dc"
  },
  {
    id: "student-clubs",
    title: "Find your community",
    description: "Student groups and shared interests that make college feel connected.",
    imgSrc: "/images/students/student_club.png",
    icon: <Users size={24} />,
    linkHref: "/life-at-dc"
  }
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
  return <section className="campus-gallery-section">
    <div className="campus-gallery-header">
      <div>
        <p className="campus-gallery-label">05 &mdash; Gallery</p>
        <h2>Life at DC, frame by frame.</h2>
      </div>
    </div>
    <ExpandingCards
      className="campus-expanding-cards"
      items={galleryItems}
      defaultActiveIndex={2}
      aria-label="DC College campus gallery moments"
    />
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
        <a href={`https://wa.me/${collegeConfig.whatsapp}`} aria-label="WhatsApp" data-social="whatsapp"><MessageCircle size={17} /><span>WhatsApp</span></a>
        <a href={collegeConfig.facebook} aria-label="Facebook" data-social="facebook"><Facebook size={17} /><span>Facebook</span></a>
        <a href={collegeConfig.instagram} aria-label="Instagram" data-social="instagram"><Instagram size={17} /><span>Instagram</span></a>
        <a href={collegeConfig.phoneHref} aria-label="Contact DC College" data-social="phone"><Phone size={17} /><span>Contact</span></a>
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(collegeConfig.mapQuery)}`} target="_blank" rel="noreferrer" aria-label="DC College address" data-social="map"><MapPin size={17} /><span>Address</span></a>
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
