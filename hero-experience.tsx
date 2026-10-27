'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function HeroExperience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-logo-wrap', { clipPath: 'inset(0 100% 0 0)', duration: 0.85 })
          .from('.hero-kicker', { y: 18, autoAlpha: 0, duration: 0.5 }, '-=0.25')
          .from('.hero-title-line', { yPercent: 115, rotate: 1.5, autoAlpha: 0, stagger: 0.13, duration: 0.9 }, '-=0.15')
          .from('.hero-copy, .hero-actions, .hero-signals', { y: 16, autoAlpha: 0, stagger: 0.1, duration: 0.55 }, '-=0.3')
          .from('.system-plate', { scale: 0.94, rotate: -2, autoAlpha: 0, duration: 1.1 }, '-=0.75')
          .from('.system-line', { strokeDashoffset: 450, duration: 0.9, stagger: 0.08 }, '-=0.75')
          .from('.system-node', { scale: 0.7, transformOrigin: 'center', autoAlpha: 0, stagger: 0.12, duration: 0.35 }, '-=0.5')
          .from('.system-note', { x: 12, autoAlpha: 0, stagger: 0.1, duration: 0.4 }, '-=0.45');

        gsap.to('.hero-orbit', {
          rotate: 12,
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
        });
        gsap.to('.system-plate', {
          y: -28,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1.1 },
        });
      }, root);
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section className="hero mfs-hero texture" ref={root} aria-labelledby="hero-title">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-inner mfs-hero-inner">
        <div className="hero-copy-column">
          <div className="hero-logo-wrap"><Image className="hero-mark" src="/images/mfs-real-logo.jpg" alt="Official Murali Forge Systems logo" width={390} height={213} priority /></div>
          <div className="eyebrow hero-kicker"><span className="blue-dot" /> INDEPENDENT SOFTWARE & AUTOMATION STUDIO</div>
          <h1 id="hero-title" className="mfs-display">
            <span className="hero-line-window"><span className="hero-title-line">Less repetitive.</span></span>
            <span className="hero-line-window"><span className="hero-title-line blue-ink">More possibility.</span></span>
          </h1>
          <p className="hero-copy">I design practical software and connected workflows that give businesses more clarity, less busywork, and room to build.</p>
          <div className="hero-actions">
            <Link className="button hero-primary" href="/enquiry">Build something useful <ArrowUpRight size={16} /></Link>
            <Link className="hero-text-link" href="#studio">Enter the studio <ArrowDown size={15} /></Link>
          </div>
          <div className="hero-signals"><span><i /> Software with purpose</span><span><i /> Automation that connects</span><span><i /> Human judgement stays in control</span></div>
        </div>

        <div className="hero-art" aria-label="Illustration of business processes becoming a connected system">
          <div className="art-topline"><span>FIG. 001 / SYSTEMS IN MOTION</span><span>MF—01</span></div>
          <div className="hero-orbit orbit-a" aria-hidden="true" />
          <div className="hero-orbit orbit-b" aria-hidden="true" />
          <div className="system-plate">
            <div className="plate-head"><span className="plate-mark">MF<span>.</span></span><span>PROCESS MAP / LIVE CONCEPT</span><span className="plate-status"><i /> CONNECTED</span></div>
            <svg className="system-diagram" viewBox="0 0 660 500" role="img" aria-label="Diagram showing an enquiry moving through validation, system updates, and reporting">
              <defs>
                <linearGradient id="mfsBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0b2a57"/><stop offset="1" stopColor="#1267e8"/></linearGradient>
                <pattern id="mfsGrid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M 22 0 L 0 0 0 22" fill="none" stroke="#dce2eb" strokeWidth=".7"/></pattern>
              </defs>
              <rect width="660" height="500" fill="url(#mfsGrid)" opacity=".75"/>
              <path className="system-line" d="M92 118 H220 Q245 118 245 145 V188" fill="none" stroke="url(#mfsBlue)" strokeWidth="2" strokeDasharray="450"/>
              <path className="system-line" d="M245 246 V286 Q245 310 274 310 H365" fill="none" stroke="#1267e8" strokeWidth="2" strokeDasharray="450"/>
              <path className="system-line" d="M423 310 H486 Q510 310 510 286 V230" fill="none" stroke="#1267e8" strokeWidth="2" strokeDasharray="450"/>
              <path className="system-line" d="M510 174 V112 Q510 87 485 87 H420" fill="none" stroke="#a6b8d2" strokeWidth="2" strokeDasharray="450"/>
              <path className="system-line" d="M420 87 H352 Q330 87 330 108 V142" fill="none" stroke="#a6b8d2" strokeWidth="2" strokeDasharray="450"/>
              <g className="system-node" transform="translate(30 82)"><rect width="124" height="72" rx="2" fill="#fffefa" stroke="#cbd4e1"/><rect x="12" y="13" width="22" height="22" rx="1" fill="#e8f0ff"/><path d="M18 19h10m-10 5h10m-10 5h6" stroke="#1267e8" strokeWidth="1.5"/><text x="12" y="51" fill="#15223a" fontSize="10" fontWeight="600">INCOMING</text><text x="12" y="63" fill="#788398" fontSize="8">Enquiry capture</text></g>
              <g className="system-node" transform="translate(184 188)"><rect width="122" height="60" rx="2" fill="#09264f"/><circle cx="17" cy="18" r="4" fill="#63a2ff"/><text x="12" y="37" fill="#fff" fontSize="10" fontWeight="600">VALIDATE</text><text x="12" y="49" fill="#aabbd5" fontSize="8">Check & structure</text></g>
              <g className="system-node" transform="translate(365 276)"><rect width="118" height="68" rx="2" fill="#fffefa" stroke="#9fb8de"/><rect x="12" y="12" width="22" height="22" rx="1" fill="#e8f0ff"/><path d="M18 18h10v10H18zM20 16v2m6-2v2" stroke="#1267e8" strokeWidth="1.2" fill="none"/><text x="12" y="48" fill="#15223a" fontSize="10" fontWeight="600">SYNC RECORD</text><text x="12" y="59" fill="#788398" fontSize="8">Update systems</text></g>
              <g className="system-node" transform="translate(448 174)"><rect width="124" height="58" rx="2" fill="#1267e8"/><path d="M13 25l5 5 10-12" stroke="#fff" strokeWidth="2" fill="none"/><text x="12" y="43" fill="#fff" fontSize="10" fontWeight="600">REPORT READY</text></g>
              <g className="system-node" transform="translate(274 46)"><circle cx="56" cy="41" r="40" fill="#f7f9fd" stroke="#a8b8d0" strokeDasharray="3 4"/><circle cx="56" cy="41" r="25" fill="url(#mfsBlue)"/><text x="56" y="46" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">MF</text></g>
              <g className="system-note" transform="translate(32 218)"><path d="M0 0h70" stroke="#aeb8c7"/><text x="0" y="16" fill="#7b8797" fontSize="9" letterSpacing="1.2">INPUT</text><text x="0" y="31" fill="#192d4a" fontSize="11">One source</text></g>
              <g className="system-note" transform="translate(510 370)"><path d="M0 0h105" stroke="#aeb8c7"/><text x="0" y="16" fill="#7b8797" fontSize="9" letterSpacing="1.2">OUTPUT</text><text x="0" y="31" fill="#192d4a" fontSize="11">Clearer visibility</text></g>
              <g className="system-note" transform="translate(64 390)"><text x="0" y="0" fill="#7b8797" fontSize="9" letterSpacing="1.2">MFS PRINCIPLE</text><text x="0" y="21" fill="#192d4a" fontSize="15" fontFamily="Georgia,serif">Make the work</text><text x="0" y="39" fill="#1267e8" fontSize="15" fontFamily="Georgia,serif">flow with intent.</text></g>
            </svg>
            <div className="plate-foot"><span>CAPTURE → VALIDATE → CONNECT → REPORT</span><span>CONCEPT / NOT A LIVE SYSTEM</span></div>
          </div>
          <div className="art-caption"><span>AN MFS POINT OF VIEW</span><span>Good systems create room to think <MoveUpRight size={12}/></span></div>
        </div>
      </div>
      <div className="hero-bottom-rule"><span>SOFTWARE / AI / AUTOMATION / MARKETING</span><a href="#about">SCROLL TO EXPLORE <span>↓</span></a><span>DESIGNED TO CONNECT</span></div>
    </section>
  );
}
