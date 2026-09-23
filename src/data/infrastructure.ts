const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");
export const academicInfrastructure = ["Campus","Classrooms","Syndicate Rooms","Auditorium","Labs","Learning Studios","Libraries","Convocation"].map((name) => ({
  name,
  heading: `${name} built for focus and discovery`,
  description: `DC College ${name.toLowerCase()} spaces support disciplined learning, open discussion and practical academic experiences.`,
  images: [`/images/campus/${slugify(name)}-hero.jpg`, `/images/campus/${slugify(name)}-detail-1.jpg`, `/images/campus/${slugify(name)}-detail-2.jpg`, `/images/campus/${slugify(name)}-wide.jpg`]
}));
export const nonAcademicInfrastructure = [
  { id: "01", name: "Sports", items: ["Cricket","Basketball","Volleyball","Indoor games","Outdoor competitions"], image: "/images/campus/sports.jpg" },
  { id: "02", name: "Hostel", items: ["Rooms","Study spaces","Common areas","Safety"], image: "/images/campus/hostel.jpg" },
  { id: "03", name: "Dining", items: ["Cafeteria","Dining hall","Food court"], image: "/images/campus/dining.jpg" },
  { id: "04", name: "Facilities", items: ["Medical support","Transport","Security","Student services"], image: "/images/campus/facilities.jpg" },
  { id: "05", name: "IT Network", items: ["Wi-Fi","Computer systems","Smart classrooms","Digital academic services"], image: "/images/campus/it-network.jpg" }
];
