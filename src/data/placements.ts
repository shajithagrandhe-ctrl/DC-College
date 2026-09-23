export interface Placement { name: string; course: "BBA" | "BCA" | "B.Com" | "B.Sc CS"; year: string; company: string; role: string; package: string; image: string; }
export const placementStats = ["95% Placement Assistance", "50+ Recruiting Partners", "Rs. 8.5 LPA Highest Package", "Rs. 4.2 LPA Average Package", "300+ Students Placed"];
export const placements: Placement[] = [
  { name: "Aarav Reddy", course: "BCA", year: "2026", company: "Infosys", role: "Software Associate", package: "4.8 LPA", image: "/images/students/s1.png" },
  { name: "Meera Shah", course: "BBA", year: "2026", company: "Deloitte", role: "Business Analyst", package: "5.2 LPA", image: "/images/students/s2.png" },
  { name: "Ishaan Varma", course: "B.Com", year: "2025", company: "ICICI Bank", role: "Finance Executive", package: "4.1 LPA", image: "/images/students/s3.png" },
  { name: "Sara Khan", course: "B.Sc CS", year: "2025", company: "TCS", role: "Graduate Trainee", package: "4.5 LPA", image: "/images/students/s4.png" }
];
