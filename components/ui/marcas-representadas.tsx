"use client";

import { Dock, DockIcon } from "@/components/ui/dock";

type Marca = {
  name: string;
  href: string;
  src?: string;      // logo oficial quando disponível
  wordmark?: string;  // fallback em texto
};

const marcas: Marca[] = [
  { name: "WEG — Revenda Integrada", href: "/produtos/motores-weg", src: "/assets/marcas/weg.svg", wordmark: "WEG" },
  { name: "Lorenzetti", href: "#", src: "/assets/marcas/lorenzetti.png", wordmark: "LORENZETTI" },
  { name: "3M", href: "#", src: "/assets/marcas/3m.png", wordmark: "3M" },
  { name: "Dewalt", href: "/produtos/ferramentas", src: "/assets/marcas/dewalt.png", wordmark: "DEWALT" },
  { name: "Vonder", href: "/produtos/ferramentas", src: "/assets/marcas/vonder.png", wordmark: "VONDER" },
];

export default function MarcasRepresentadas() {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-8 font-ui text-xs font-semibold uppercase tracking-[0.2em] text-[#0F315E] dark:text-[#52BBD1] transition-colors">
          Distribuímos e representamos as maiores marcas do mercado
        </p>

        <div className="flex justify-center">
          <Dock className="gap-4 bg-[#0F315E]/5 border-[#0F315E]/10 dark:bg-white/10 dark:border-white/20" iconSize={80} iconMagnification={108}>
            {marcas.map((m, i) => (
              <DockIcon key={i} name={m.name} href={m.href} src={m.src}>
                {/* Fallback wordmark caso o logo oficial ainda não exista */}
                {!m.src && (
                  <span className="flex h-full w-full items-center justify-center rounded-[inherit] font-ui text-sm font-bold text-[#0F315E]">
                    {m.wordmark}
                  </span>
                )}
              </DockIcon>
            ))}
          </Dock>
        </div>
      </div>
    </section>
  );
}
