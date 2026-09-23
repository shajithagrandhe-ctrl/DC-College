import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { collegeConfig } from "../data/config";
import { courseOptions } from "../data/courses";
import { GlassModal } from "./GlassModal";

type Values = { name: string; phone: string; email: string; course: string; city: string };
const blank: Values = { name: "", phone: "", email: "", course: "", city: "" };

export function EnquiryModal({ open, onClose, selectedCourse }: { open: boolean; onClose: () => void; selectedCourse?: string }) {
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState<Partial<Values>>({});
  const firstRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setValues((v) => ({ ...v, course: selectedCourse || v.course })); setTimeout(() => firstRef.current?.focus(), 40); } }, [open, selectedCourse]);
  useEffect(() => {
    if (!open) return;
    const esc = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc); return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);
  const validate = () => {
    const next: Partial<Values> = {};
    if (!values.name.trim()) next.name = "Full name is required.";
    if (!values.phone.trim()) next.phone = "Phone number is required.";
    if (!values.course.trim()) next.course = "Please select a course.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!validate()) return;
    const message = `Hello DC College Admissions Team,\n\nI would like to enquire about admission.\n\nFull Name: ${values.name}\nPhone Number: ${values.phone}\nEmail Address: ${values.email}\nCourse Interested In: ${values.course}\nCity / Location: ${values.city}\n\nPlease share further admission details.\n\nThank you.`;
    window.open(`https://wa.me/${collegeConfig.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };
  const trap = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusables = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button,input,select,textarea,a[href]")).filter((el) => !el.hasAttribute("disabled"));
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  return <AnimatePresence>{open && <div className="fixed inset-0 z-[90] grid place-items-center bg-black/55 p-3" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={trap}>
    <GlassModal><button className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-white/20" aria-label="Close enquiry modal" onClick={onClose}><X size={18} /></button><p className="eyebrow">Admissions</p><h2 className="font-display mt-2 text-4xl">Admission Enquiry Form</h2>
      <form className="mt-7 grid gap-4" onSubmit={submit}>
        <label>Full Name *<input ref={firstRef} className="input mt-2" value={values.name} onChange={(e)=>setValues({...values,name:e.target.value})} />{errors.name && <p className="error">{errors.name}</p>}</label>
        <label>Phone Number *<input className="input mt-2" value={values.phone} onChange={(e)=>setValues({...values,phone:e.target.value})} />{errors.phone && <p className="error">{errors.phone}</p>}</label>
        <label>Email Address<input className="input mt-2" type="email" value={values.email} onChange={(e)=>setValues({...values,email:e.target.value})} /></label>
        <label>Course Interested In *<select className="input mt-2" value={values.course} onChange={(e)=>setValues({...values,course:e.target.value})}><option className="text-navy" value="">Select course</option>{courseOptions.map((course)=><option className="text-navy" key={course}>{course}</option>)}</select>{errors.course && <p className="error">{errors.course}</p>}</label>
        <label>City / Location<input className="input mt-2" value={values.city} onChange={(e)=>setValues({...values,city:e.target.value})} /></label>
        <button className="btn mt-2 justify-center" type="submit">Submit & Connect on WhatsApp</button>
      </form>
    </GlassModal>
  </div>}</AnimatePresence>;
}
