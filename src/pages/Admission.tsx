import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collegeConfig } from "../data/config";
import { courses } from "../data/courses";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    src: "/images/students/hero_adm.png",
    alt: "Students beginning their admission journey"
  },
  {
    src: "/images/students/hero_adm1.png",
    alt: "DC College admissions support"
  },
  {
    src: "/images/students/hero_adm2.png",
    alt: "DC College campus admissions"
  }
];

const admissionProcess = [
  { no: "01", title: "Discover Your Course", description: "Explore the programs offered at DC College and choose the course that best matches your interests, strengths and future career goals.", micro: "Your ambition. Your direction.", href: "/courses" },
  { no: "02", title: "Check Eligibility", description: "Review the academic eligibility and qualification listed for your chosen program.", micro: "Know where you stand.", href: "/courses" },
  { no: "03", title: "Send an Admission Enquiry", description: "Share your contact details and course interest with the admissions team through WhatsApp.", micro: "Start the conversation.", action: "enquiry" },
  { no: "04", title: "Counselling & Verification", description: "Our admissions team will guide you through course counselling and verify the required academic and identification documents.", micro: "Guidance at every step.", action: "faq" },
  { no: "05", title: "Confirm Your Admission", description: "Complete the final admission formalities, confirm your seat and get ready to begin your academic journey at DC College.", micro: "Welcome to DC.", action: "form" }
];

const docs = ["10th Mark Sheet", "Intermediate / 10+2 Mark Sheet", "Transfer Certificate", "Bonafide Certificate", "Aadhaar Card", "Passport Photos", "Caste Certificate if applicable", "Income Certificate if applicable", "Migration Certificate if applicable"];
const faqs = ["When do admissions open?", "Can I enquire online?", "Are scholarships available?", "What documents are required?", "Can I visit the campus before applying?"];
const faqAnswers = [
  "Admissions are reviewed weekly during the admission window. Our team will guide you on the current intake status.",
  "Yes. The form on this page prepares your admission enquiry for WhatsApp so the admissions team can guide you on next steps.",
  "Scholarships are available for meritorious and deserving students based on college policy and verification.",
  "Bring your 10th and 10+2 marksheets, transfer certificate, Aadhaar, photos and applicable certificates.",
  "Yes. Campus preview and counselling visits can be coordinated with the admissions team."
];

export default function Admission({ openEnquiry }: { openEnquiry: (course?: string) => void }) {
  const [course, setCourse] = useState(courses[0]);
  const [faq, setFaq] = useState(0);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", phone: "", course: courses[0].title, message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [heroSlide, setHeroSlide] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToProcess = () => processRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToFaq = () => faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const start = () => {
    setEnquiryForm((current) => ({ ...current, course: course.title }));
    scrollToForm();
  };
  const updateEnquiry = (field: keyof typeof enquiryForm, value: string) => {
    setEnquiryForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!enquiryForm.name.trim()) nextErrors.name = "Full name is required.";
    if (!enquiryForm.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!enquiryForm.course.trim()) nextErrors.course = "Please choose a course.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const message = `Hello DC College Admissions Team,

I would like to enquire about admission.

Full Name: ${enquiryForm.name}
Phone Number: ${enquiryForm.phone}
Email Address: ${enquiryForm.email}
Course Interested In: ${enquiryForm.course}

Message:
${enquiryForm.message}

Please share further admission details.

Thank you.`;

    window.open(`https://wa.me/${collegeConfig.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
    setSuccess("Your enquiry has been prepared for WhatsApp.");
  };
  const handleStep = (action?: string) => {
    if (action === "enquiry") openEnquiry();
    if (action === "faq") scrollToFaq();
    if (action === "form") scrollToForm();
  };

  useLayoutEffect(() => {
    const node = pageRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".admissions-hero-image", { scale: 1 }, { scale: 1.025, duration: 8, ease: "power1.out" });
      gsap.fromTo(".admissions-hero-title span", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
      gsap.fromTo(".admissions-line-fill", { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: ".admissions-process-timeline", start: "top 78%" } });
      gsap.utils.toArray<HTMLElement>(".admissions-step").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, x: index % 2 === 0 ? -30 : 30 }, { opacity: 1, x: 0, duration: 0.78, delay: index * 0.08, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%" } });
      });
      gsap.utils.toArray<HTMLElement>(".admissions-reveal").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, delay: (index % 3) * 0.06, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%" } });
      });
    }, node);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="admissions-page" ref={pageRef}>
    <section className="admissions-hero">
      <div className="admissions-hero-slider" aria-hidden="true">
        {heroSlides.map((slide, index) => <img className={`admissions-hero-image admissions-hero-slide ${heroSlide === index ? "is-active" : ""}`} src={slide.src} alt="" key={slide.src} />)}
      </div>
      <div className="admissions-hero-overlay" />
      <div className="admissions-hero-content">
        <p className="admissions-eyebrow">Admissions</p>
        <h1 className="admissions-hero-title"><span>Your journey</span><span>starts here.</span></h1>
        <p>From choosing the right program to confirming your seat, every step is designed to be clear and supportive.</p>
        <button className="admissions-link" type="button" onClick={scrollToProcess}>Explore Admission Steps <ArrowRight size={15} /></button>
      </div>
      <div className="admissions-hero-dots" aria-label="Admission hero slides">
        {heroSlides.map((slide, index) => <button className={heroSlide === index ? "is-active" : ""} key={slide.src} onClick={() => setHeroSlide(index)} aria-label={`Show ${slide.alt}`} />)}
      </div>
    </section>

    <section className="admissions-intro-section">
      <div className="admissions-intro-inner">
        <p className="admissions-eyebrow">Admission Guidance</p>
        <h2>Find your course, understand the steps, and connect with our admissions team.</h2>
        <p>Review the course information and documents below, then send an enquiry for guidance on what comes next.</p>
      </div>
    </section>

    <section className="admissions-eligibility-section">
      <div className="admissions-eligibility-inner">
        <div className="admissions-reveal">
          <p className="admissions-eyebrow">Find Your Eligibility</p>
          <h2>Choose your course and see what you need.</h2>
          <div className="admissions-course-tabs">{courses.map((item) => <button className={course.slug === item.slug ? "is-active" : ""} key={item.slug} onClick={() => setCourse(item)}>{item.shortTitle}</button>)}</div>
        </div>
        <article className="admissions-course-panel admissions-reveal" key={course.slug}>
          <p className="admissions-eyebrow">Selected Program</p>
          <h3>{course.title}</h3>
          <dl>
            <div><dt>Duration</dt><dd>{course.duration}</dd></div>
            <div><dt>Eligibility</dt><dd>{course.eligibility}</dd></div>
            <div><dt>Qualification</dt><dd>{course.qualification}</dd></div>
          </dl>
          <p>{course.notes}</p>
          <button className="admissions-link" onClick={start}>Enquire About This Course <ArrowRight size={15} /></button>
        </article>
      </div>
    </section>

    <section className="admissions-process-section" ref={processRef}>
      <div className="admissions-process-inner">
        <header className="admissions-process-header admissions-reveal">
          <div>
            <p className="admissions-eyebrow">Admission Process</p>
            <h2>Your journey to DC.</h2>
          </div>
          <p>From choosing the right program to confirming your admission, follow five steps to begin your journey at DC College.</p>
        </header>
        <div className="admissions-process-timeline">
          <span className="admissions-timeline-line"><span className="admissions-line-fill" /></span>
          {admissionProcess.map((step, index) => {
            const content = <article className={`admissions-step ${index % 2 === 0 ? "is-left" : "is-right"}`}>
              <span className="admissions-step-node">{step.no}</span>
              <div className="admissions-step-card">
                <span className="admissions-step-bg">{step.no}</span>
                <p>{`STEP ${step.no}`}</p>
                <h3>{step.title}<ArrowRight size={16} /></h3>
                <span className="admissions-step-accent" />
                <p>{step.description}</p>
                <strong>{step.micro}</strong>
              </div>
            </article>;
            if (step.href) return <Link className="admissions-step-link" to={step.href} key={step.no}>{content}</Link>;
            return <button className="admissions-step-link" type="button" onClick={() => handleStep(step.action)} key={step.no}>{content}</button>;
          })}
        </div>
      </div>
    </section>

    <section className="admissions-documents-section">
      <div className="admissions-section-inner">
        <header className="admissions-section-header admissions-reveal"><p className="admissions-eyebrow">Documents Required</p><h2>Bring the essentials. We'll guide the rest.</h2></header>
        <div className="admissions-doc-list">{docs.map((doc) => <div className="admissions-doc-item admissions-reveal" key={doc}><Check size={17} /><span>{doc}</span></div>)}</div>
      </div>
    </section>

    <section className="admissions-faq-section" ref={faqRef}>
      <div className="admissions-faq-inner">
        <div className="admissions-reveal">
          <p className="admissions-eyebrow">Important Guidance</p>
          <h2>Merit, clarity and support through every stage.</h2>
          <div className="admissions-scholarship-notes">
            <p>Applications reviewed weekly during the admission window.</p>
            <p>Scholarships are available for meritorious and deserving students.</p>
            <p>Campus preview and counselling help students choose confidently.</p>
          </div>
        </div>
        <div className="admissions-faq-list admissions-reveal">
          {faqs.map((q, index) => <button key={q} className="admissions-faq-item" onClick={() => setFaq(faq === index ? -1 : index)} aria-expanded={faq === index}>
            <span>{q}{faq === index ? <Minus size={17} /> : <Plus size={17} />}</span>
            {faq === index && <p>{faqAnswers[index]}</p>}
          </button>)}
        </div>
      </div>
    </section>

    <section className="home-enquiry-section admissions-home-enquiry-section">
      <div className="home-enquiry-overlay" />
      <div className="home-enquiry-inner">
        <div className="home-enquiry-copy admissions-reveal">
          <p>Admission Enquiry</p>
          <h2>Let&apos;s start your journey at DC College.</h2>
          <span>Your future deserves the right beginning.</span>
          <div className="home-enquiry-actions">
            <a href="#admission-enquiry-form" className="home-enquiry-primary">Enquire Now <ArrowRight size={15} /></a>
            <a href={collegeConfig.phoneHref} className="home-enquiry-secondary">Contact DC College</a>
          </div>
        </div>
        <form id="admission-enquiry-form" ref={formRef} onSubmit={submit} className="home-enquiry-form admissions-reveal" noValidate>
          <h3>Admission Enquiry</h3>
          {success && <div className="admissions-success" role="status">{success}</div>}
          <div className="home-enquiry-fields">
            <label>Full Name *
              <input value={enquiryForm.name} onChange={(event) => updateEnquiry("name", event.target.value)} placeholder="Student full name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "admission-name-error" : undefined} />
              {errors.name && <small id="admission-name-error" role="alert">{errors.name}</small>}
            </label>
            <label>Email Address
              <input type="email" value={enquiryForm.email} onChange={(event) => updateEnquiry("email", event.target.value)} placeholder="name@example.com" autoComplete="email" />
            </label>
            <label>Phone Number *
              <input type="tel" value={enquiryForm.phone} onChange={(event) => updateEnquiry("phone", event.target.value)} placeholder="+91" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "admission-phone-error" : undefined} />
              {errors.phone && <small id="admission-phone-error" role="alert">{errors.phone}</small>}
            </label>
            <label>Course Interested In *
              <select value={enquiryForm.course} onChange={(event) => updateEnquiry("course", event.target.value)} aria-invalid={Boolean(errors.course)} aria-describedby={errors.course ? "admission-course-error" : undefined}>
                {courses.map((c) => <option key={c.slug}>{c.title}</option>)}
                <option>Not Sure Yet</option>
              </select>
              {errors.course && <small id="admission-course-error" role="alert">{errors.course}</small>}
            </label>
            <label className="home-enquiry-wide">Message / Query
              <textarea value={enquiryForm.message} onChange={(event) => updateEnquiry("message", event.target.value)} placeholder="Tell us what you would like to know" />
            </label>
          </div>
          <p className="home-enquiry-note">Your enquiry will open directly in WhatsApp with the details pre-filled.</p>
          <button className="home-enquiry-submit" type="submit">Continue on WhatsApp <ArrowRight size={15} /></button>
        </form>
      </div>
    </section>
  </div>;
}
