'use client';
import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => gsap.fromTo(el, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
      });
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, [path]);
  return <ReactLenis root options={{ lerp: 0.085, smoothWheel: true, syncTouch: false }}>{children}</ReactLenis>;
}
