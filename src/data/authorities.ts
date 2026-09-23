export interface Authority { name: string; designation: string; group: "Leadership" | "Academic Coordinators" | "Department Heads"; image: string; }
export const authorities: Authority[] = [
  { name: "Dr. R. Devender", designation: "Chairman", group: "Leadership", image: "/images/students/mr_vivek_sharma_head_commerce.png" },
  { name: "Prof. Kavitha Rao", designation: "Principal", group: "Leadership", image: "/images/students/dr_priya_nair_head_computer_science.png" },
  { name: "Dr. Sameer Kumar", designation: "Vice Principal", group: "Leadership", image: "/images/students/mr_vivek_sharma_head_commerce.png" },
  { name: "Ms. Ananya Iyer", designation: "Academic Coordinator", group: "Academic Coordinators", image: "/images/students/dr_priya_nair_head_computer_science.png" },
  { name: "Mr. Rohit Menon", designation: "Academic Coordinator", group: "Academic Coordinators", image: "/images/students/mr_vivek_sharma_head_commerce.png" },
  { name: "Dr. Priya Nair", designation: "Head, B.Sc CS", group: "Department Heads", image: "/images/students/dr_priya_nair_head_computer_science.png" },
  { name: "Mr. Vivek Sharma", designation: "Head, B.Com", group: "Department Heads", image: "/images/students/mr_vivek_sharma_head_commerce.png" },
  { name: "Ms. Farah Ali", designation: "Head, BBA", group: "Department Heads", image: "/images/students/ms_farah_ali_head_management.png" },
  { name: "Mr. Rohit Menon", designation: "Head, BCA", group: "Department Heads", image: "/images/students/mr_vivek_sharma_head_commerce.png" }
];
