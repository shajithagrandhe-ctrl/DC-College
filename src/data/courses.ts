export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  description: string[];
  image: string;
  duration: string;
  eligibility: string;
  qualification: string;
  notes: string;
  certifications: string[];
  careers: string[];
  skills: string[];
  highlights: string[];
}
export const courses: Course[] = [
  { slug: "bba", title: "BBA", shortTitle: "BBA", image: "/images/courses/bba.png", duration: "3 Years", eligibility: "10+2 from a recognized board.", qualification: "Intermediate or equivalent in any stream.", notes: "Ideal for students interested in management, entrepreneurship and business leadership.", description: ["A business program built around management fundamentals, communication, leadership and practical exposure.", "Students learn through case discussions, presentations, industry tasks and career-focused training."], certifications: ["Business Analytics", "Digital Marketing", "Entrepreneurship", "Financial Literacy"], careers: ["Management Trainee", "Business Analyst", "Marketing Executive", "HR Associate", "Entrepreneur"], skills: ["Leadership", "Business communication", "Market analysis", "Decision making", "Team management"], highlights: ["Industry-oriented curriculum", "Seminar-led learning", "Placement readiness", "Entrepreneurship exposure"] },
  { slug: "bca", title: "BCA", shortTitle: "BCA", image: "/images/courses/bca.png", duration: "3 Years", eligibility: "10+2 from a recognized board.", qualification: "Intermediate or equivalent with interest in computing.", notes: "Best suited for students who want to build careers in software, web, data and IT services.", description: ["A computing program focused on programming, databases, networks and modern application development.", "The course balances technical foundations with project practice and interview preparation."], certifications: ["Full Stack Development", "Python Programming", "Cloud Basics", "Cybersecurity Fundamentals"], careers: ["Software Developer", "Web Developer", "Data Analyst", "System Associate", "QA Engineer"], skills: ["Programming", "Database design", "Problem solving", "Web development", "Technical communication"], highlights: ["Lab-intensive learning", "Project portfolio", "Coding club access", "CRT support"] },
  { slug: "bcom-computers", title: "B.Com Computer Applications", shortTitle: "B.Com", image: "/images/courses/bcom.png", duration: "3 Years", eligibility: "10+2 from a recognized board.", qualification: "Intermediate or equivalent, preferably with commerce or business interest.", notes: "Designed for commerce students who want strong digital and accounting capability.", description: ["A commerce program that combines accounting, taxation, business law and computer applications.", "Students develop finance-ready skills while learning practical tools used by modern companies."], certifications: ["Tally", "GST Practice", "Advanced Excel", "Accounting Software"], careers: ["Accountant", "Tax Associate", "Banking Associate", "Finance Executive", "Operations Coordinator"], skills: ["Accounting", "Spreadsheet analysis", "Commercial awareness", "Reporting", "Digital finance tools"], highlights: ["Commerce plus technology", "Practical accounting labs", "Banking preparation", "Affordable pathway"] },
  { slug: "bsc-computer-science", title: "B.Sc Computer Science", shortTitle: "B.Sc CS", image: "/images/courses/b.sc.png", duration: "3 Years", eligibility: "10+2 from a recognized board.", qualification: "Intermediate or equivalent with mathematics/computer science preferred.", notes: "A strong foundation for technical roles, higher studies and research-oriented computing paths.", description: ["A science-led computing program covering algorithms, programming, data structures and systems.", "Students build analytical depth through lab work, projects and modern technology exposure."], certifications: ["Data Science Basics", "Java Programming", "Database Systems", "AI Foundations"], careers: ["Developer", "Data Associate", "Technical Support Engineer", "Research Assistant", "Systems Analyst"], skills: ["Algorithms", "Logical reasoning", "Data handling", "Systems thinking", "Applied mathematics"], highlights: ["Strong CS foundations", "Hands-on laboratories", "Higher studies readiness", "Career guidance"] }
];
export const courseOptions = courses.map((course) => course.title);
