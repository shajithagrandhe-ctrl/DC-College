import { Link } from "react-router-dom";
import type { Course } from "../data/courses";

const courseMeta: Record<string, { number: string; editorialTitle: string; description: string; focus: string }> = {
  bba: {
    number: "01",
    editorialTitle: "Bachelor of Business Administration",
    description: "Develop leadership, management, communication and modern business decision-making skills.",
    focus: "Leadership / Strategy / Business Management"
  },
  bca: {
    number: "02",
    editorialTitle: "Bachelor of Computer Applications",
    description: "Build strong foundations in programming, software development, cloud computing and emerging technologies.",
    focus: "Programming / Cloud / AI / Software"
  },
  "bcom-computers": {
    number: "03",
    editorialTitle: "B.Com Computer Applications",
    description: "Combine commerce, accounting and financial knowledge with practical digital and computer applications.",
    focus: "Accounting / Finance / Taxation / Technology"
  },
  "bsc-computer-science": {
    number: "04",
    editorialTitle: "B.Sc Computer Science",
    description: "Develop expertise in programming, algorithms, data structures, networks and modern computing technologies.",
    focus: "Algorithms / Coding / Data / Computing"
  }
};

export function CourseCard({ course }: { course: Course }) {
  const meta = courseMeta[course.slug];

  return <Link to={`/courses/${course.slug}`} className="course-editorial-card group reveal" aria-label={`Explore ${course.title}`}>
    <span className="course-card-accent" />
    <div className="course-card-image">
      <img src={course.image} alt={course.title} onError={(event) => { event.currentTarget.style.display = "none"; }} />
    </div>
    <div className="course-card-body">
      <div className="course-card-topline">
        <span className="course-card-number">{meta.number}</span>
        <span className="course-card-arrow" aria-hidden="true">Explore -&gt;</span>
      </div>
      <h3>{meta.editorialTitle}</h3>
      <p>{meta.description}</p>
      <div className="course-card-focus">{meta.focus}</div>
    </div>
  </Link>;
}
