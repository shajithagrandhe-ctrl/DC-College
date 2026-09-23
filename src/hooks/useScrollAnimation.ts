import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".courses-image-frame").forEach((item) => {
        const reversed = item.closest(".is-reversed");
        gsap.fromTo(
          item,
          { opacity: 1, x: reversed ? 28 : -28, clipPath: "inset(100% 0 0 0)" },
          { x: 0, clipPath: "inset(0 0 0 0)", duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 82%" } }
        );
      });
      gsap.utils.toArray<HTMLElement>(".course-title span").forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 22, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)", duration: 0.72, delay: (index % 2) * 0.075, ease: "power3.out", scrollTrigger: { trigger: item.closest(".courses-copy") || item, start: "top 84%" } });
      });
      gsap.utils.toArray<HTMLElement>(".reveal:not(.courses-image-frame)").forEach((item, index) => {
        const reversed = item.closest(".is-reversed");
        gsap.fromTo(item, { opacity: 0, y: 28, x: reversed ? -12 : 12 }, { opacity: 1, y: 0, x: 0, duration: 0.8, delay: (index % 4) * 0.07, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%" } });
      });
    }, node);
    return () => ctx.revert();
  }, [ref]);
}
