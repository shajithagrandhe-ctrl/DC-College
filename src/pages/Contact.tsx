import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collegeConfig } from "../data/config";
import { courseOptions } from "../data/courses";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  ["How can I enquire about admission?", "Use the enquiry form, WhatsApp, phone or email and our admissions team will guide you."],
  ["Can I visit the campus?", "Yes. You can contact us to plan a campus visit during working hours."],
  ["Which courses are available?", "DC College offers BBA, BCA, B.Com Computer Applications and B.Sc Computer Science."],
  ["How do I contact the placement cell?", "Use the placements contact row or send an enquiry and we will route it to the right team."],
  ["Can I connect through WhatsApp?", "Yes. The WhatsApp option connects directly with admissions support."]
];

export default function Contact({ openEnquiry }: { openEnquiry: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [faq, setFaq] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
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
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(collegeConfig.mapQuery)}`;

  useLayoutEffect(() => {
    const node = pageRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-hero-image", { scale: 1 }, { scale: 1.025, duration: 8, ease: "power1.out" });
      gsap.fromTo(".contact-hero-title span", { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.85, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, delay: (index % 4) * 0.05, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%" } });
      });
      gsap.fromTo(".contact-map-frame", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)", duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".contact-map-frame", start: "top 84%" } });
    }, node);
    return () => ctx.revert();
  }, []);

  return <div className="contact-page" ref={pageRef}>
    <section className="contact-hero">
      <img className="contact-hero-image" src="/images/students/college.png" alt="DC College campus" />
      <div className="contact-hero-overlay" />
      <div className="contact-hero-content">
        <p className="contact-eyebrow">Contact DC College</p>
        <h1 className="contact-hero-title"><span>Let's start</span><span>a conversation.</span></h1>
        <p>Whether you're exploring admissions, planning a campus visit or simply need guidance, our team is here to help.</p>
        <div className="contact-actions"><button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}>Send an Enquiry <ArrowRight size={15} /></button><a href={mapUrl} target="_blank" rel="noreferrer">Visit Campus</a></div>
      </div>
    </section>

    <section className="contact-quick-section">
      <div className="contact-quick-grid">
        <article><span>Call</span><a href={collegeConfig.phoneHref}>Call Admissions<br />{collegeConfig.phone}</a></article>
        <article><span>Email</span><a href={`mailto:${collegeConfig.email}`}>Email Admissions<br />{collegeConfig.email}</a></article>
        <article><span>WhatsApp</span><a href={`https://wa.me/${collegeConfig.whatsapp}`}>Chat with Admissions</a></article>
        <article><span>Directions</span><a href={mapUrl} target="_blank" rel="noreferrer">Find DC College</a></article>
      </div>
    </section>

    <section id="contact-enquiries" className="home-enquiry-section contact-home-enquiry-section" ref={formRef}>
      <div className="home-enquiry-overlay" />
      <div className="home-enquiry-inner">
        <div className="home-enquiry-copy contact-reveal">
          <p>Admission Enquiry</p>
          <h2>Let&apos;s start your journey at DC College.</h2>
          <span>Your future deserves the right beginning.</span>
          <div className="home-enquiry-actions">
            <a href="#contact-enquiry-form" className="home-enquiry-primary">Enquire Now <ArrowRight size={15} /></a>
            <a href={collegeConfig.phoneHref} className="home-enquiry-secondary">Contact DC College</a>
          </div>
        </div>
        <form id="contact-enquiry-form" className="home-enquiry-form contact-reveal" onSubmit={submit} noValidate>
          <h3>Admission Enquiry</h3>
          <div className="home-enquiry-fields">
            <label>Full Name *
              <input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Student full name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
              {errors.name && <small id="contact-name-error" role="alert">{errors.name}</small>}
            </label>
            <label>Email Address
              <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" autoComplete="email" />
            </label>
            <label>Phone Number *
              <input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+91" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} />
              {errors.phone && <small id="contact-phone-error" role="alert">{errors.phone}</small>}
            </label>
            <label>Course Interested In *
              <select value={form.course} onChange={(event) => update("course", event.target.value)} aria-invalid={Boolean(errors.course)} aria-describedby={errors.course ? "contact-course-error" : undefined}>
                <option value="">Select course</option>
                {courseOptions.map((course) => <option value={course} key={course}>{course}</option>)}
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
              {errors.course && <small id="contact-course-error" role="alert">{errors.course}</small>}
            </label>
            <label className="home-enquiry-wide">Message / Query
              <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell us what you would like to know" />
            </label>
          </div>
          <p className="home-enquiry-note">Your enquiry will open directly in WhatsApp with the details pre-filled.</p>
          <button className="home-enquiry-submit" type="submit">Continue on WhatsApp <ArrowRight size={15} /></button>
        </form>
      </div>
    </section>

    <section className="contact-location-section">
      <div className="contact-location-inner">
        <div className="contact-location-copy contact-reveal">
          <p className="contact-eyebrow">Campus Location</p>
          <h2>Find us on campus.</h2>
          <p>Visit DC College and experience the campus, classrooms and student environment in person.</p>
          <div className="contact-info-panel">
            <h3>{collegeConfig.name} Campus</h3>
            <p>{collegeConfig.address}</p>
            <span>Phone</span><a href={collegeConfig.phoneHref}>{collegeConfig.phone}</a>
            <span>Admissions Email</span><a href={`mailto:${collegeConfig.email}`}>{collegeConfig.email}</a>
          </div>
          <div className="contact-actions"><a href={mapUrl} target="_blank" rel="noreferrer">Get Directions <ArrowRight size={15} /></a><a href={collegeConfig.phoneHref}>Call College</a></div>
        </div>
        <a className="contact-map-frame" href={mapUrl} target="_blank" rel="noreferrer" aria-label="Open DC College location on Google Maps">
          <iframe title="DC College Map" src={`https://www.google.com/maps?q=${encodeURIComponent(collegeConfig.mapQuery)}&output=embed`} loading="lazy" />
        </a>
      </div>
    </section>

    <section className="contact-hours-section">
      <div className="contact-section-inner">
        <header className="contact-section-head contact-reveal"><p className="contact-eyebrow">Office Hours</p><h2>Visit or call during working hours.</h2></header>
        <div className="contact-hours-grid">
          <article className="contact-reveal"><span>Monday - Friday</span><strong>9:00 AM - 5:00 PM</strong></article>
          <article className="contact-reveal"><span>Saturday</span><strong>9:00 AM - 2:00 PM</strong></article>
          <article className="contact-reveal"><span>Sunday</span><strong>Closed</strong></article>
        </div>
      </div>
    </section>

    <section className="contact-faq-section">
      <div className="contact-faq-inner">
        <header className="contact-section-head contact-reveal"><p className="contact-eyebrow">Before You Contact Us</p><h2>A few answers that may help.</h2></header>
        <div className="contact-faq-list contact-reveal">{faqs.map(([question, answer], index) => <button key={question} onClick={() => setFaq(faq === index ? -1 : index)} aria-expanded={faq === index}><span>{question}{faq === index ? <Minus size={17} /> : <Plus size={17} />}</span>{faq === index && <p>{answer}</p>}</button>)}</div>
      </div>
    </section>

    <section className="contact-final-cta">
      <div className="contact-final-inner contact-reveal">
        <h2>Still have a question? We'd be happy to help.</h2>
        <p>Reach out to the DC College team and we'll guide you in the right direction.</p>
        <div className="contact-actions"><button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}>Send an Enquiry <ArrowRight size={15} /></button><a href={collegeConfig.phoneHref}>Call Admissions</a></div>
      </div>
    </section>
  </div>;
}
