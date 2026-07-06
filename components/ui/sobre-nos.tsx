"use client";

import { Star } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

const WHATSAPP_NUMBER = "55659XXXXXXXX"; // SUBSTITUIR antes de publicar
const wppOrcamento = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá, vim pelo site da Elétrica Paraná e quero solicitar um orçamento.",
)}`;

export default function SobreNos() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* COLUNA ESQUERDA — TEXTO */}
        <div className="max-w-xl">
          {/* Eyebrow */}
          <span className="inline-flex items-center rounded-full border border-[#0F315E]/15 bg-[#0F315E]/5 px-4 py-1.5 font-ui text-xs font-medium uppercase tracking-[0.2em] text-[#0F315E]">
            Sobre nós
          </span>

          {/* Título */}
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-[#0F315E] md:text-5xl">
            A Elétrica Paraná
          </h2>

          {/* Descrição */}
          <p className="mt-5 font-body text-base font-normal leading-relaxed text-[#5B6675]">
            Há mais de 35 anos levamos energia, materiais elétricos e soluções
            WEG para obras, indústrias e operações de todo o Mato Grosso. São 4
            lojas, centro de distribuição e frota própria, com mais de 30 mil
            itens em estoque e atendimento técnico que entende a sua necessidade.
          </p>

          {/* Prova social */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-[#52BBD1] text-[#52BBD1]" />
              <span className="font-ui text-sm font-semibold text-[#0F315E]">
                Excelente 4.7 / 5
              </span>
            </div>
            <span className="h-5 w-px bg-[#0F315E]/15" />
            <div className="flex items-center gap-3">
              {/* Avatares — iniciais das praças como placeholder elegante */}
              <div className="flex -space-x-2">
                {["EP", "MT", "VG", "SN"].map((ini, i) => (
                  <span
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#0F315E] font-ui text-[10px] font-semibold text-white"
                  >
                    {ini}
                  </span>
                ))}
              </div>
              <span className="font-ui text-sm text-[#5B6675]">
                Avaliações no Google
              </span>
            </div>
          </div>

          {/* CTA */}
          <a
            href={wppOrcamento}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#52BBD1] px-6 py-3.5 font-ui text-base font-semibold text-[#0F315E] transition-colors duration-300 hover:bg-[#0F315E] hover:text-white"
          >
            <WhatsappIcon variant="dinamico-claro-dark" size={20} />
            Solicitar orçamento
          </a>
        </div>

        {/* COLUNA DIREITA — IMAGEM + CARDS LIQUID GLASS */}
        <div className="relative">
          {/* Imagem central */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl">
            <img
              src="/assets/sobre/tecnico-eletrica-parana.jpg"
              alt="Técnico especializado da Elétrica Paraná em ambiente industrial"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Card flutuante superior-direito */}
          <div className="liquid-glass--accent absolute -top-6 right-0 w-56 p-5 lg:-right-8">
            <p className="font-display text-4xl font-bold leading-none text-[#0F315E]">
              35{" "}
              <span className="font-ui text-base font-medium text-[#0F315E]">
                anos
              </span>
            </p>
            <p className="mt-3 font-body text-xs leading-relaxed text-[#5B6675]">
              De mercado em Mato Grosso, construindo confiança com cada cliente,
              colaborador e fornecedor.
            </p>
          </div>

          {/* Card flutuante inferior-esquerdo */}
          <div className="liquid-glass absolute -bottom-6 left-0 w-60 p-5 lg:-left-8">
            <p className="font-display text-4xl font-bold leading-none text-[#0F315E]">
              +30 mil{" "}
              <span className="block font-ui text-base font-medium text-[#0F315E]">
                itens em estoque
              </span>
            </p>
            <p className="mt-3 font-body text-xs leading-relaxed text-[#5B6675]">
              Pronta entrega com 4 lojas, centro de distribuição e frota própria
              para você não parar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
