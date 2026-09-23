import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { MoveToTop } from "./components/MoveToTop";
import { useLenis } from "./hooks/useLenis";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const Admission = lazy(() => import("./pages/Admission"));
const Placements = lazy(() => import("./pages/Placements"));
const LifeAtDC = lazy(() => import("./pages/LifeAtDC"));
const Contact = lazy(() => import("./pages/Contact"));
const AcademicInfrastructure = lazy(() => import("./pages/AcademicInfrastructure"));
const NonAcademicInfrastructure = lazy(() => import("./pages/NonAcademicInfrastructure"));

export type EnquiryController = { openEnquiry: (course?: string) => void };


export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useLenis();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [location.pathname]);
  const openEnquiry = () => {
    const scrollToEnquiries = () => document.getElementById("enquiries")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.pathname === "/") {
      if (location.hash !== "#enquiries") navigate({ pathname: "/", hash: "#enquiries" });
      window.setTimeout(scrollToEnquiries, 40);
      return;
    }
    navigate({ pathname: "/", hash: "#enquiries" });
  };
  return <>
    <ScrollProgress /><Navbar onEnquire={() => openEnquiry()} /><MoveToTop />
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-navy text-white">Loading DC College...</div>}>
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <Routes location={location}>
            <Route path="/" element={<Home openEnquiry={openEnquiry} />} />
            <Route path="/about" element={<About openEnquiry={openEnquiry} />} />
            <Route path="/courses" element={<Courses openEnquiry={openEnquiry} />} />
            <Route path="/courses/:slug" element={<CourseDetail openEnquiry={openEnquiry} />} />
            <Route path="/admission" element={<Admission openEnquiry={openEnquiry} />} />
            <Route path="/placements" element={<Placements openEnquiry={openEnquiry} />} />
            <Route path="/life-at-dc" element={<LifeAtDC openEnquiry={openEnquiry} />} />
            <Route path="/contact" element={<Contact openEnquiry={openEnquiry} />} />
            <Route path="/about/infrastructure/academic" element={<AcademicInfrastructure />} />
            <Route path="/about/infrastructure/non-academic" element={<NonAcademicInfrastructure />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </Suspense>
    <Footer onEnquire={() => openEnquiry()} />
  </>;
}
