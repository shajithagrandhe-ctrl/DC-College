import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { collegeConfig } from "../data/config";
import { courses } from "../data/courses";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const heroSlides = [
  { image: "/images/students/college.png", label: "Modern campus", className: "hero-slide-students" },
  { image: "/images/students/class2.png", label: "Classroom learning", className: "hero-slide-classroom" },
  { image: "/images/students/lib2.png", label: "Academic library", className: "hero-slide-library" }
];

const courseMeta: Record<string, { index: string; courseNo: string; title: string; titleLines: string[]; focus: string }> = {
  bba: {
    index: "01 - BBA",
    courseNo: "Course 01",
    title: "Bachelor of Business Administration",
    titleLines: ["Bachelor of Business", "Administration"],
    focus: "Business cases, leadership labs and presentation-led learning."
  },
  bca: {
    index: "02 - BCA",
    courseNo: "Course 02",
    title: "Bachelor of Computer Applications",
    titleLines: ["Bachelor of Computer", "Applications"],
    focus: "Code, ship and present real application projects."
  },
  "bcom-computers": {
    index: "03 - B.COM",
    courseNo: "Course 03",
    title: "B.Com Computer Applications",
    titleLines: ["B.Com Computer", "Applications"],
    focus: "Commerce foundations with practical digital finance tools."
  },
  "bsc-computer-science": {
    index: "04 - B.SC CS",
    courseNo: "Course 04",
    title: "B.Sc Computer Science",
    titleLines: ["B.Sc Computer", "Science"],
    focus: "Technical depth across labs, systems and applied computing."
  }
};

export default function Courses({ openEnquiry }: { openEnquiry: (course?: string) => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useScrollAnimation(ref);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return <div className="courses-page" ref={ref}>
    <section className="courses-hero" aria-label="Academic programs">
      <div className="courses-hero-slider" aria-hidden="true">
        {heroSlides.map((slide, index) => <div
          key={slide.label}
          className={`courses-hero-slide ${slide.className} ${index === activeSlide ? "is-active" : ""}`}
        >
          <img className="courses-hero-image" src={slide.image} alt="" />
        </div>)}
      </div>
      <div className="courses-hero-overlay" />
      <div className="courses-hero-content">
        <p className="courses-eyebrow">Academic Programs</p>
        <h1>Courses designed for tomorrow.</h1>
        <p>Choose a program that blends academic clarity, practical exposure and career preparation.</p>
      </div>
      <div className="courses-slide-indicators" aria-label="Course hero slides">
        {heroSlides.map((slide, index) => <button
          type="button"
          key={slide.label}
          className={index === activeSlide ? "is-active" : ""}
          aria-label={`Show ${slide.label}`}
          onClick={() => setActiveSlide(index)}
        >
          {String(index + 1).padStart(2, "0")}
        </button>)}
      </div>
    </section>

    <section className="courses-intro">
      <div className="courses-intro-inner reveal">
        <p className="courses-eyebrow">Our Programs</p>
        <h2>Four pathways. One future-focused experience.</h2>
        <p>Explore programs built around knowledge, practical learning and career readiness.</p>
      </div>
    </section>

    <section className="courses-list" aria-label="DC College courses">
      {courses.map((course, index) => {
        const meta = courseMeta[course.slug];
        const reversed = index % 2 === 1;

        return <article
          key={course.slug}
          className={`courses-showcase course-theme-${index} ${reversed ? "is-reversed" : ""}`}
        >
          <div className="courses-showcase-inner">
            <Link to={`/courses/${course.slug}`} className="courses-image-frame reveal" aria-label={`Explore ${course.title}`}>
              <img className="course-image" src={course.image} alt={meta.title} loading="lazy" />
              <span className="course-glass-tag">
                <span>DC College</span>
                <strong>Career-focused program</strong>
              </span>
              <span className="course-image-caption">{meta.focus}</span>
            </Link>
            <div className="courses-copy reveal">
              <p className="courses-course-no">{meta.courseNo}</p>
              <p className="courses-index">{meta.index}</p>
              <h2 className="course-title">
                {meta.titleLines.map((line) => <span key={line}>{line}</span>)}
              </h2>
              <p className="course-description">{course.description.join(" ")}</p>
              <dl className="course-facts" aria-label={`${course.title} key facts`}>
                <div><dt>Duration</dt><dd>{course.duration}</dd></div>
                <div><dt>Eligibility</dt><dd>{course.eligibility}</dd></div>
              </dl>
              <div className="course-highlights">
                {course.highlights.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="course-actions">
                <Link className="course-link course-link-primary" to={`/courses/${course.slug}`}>
                  View Details <ArrowRight size={15} />
                </Link>
                <button className="course-link" type="button" onClick={() => openEnquiry(course.title)}>
                  Enquire Now <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </article>;
      })}
    </section>

    <section className="courses-final-cta">
      <div className="courses-final-inner reveal">
        <p className="courses-eyebrow">Admissions Guidance</p>
        <h2>Not sure which program is right for you?</h2>
        <p>Our admissions team can help you choose the right path.</p>
        <div className="course-actions">
          <a className="course-link" href={collegeConfig.phoneHref}>Talk to Admissions <ArrowRight size={15} /></a>
          <button className="course-link" type="button" onClick={() => openEnquiry()}>Enquire Now <ArrowRight size={15} /></button>
        </div>
      </div>
    </section>
  </div>;
}
