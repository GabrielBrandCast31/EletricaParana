import { ArrowUpRight, MapPin, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

export default function HeroEletricaParana() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0F315E]">
      {/* Estilos CSS Inline autossuficientes para animações de alta performance e acessibilidade */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slowZoom {
          from { transform: scale(1.03); }
          to { transform: scale(1.10); }
        }
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .animate-zoom-bg {
            animation: slowZoom 25s infinite alternate ease-in-out;
          }
          .animate-fade-content {
            opacity: 0;
            animation: fadeUpIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        }
      `}} />

      {/* Malha técnica vertical (blueprint), bem sutil */}
      <div className="pointer-events-none absolute inset-0 z-10 size-full">
        <div className="grid h-full w-full grid-cols-12 divide-x divide-white/8">
          <div className="col-span-1 h-full" />
          <div className="col-span-3 h-full" />
          <div className="col-span-4 h-full" />
          <div className="col-span-3 h-full" />
          <div className="col-span-1 h-full" />
        </div>
      </div>

      {/* Imagem de fundo + overlay em gradiente navy→preto (profundidade premium) */}
      <div
        className="absolute inset-0 bg-center bg-cover animate-zoom-bg"
        style={{
          backgroundImage:
            "url(/assets/hero-estoque-quadros.jpg)", // Imagem real Enzo: factory-workshop-interior-machines-glass-production-background.jpg
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F315E]/85 via-[#0F315E]/70 to-black/85" />
      </div>

      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center text-white animate-fade-content">
        {/* Eyebrow: autoridade imediata */}
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[#52BBD1]/40 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <Zap className="h-4 w-4 text-[#52BBD1]" />
          <span className="font-ui text-xs font-medium uppercase tracking-[0.25em] text-white/90">
            35 anos · Revenda integrada WEG · +30 mil itens em estoque
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
          Energia, materiais elétricos e soluções WEG
          <span className="text-[#52BBD1]"> para quem não pode parar.</span>
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-6 mb-9 max-w-2xl font-body text-lg font-normal leading-relaxed text-white/85 md:text-xl">
          Atendimento técnico, pronta entrega e a força de 4 lojas para atender
          sua obra, manutenção ou operação industrial em todo o Mato Grosso.
        </p>

        {/* CTA único — botão do WhatsApp chamativo em Turquesa (#52BBD1) */}
        <div className="flex items-center justify-center">
          <a
            href={`https://wa.me/55659XXXXXXXX?text=${encodeURIComponent("Olá, vim pelo site da Elétrica Paraná e quero solicitar um orçamento pelo WhatsApp.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 rounded-full bg-[#52BBD1] px-8 py-4 font-ui text-base font-bold uppercase tracking-wider text-[#0F315E] shadow-lg shadow-[#52BBD1]/20 transition-all duration-300 hover:bg-[#0F315E] hover:text-white hover:shadow-xl hover:shadow-[#0F315E]/30 hover:-translate-y-1"
          >
            <WhatsappIcon variant="dinamico-claro-dark" size={22} />
            Falar no WhatsApp
          </a>
        </div>

        {/* Faixa de prova de cobertura */}
        <div className="mt-10 flex items-center justify-center gap-2 text-white/60">
          <MapPin className="h-4 w-4 text-[#52BBD1]" />
          <span className="font-ui text-sm font-normal">
            Várzea Grande · Cuiabá · Sinop · Nova Mutum — entregamos em todo o Brasil
          </span>
        </div>

        {/* Assinatura da marca */}
        <p className="mt-12 font-ui text-xs font-medium uppercase tracking-[0.3em] text-[#52BBD1]/80">
          Nossa energia gera prosperidade
        </p>
      </div>

    </section>
  );
}

