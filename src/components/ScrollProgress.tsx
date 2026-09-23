import { useEffect, useState } from "react";
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => setProgress((window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="fixed left-0 top-0 z-[70] h-[2px] bg-gold" style={{ width: `${progress}%` }} />;
}
