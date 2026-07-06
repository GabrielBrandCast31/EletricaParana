"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 35, label: "Anos de mercado em MT" },
  { value: 4, label: "Lojas + CD próprio" },
  { value: 30, prefix: "+", suffix: "k", label: "Itens a pronta entrega" },
  { value: 30, prefix: "+", label: "Marcas líderes no catálogo" },
  { value: 20, label: "Veículos na frota própria" },
  { value: 200, prefix: "+", label: "Colaboradores à disposição" },
];

function Counter({
  value,
  prefix = "",
  suffix = "",
  start,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <span className="font-display text-5xl font-extrabold leading-none text-[#0F315E] md:text-6xl">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function FaixaNumeros() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 py-10 md:py-12 bg-white border-b border-[#E2E8F0]">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-[#0F315E]/10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center px-4 text-center"
          >
            <Counter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              start={inView}
            />
            <span className="mt-3 max-w-[10rem] font-ui text-xs font-medium uppercase tracking-[0.25em] text-[#5B6675] leading-normal">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
