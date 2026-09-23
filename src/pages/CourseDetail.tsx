import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { courses } from "../data/courses";
import type { Course } from "../data/courses";

gsap.registerPlugin(ScrollTrigger);

const bbaOverview = "A future-focused business program designed around management, communication, leadership and practical industry exposure.";

const bbaInfo = [
  { no: "03", label: "Value-Added Certifications", title: "Certifications that add career value", items: ["Business Analytics", "Digital Marketing", "Entrepreneurship", "Financial Literacy", "Advanced Excel", "Tally / ERP Fundamentals"] },
  { no: "04", label: "Career Opportunities", title: "Career paths across business functions", items: ["Management Trainee", "Business Analyst", "Marketing Executive", "HR Associate", "Entrepreneur", "Operations Executive"] },
  { no: "05", label: "Skills Gained", title: "Skills built through practice", items: ["Leadership", "Business Communication", "Market Analysis", "Decision Making", "Team Management", "Strategic Thinking"] },
  { no: "06", label: "Program Highlights", title: "A practical business learning experience", items: ["Industry-Oriented Curriculum", "Seminar-Led Learning", "Placement Readiness", "Entrepreneurship Exposure", "Live Projects", "Corporate Interaction"] }
];

const experience = [
  ["01", "Case Studies", "Learn through real-world business scenarios."],
  ["02", "Live Projects", "Work on practical assignments and market challenges."],
  ["03", "Industry Exposure", "Interact with professionals and understand business environments."]
];

const careers = ["Management", "Marketing", "Human Resources", "Business Analytics", "Entrepreneurship", "Operations"];

const whyBba = [
  ["01", "Practical Learning", "Business concepts connected to real-world applications."],
  ["02", "Career-Focused Curriculum", "A program structure built around placement readiness and confidence."],
  ["03", "Industry Interaction", "Exposure to professional perspectives, seminars and business environments."],
  ["04", "Entrepreneurship Mindset", "Guidance for students who want to lead, create and build opportunities."]
];

type PremiumCourseConfig = {
  slug: string;
  variant: string;
  titleLines: string[];
  image: string;
  heroCopy: string;
  metadata: string[];
  overviewTitle: string;
  overviewCopy: string[];
  info: { no: string; label: string; title: string; items: string[] }[];
  experienceLabel: string;
  experienceTitle: string;
  experienceImage: string;
  experience: string[][];
  stackLabel: string;
  stackTitle: string;
  stackItems: string[];
  journeyLabel: string;
  journeyItems: string[];
  careerLabel: string;
  careerTitle: string;
  careerItems: string[];
  secondaryCareer?: { label: string; items: string[] };
  whyLabel: string;
  whyTitle: string;
  whyItems: string[][];
  ctaLabel: string;
  ctaTitle: string;
  ctaCopy: string;
};

const premiumCourseConfigs: Record<string, PremiumCourseConfig> = {
  bca: {
    slug: "BCA",
    variant: "bca",
    titleLines: ["BCA"],
    image: "/images/courses/bca.png",
    heroCopy: "A technology-driven degree built around programming, problem solving, modern computing and practical digital skills.",
    metadata: ["Computing", "Project-Based"],
    overviewTitle: "Built for academic depth and digital capability.",
    overviewCopy: ["A computing program focused on programming, databases, networks and modern application development.", "The course balances technical foundations with project practice, full-stack development, cloud basics, cybersecurity and interview preparation."],
    info: [
      { no: "03", label: "Value-Added Certifications", title: "Technical certifications", items: ["Full Stack Development", "Python Programming", "Cloud Basics", "Cybersecurity Fundamentals", "Database Technologies", "Web Technologies"] },
      { no: "04", label: "Career Opportunities", title: "From code to career", items: ["Software Developer", "Web Developer", "Data Analyst", "Systems Associate", "QA Engineer", "Cloud Support Associate"] },
      { no: "05", label: "Skills Gained", title: "Digital capability in practice", items: ["Programming", "Database Design", "Problem Solving", "Web Development", "Technical Communication", "Software Engineering"] },
      { no: "06", label: "Program Highlights", title: "A project-focused technology experience", items: ["Lab-Intensive Learning", "Project Portfolio", "Coding Club Access", "CRT Support", "Hackathons", "Industry Exposure"] }
    ],
    experienceLabel: "Build, Code, Create",
    experienceTitle: "Build, code and create from day one.",
    experienceImage: "/images/students/class2.png",
    experience: [["01", "Build", "Create real applications and practical projects."], ["02", "Code", "Strengthen programming through hands-on practice."], ["03", "Create", "Turn ideas into working digital solutions."]],
    stackLabel: "Technologies You'll Work With",
    stackTitle: "A clean foundation for modern software work.",
    stackItems: ["Python", "HTML / CSS / JavaScript", "SQL", "Cloud Computing", "Cybersecurity", "Data Analytics", "Full Stack Development"],
    journeyLabel: "Project Journey",
    journeyItems: ["Foundations", "Programming", "Full Stack", "Cloud", "Project Portfolio", "Career Readiness"],
    careerLabel: "Where BCA Can Take You",
    careerTitle: "From code to career.",
    careerItems: ["Software Development", "Web Development", "Data Analytics", "QA & Testing", "Cloud Support", "Systems & IT", "Higher Studies"],
    whyLabel: "Why BCA At DC",
    whyTitle: "Why study BCA at DC College?",
    whyItems: [["01", "Hands-On Learning", "Build practical skills through coding and projects."], ["02", "Modern Computing Labs", "Learn in technology-focused lab environments."], ["03", "Project-Based Curriculum", "Shape a portfolio through applied assignments."], ["04", "Career Preparation", "Prepare for interviews, roles and technical confidence."]],
    ctaLabel: "Ready To Start Coding Your Future?",
    ctaTitle: "Build the skills behind tomorrow's technology.",
    ctaCopy: "Start your BCA journey at DC College and turn curiosity into capability."
  },
  "bcom-computers": {
    slug: "B.Com Computer Applications",
    variant: "bcom",
    titleLines: ["B.Com Computer", "Applications"],
    image: "/images/courses/bcom.png",
    heroCopy: "A commerce degree that blends accounting, finance and business knowledge with practical computer applications.",
    metadata: ["Commerce", "Technology-Enabled"],
    overviewTitle: "Commerce strengthened by digital capability.",
    overviewCopy: ["A commerce program that combines accounting, taxation, business law and computer applications.", "Students develop finance-ready skills while learning spreadsheets, accounting software, GST practice and practical tools used by modern companies."],
    info: [
      { no: "03", label: "Value-Added Certifications", title: "Finance and software readiness", items: ["Tally Prime with GST", "SAP / FICO Basics", "Advanced Excel", "Income Tax & GST Filing", "Stock Market Fundamentals", "Accounting Software"] },
      { no: "04", label: "Career Opportunities", title: "Professional commerce roles", items: ["Accountant", "Tax Associate", "Banking Associate", "Finance Executive", "Operations Coordinator", "Accounts Executive"] },
      { no: "05", label: "Skills Gained", title: "Commerce capability for modern workplaces", items: ["Financial Accounting", "Spreadsheet Analysis", "Commercial Awareness", "Reporting", "Digital Finance Tools", "Business Communication"] },
      { no: "06", label: "Program Highlights", title: "Commerce plus technology", items: ["Commerce Plus Technology", "Practical Accounting Labs", "Banking Preparation", "Affordable Career Pathway", "Industry Interaction", "Placement Preparation"] }
    ],
    experienceLabel: "Commerce In Practice",
    experienceTitle: "Learn commerce through real financial practice.",
    experienceImage: "/images/courses/bcom.png",
    experience: [["01", "Account", "Understand transactions, ledgers and financial statements."], ["02", "Analyse", "Use spreadsheets and data to support business decisions."], ["03", "Apply", "Work with taxation, GST and accounting software."]],
    stackLabel: "Finance + Technology",
    stackTitle: "Modern commerce needs digital confidence.",
    stackItems: ["Accounting", "Taxation", "GST", "Advanced Excel", "Tally", "SAP Basics", "Banking", "Financial Analysis"],
    journeyLabel: "Accounting Timeline",
    journeyItems: ["Foundations", "Accounting", "Taxation", "Financial Tools", "Business Applications", "Career Readiness"],
    careerLabel: "Career Directions",
    careerTitle: "Build a career across finance, banking and business operations.",
    careerItems: ["Accounting", "Taxation", "Banking", "Finance Operations", "Business Support", "Corporate Administration"],
    whyLabel: "Why B.Com At DC",
    whyTitle: "Why study B.Com Computer Applications at DC College?",
    whyItems: [["01", "Commerce + Technology", "A practical combination for modern workplaces."], ["02", "Industry Tools", "Learn software and spreadsheet skills used in finance."], ["03", "Career Preparation", "Build confidence for banking, accounting and corporate roles."], ["04", "Practical Learning", "Understand concepts through exercises, labs and projects."]],
    ctaLabel: "Your Commerce Career Starts Here",
    ctaTitle: "Turn financial knowledge into professional capability.",
    ctaCopy: "Start your B.Com journey at DC College and build practical skills for finance, banking and business."
  },
  "bsc-computer-science": {
    slug: "B.Sc Computer Science",
    variant: "bsc",
    titleLines: ["B.Sc Computer", "Science"],
    image: "/images/courses/b.sc.png",
    heroCopy: "A science-led computing program built around programming, algorithms, data, systems and modern technology applications.",
    metadata: ["Computing", "Data & Systems", "Career Focused"],
    overviewTitle: "Built around logic, systems and discovery.",
    overviewCopy: ["A science-led computing program covering algorithms, programming, data structures and systems.", "Students build analytical depth through lab work, projects and modern technology exposure."],
    info: [
      { no: "03", label: "Value-Added Certifications", title: "Foundational technical certifications", items: ["Data Science Basics", "Java Programming", "Database Systems", "AI Foundations"] },
      { no: "04", label: "Career Opportunities", title: "Technology and research pathways", items: ["Developer", "Data Associate", "Technical Support Engineer", "Research Assistant", "Systems Analyst"] },
      { no: "05", label: "Skills Gained", title: "Analytical computing ability", items: ["Algorithms", "Logical Reasoning", "Data Handling", "Systems Thinking", "Applied Mathematics"] },
      { no: "06", label: "Program Highlights", title: "Strong CS foundations", items: ["Strong CS Foundations", "Hands-on Laboratories", "Higher Studies Readiness", "Career Guidance"] }
    ],
    experienceLabel: "From Theory To Lab",
    experienceTitle: "Where theory becomes experimentation.",
    experienceImage: "/images/courses/b.sc.png",
    experience: [["01", "Lab Practice", "Apply concepts in structured computing labs."], ["02", "Mini Projects", "Turn theoretical learning into working solutions."], ["03", "Research Thinking", "Learn to analyse, test and improve computational ideas."]],
    stackLabel: "Core Disciplines",
    stackTitle: "Understand computing from the inside out.",
    stackItems: ["Algorithms", "Programming", "Data Structures", "Systems", "Databases", "Mathematics"],
    journeyLabel: "Computing Journey",
    journeyItems: ["Foundations", "Programming", "Data Structures", "Databases", "Systems", "Projects", "Career / Higher Studies"],
    careerLabel: "After B.Sc Computer Science",
    careerTitle: "Move into technology, research or higher studies.",
    careerItems: ["Software Development", "Data Operations", "Technical Support", "Systems Roles", "Research Assistance"],
    secondaryCareer: { label: "Higher Studies", items: ["M.Sc Computer Science", "MCA", "Data Science", "Artificial Intelligence", "Research Programs"] },
    whyLabel: "Why B.Sc CS At DC",
    whyTitle: "Why study B.Sc Computer Science at DC College?",
    whyItems: [["01", "Strong Foundations", "Build a deep understanding of core computer science principles."], ["02", "Lab-Based Learning", "Strengthen theory through hands-on practice."], ["03", "Analytical Thinking", "Develop logic, reasoning and structured problem-solving."], ["04", "Future Pathways", "Prepare for careers, certifications and higher studies."]],
    ctaLabel: "Ready To Explore Computer Science?",
    ctaTitle: "Build strong foundations for a future in technology.",
    ctaCopy: "Start your B.Sc Computer Science journey at DC College and strengthen the logic, technical knowledge and practical skills behind modern computing."
  }
};

function BbaCourseDetail({ course, openEnquiry }: { course: Course; openEnquiry: (course?: string) => void }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const overviewDownload = `data:text/plain;charset=utf-8,${encodeURIComponent(`DC College - BBA Course Overview

${bbaOverview}

Duration: ${course.duration}
Eligibility: ${course.eligibility}

Certifications:
${course.certifications.map((item) => `- ${item}`).join("\n")}

Career Opportunities:
${course.careers.map((item) => `- ${item}`).join("\n")}`)}`;

  useLayoutEffect(() => {
    const node = pageRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".bba-hero-image", { scale: 1 }, { scale: 1.03, duration: 9, ease: "power1.out" });
      gsap.fromTo(".bba-hero-title span span", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
      gsap.fromTo(".bba-hero-meta span", { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: "power3.out", delay: 0.25 });
      gsap.utils.toArray<HTMLElement>(".bba-reveal").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.75, delay: (index % 3) * 0.06, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%" } });
      });
      gsap.utils.toArray<HTMLElement>(".bba-image-reveal").forEach((item) => {
        gsap.fromTo(item, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)", duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 82%" } });
      });
      gsap.utils.toArray<HTMLElement>(".bba-title-line span").forEach((item) => {
        gsap.fromTo(item, { yPercent: 110 }, { yPercent: 0, duration: 0.82, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%" } });
      });
      gsap.utils.toArray<HTMLElement>(".bba-info-block").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 26 }, { opacity: 1, y: 0, delay: (index % 2) * 0.08, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%" } });
      });
      gsap.fromTo(".bba-career-item", { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.62, ease: "power3.out", scrollTrigger: { trigger: ".bba-career-list", start: "top 84%" } });
    }, node);

    return () => ctx.revert();
  }, []);

  return <div className="bba-detail-page" ref={pageRef}>
    <section className="bba-hero">
      <img className="bba-hero-image" src="/images/courses/bba.png" alt="BBA student in a professional business learning environment" />
      <div className="bba-hero-overlay" />
      <div className="bba-hero-content">
        <Link className="bba-back-link" to="/courses"><ArrowLeft size={15} /> Back to Courses</Link>
        <p className="bba-eyebrow">Course Detail</p>
        <h1 className="bba-hero-title"><span><span>BBA</span></span></h1>
        <p className="bba-hero-copy">{bbaOverview}</p>
        <div className="bba-hero-meta" aria-label="BBA metadata">{[course.duration, "Management", "Career Focused"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className="bba-actions">
          <button className="bba-link course-enquiry-primary" type="button" onClick={() => openEnquiry("BBA")}>Enquire About BBA <ArrowRight size={15} /></button>
          <a className="bba-link" href={overviewDownload} download="dc-college-bba-overview.txt">Download Course Overview</a>
        </div>
      </div>
    </section>

    <section className="bba-overview-section">
      <div className="bba-overview-inner">
        <figure className="bba-overview-media bba-image-reveal"><img className="bba-overview-image" src="/images/courses/bba.png" alt="BBA management student on campus" /></figure>
        <div className="bba-overview-copy bba-reveal">
          <p className="bba-eyebrow">Program Overview</p>
          <h2 className="bba-section-title"><span className="bba-title-line"><span>Built for academic depth</span></span><span className="bba-title-line"><span>and career movement.</span></span></h2>
          <div className="bba-copy-lines"><p>A business program built around management fundamentals, communication, leadership and practical exposure.</p><p>Students learn through case discussions, presentations, industry tasks and career-focused training.</p></div>
          <button className="bba-link dark" type="button" onClick={() => openEnquiry("BBA")}>Enquire About BBA <ArrowRight size={15} /></button>
        </div>
      </div>
    </section>

    <section id="bba-course-information" className="bba-info-section">
      <div className="bba-section-header bba-reveal"><p className="bba-eyebrow">Course Information</p></div>
      <div className="bba-info-grid">{[{ no: "01", label: "Duration", title: course.duration, items: [] }, { no: "02", label: "Eligibility", title: course.eligibility, items: [course.qualification] }, ...bbaInfo].map((block) => <article className="bba-info-block" key={block.no}><span className="bba-info-index">{block.no}</span><p className="bba-info-label">{block.label}</p><h3>{block.title}</h3>{block.items.length > 0 && <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}</article>)}</div>
    </section>

    <section className="bba-experience-section">
      <div className="bba-experience-inner">
        <div className="bba-experience-copy bba-reveal"><p className="bba-eyebrow">BBA Experience</p><h2 className="bba-section-title"><span className="bba-title-line"><span>Learn business by</span></span><span className="bba-title-line"><span>doing business.</span></span></h2></div>
        <div className="bba-experience-image bba-image-reveal"><img src="/images/students/class2.png" alt="Students learning in a management classroom" /></div>
        <div className="bba-experience-points">{experience.map(([no, title, text]) => <article className="bba-experience-point bba-reveal" key={title}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="bba-career-section">
      <div className="bba-section-header bba-reveal"><p className="bba-eyebrow">Where BBA Can Take You</p><h2 className="bba-section-title"><span className="bba-title-line"><span>Build a career across business,</span></span><span className="bba-title-line"><span>management and entrepreneurship.</span></span></h2></div>
      <div className="bba-career-list">{careers.map((career) => <p className="bba-career-item" key={career}>{career}</p>)}</div>
    </section>

    <section className="bba-why-section">
      <div className="bba-section-header bba-reveal"><p className="bba-eyebrow">Why BBA At DC</p><h2 className="bba-section-title"><span className="bba-title-line"><span>Why pursue BBA</span></span><span className="bba-title-line"><span>at DC College?</span></span></h2></div>
      <div className="bba-why-grid">{whyBba.map(([no, title, text]) => <article className="bba-why-column bba-reveal" key={title}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="bba-final-cta">
      <div className="bba-final-inner bba-reveal">
        <p className="bba-eyebrow">Ready To Begin?</p>
        <h2 className="bba-section-title"><span className="bba-title-line"><span>Turn your ambition into</span></span><span className="bba-title-line"><span>a business career.</span></span></h2>
        <p>Start your BBA journey at DC College and build the skills to lead, communicate and create opportunities.</p>
        <div className="bba-actions"><button className="bba-link course-enquiry-primary" type="button" onClick={() => openEnquiry("BBA")}>Enquire About BBA <ArrowRight size={15} /></button><button className="bba-link" type="button" onClick={() => openEnquiry()}>General Enquiry</button></div>
      </div>
    </section>
  </div>;
}

function PremiumCourseDetail({ config, course, openEnquiry }: { config: PremiumCourseConfig; course: Course; openEnquiry: (course?: string) => void }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const download = `data:text/plain;charset=utf-8,${encodeURIComponent(`DC College - ${config.slug} Course Overview

${config.heroCopy}

Duration: ${course.duration}
Eligibility: ${course.eligibility}

${config.info.map((section) => `${section.label}:
${section.items.map((item) => `- ${item}`).join("\n")}`).join("\n\n")}`)}`;

  useLayoutEffect(() => {
    const node = pageRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".premium-hero-image", { scale: 1 }, { scale: 1.025, duration: 9, ease: "power1.out" });
      gsap.fromTo(".premium-hero-title span span", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
      gsap.fromTo(".premium-hero-meta span", { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: "power3.out", delay: 0.25 });
      gsap.utils.toArray<HTMLElement>(".premium-reveal").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.72, delay: (index % 3) * 0.06, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%" } });
      });
      gsap.utils.toArray<HTMLElement>(".premium-image-reveal").forEach((item) => {
        gsap.fromTo(item, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)", duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 82%" } });
      });
      gsap.fromTo(".premium-stack-row", { opacity: 0, x: -18 }, { opacity: 1, x: 0, stagger: 0.07, duration: 0.58, ease: "power3.out", scrollTrigger: { trigger: ".premium-stack-list", start: "top 84%" } });
      gsap.fromTo(".premium-journey-step", { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.58, ease: "power3.out", scrollTrigger: { trigger: ".premium-journey-track", start: "top 86%" } });
    }, node);
    return () => ctx.revert();
  }, []);

  return <div className={`premium-course-page premium-${config.variant}`} ref={pageRef}>
    <section className="premium-hero">
      <img className="premium-hero-image" src={config.image} alt={`${config.slug} academic environment`} />
      <div className="premium-hero-overlay" />
      <div className="premium-hero-content">
        <Link className="bba-back-link" to="/courses"><ArrowLeft size={15} /> Back to Courses</Link>
        <p className="bba-eyebrow">Course Detail</p>
        <h1 className="premium-hero-title">{config.titleLines.map((line) => <span key={line}><span>{line}</span></span>)}</h1>
        <p className="premium-hero-copy">{config.heroCopy}</p>
        <div className="premium-hero-meta">{[course.duration, ...config.metadata].map((item) => <span key={item}>{item}</span>)}</div>
        <div className="bba-actions"><button className="bba-link course-enquiry-primary" type="button" onClick={() => openEnquiry(config.slug)}>Enquire About {config.slug} <ArrowRight size={15} /></button><a className="bba-link" href={download} download={`dc-college-${config.variant}-overview.txt`}>Download Course Overview</a></div>
      </div>
    </section>

    <section className="premium-overview-section">
      <div className="premium-overview-inner">
        <figure className="premium-overview-media premium-image-reveal"><img src={config.image} alt={`${config.slug} program overview`} /></figure>
        <div className="premium-overview-copy premium-reveal"><p className="bba-eyebrow">Program Overview</p><h2 className="bba-section-title">{config.overviewTitle}</h2><div className="bba-copy-lines">{config.overviewCopy.map((line) => <p key={line}>{line}</p>)}</div><button className="bba-link dark" type="button" onClick={() => openEnquiry(config.slug)}>Enquire About {config.slug} <ArrowRight size={15} /></button></div>
      </div>
    </section>

    <section className="premium-info-section">
      <div className="bba-section-header premium-reveal"><p className="bba-eyebrow">Course Information</p></div>
      <div className="premium-info-grid">{[{ no: "01", label: "Duration", title: course.duration, items: [] }, { no: "02", label: "Eligibility", title: course.eligibility, items: [course.qualification] }, ...config.info].map((block) => <article className="premium-info-block premium-reveal" key={block.no}><span className="premium-info-index">{block.no}</span><p className="bba-info-label">{block.label}</p><h3>{block.title}</h3>{block.items.length > 0 && <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}</article>)}</div>
    </section>

    <section className="premium-experience-section">
      <div className="premium-experience-inner">
        <div className="premium-reveal"><p className="bba-eyebrow">{config.experienceLabel}</p><h2 className="bba-section-title">{config.experienceTitle}</h2></div>
        <div className="premium-experience-image premium-image-reveal"><img src={config.experienceImage} alt={config.experienceTitle} /></div>
        <div className="premium-experience-points">{config.experience.map(([no, title, text]) => <article className="premium-experience-point premium-reveal" key={title}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="premium-stack-section">
      {config.variant === "bsc" && <div className="premium-data-motif" aria-hidden="true"><span /><span /><span /><span /></div>}
      <div className="bba-section-header premium-reveal"><p className="bba-eyebrow">{config.stackLabel}</p><h2 className="bba-section-title">{config.stackTitle}</h2></div>
      <div className="premium-stack-list">{config.stackItems.map((item) => <p className="premium-stack-row" key={item}>{item}</p>)}</div>
    </section>

    <section className="premium-journey-section">
      <div className="bba-section-header premium-reveal"><p className="bba-eyebrow">{config.journeyLabel}</p></div>
      <div className="premium-journey-track">{config.journeyItems.map((item, index) => <div className="premium-journey-step" key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div>
    </section>

    <section className="premium-career-section">
      <div className="bba-section-header premium-reveal"><p className="bba-eyebrow">{config.careerLabel}</p><h2 className="bba-section-title">{config.careerTitle}</h2></div>
      <div className={config.secondaryCareer ? "premium-career-split" : "premium-career-list"}><div>{config.secondaryCareer && <p className="premium-career-kicker">Career Paths</p>}{config.careerItems.map((item) => <p className="premium-career-row premium-reveal" key={item}>{item}</p>)}</div>{config.secondaryCareer && <div><p className="premium-career-kicker">{config.secondaryCareer.label}</p>{config.secondaryCareer.items.map((item) => <p className="premium-career-row premium-reveal" key={item}>{item}</p>)}</div>}</div>
    </section>

    <section className="premium-why-section">
      <div className="bba-section-header premium-reveal"><p className="bba-eyebrow">{config.whyLabel}</p><h2 className="bba-section-title">{config.whyTitle}</h2></div>
      <div className="premium-why-grid">{config.whyItems.map(([no, title, text]) => <article className="bba-why-column premium-reveal" key={title}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="premium-final-cta">
      <div className="bba-final-inner premium-reveal"><p className="bba-eyebrow">{config.ctaLabel}</p><h2 className="bba-section-title">{config.ctaTitle}</h2><p>{config.ctaCopy}</p><div className="bba-actions"><button className="bba-link course-enquiry-primary" type="button" onClick={() => openEnquiry(config.slug)}>Enquire About {config.slug} <ArrowRight size={15} /></button><button className="bba-link" type="button" onClick={() => openEnquiry()}>General Enquiry</button></div></div>
    </section>
  </div>;
}

export default function CourseDetail({ openEnquiry }: { openEnquiry: (course?: string) => void }) {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);
  if (!course) return <Navigate to="/courses" replace />;
  if (course.slug === "bba") return <BbaCourseDetail course={course} openEnquiry={openEnquiry} />;
  const premiumConfig = premiumCourseConfigs[course.slug];
  if (premiumConfig) return <PremiumCourseDetail config={premiumConfig} course={course} openEnquiry={openEnquiry} />;
  const cards = [["01", "Duration", [course.duration]], ["02", "Eligibility", [course.eligibility]], ["03", "Value-Added Certifications", course.certifications], ["04", "Career Opportunities", course.careers], ["05", "Skills Gained", course.skills], ["06", "Program Highlights", course.highlights]];
  return <div className="page bg-navy text-white"><section className="hero min-h-[72vh]"><div className="hero-media visual min-h-0" data-label={course.shortTitle} /><div className="container relative z-10 pb-20"><Link className="course-detail-back-link" to="/courses"><ArrowLeft size={15} /> Back to Courses</Link><p className="eyebrow mt-6">Course Detail</p><h1 className="h1 mt-5">{course.title}</h1></div></section><section className="section"><div className="container grid gap-10 lg:grid-cols-2"><div className="visual h-[480px] min-h-0 clip-grad" data-label={course.shortTitle} /><div className="glass p-8"><p className="eyebrow">Program Overview</p><h2 className="h3 mt-3">Built for academic depth and career movement.</h2>{course.description.map((line) => <p className="mt-5 leading-8 text-white/70" key={line}>{line}</p>)}<button className="btn mt-8" onClick={() => openEnquiry(course.title)}>Apply Now</button></div></div><div className="container mt-16 grid gap-5 md:grid-cols-2">{cards.map(([no, title, items], index) => <article key={String(title)} className={`glass relative overflow-hidden p-7 ${index > 1 ? "md:col-span-1" : ""}`}><span className="absolute right-4 top-2 font-display text-8xl text-white/5">{no as string}</span><p className="eyebrow">{no as string}</p><h3 className="mt-3 text-2xl font-black">{title as string}</h3><span className="my-5 block h-px w-14 bg-gold" /><ul className="grid gap-2 text-white/72">{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section></div>;
}
