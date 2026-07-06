"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Produto = {
  nome: string;
  slug: string;
  imagem: string;
  alt: string;
  tags: [string, string];
};

const produtos: Produto[] = [
  { nome: "Motores elétricos WEG", slug: "motores-weg", imagem: "/assets/produtos/motores-weg.png", alt: "Motores elétricos WEG", tags: ["Indústria", "WEG"] },
  { nome: "Inversores e soft-starters", slug: "inversores-soft-starters", imagem: "/assets/produtos/inversores.jpg", alt: "Inversores de frequência e soft-starters", tags: ["Automação", "Motores"] },
  { nome: "Quadros de comando", slug: "quadros-de-comando", imagem: "/assets/produtos/quadros.jpg", alt: "Quadros de comando montados sob medida", tags: ["Engenharia", "Sob medida"] },
  { nome: "Cabos e condutores", slug: "cabos-e-condutores", imagem: "/assets/produtos/cabos.png", alt: "Cabos e condutores elétricos", tags: ["Obra", "Estoque"] },
  { nome: "Baixa e alta tensão", slug: "baixa-e-alta-tensao", imagem: "/assets/produtos/tensao.jpg", alt: "Material de baixa e alta tensão", tags: ["Distribuição", "Proteção"] },
  { nome: "Automação industrial", slug: "automacao-industrial", imagem: "/assets/produtos/automacao.jpg", alt: "Automação industrial", tags: ["Indústria", "Controle"] },
  { nome: "Iluminação e luminárias", slug: "iluminacao", imagem: "/assets/produtos/iluminacao.jpg", alt: "Iluminação e luminárias", tags: ["LED", "Eficiência"] },
  { nome: "Ferramentas", slug: "ferramentas", imagem: "/assets/produtos/ferramentas.jpg", alt: "Ferramentas profissionais", tags: ["Profissional", "Instalação"] },
];

export default function SolucoesSegmento() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Título editorial + frase de apoio */}
        <div className="relative mb-6">
          <h2 className="font-display font-extrabold uppercase leading-[0.85] tracking-tight">
            <span className="block text-[#0F315E] text-6xl md:text-8xl lg:text-9xl">
              Soluções
            </span>
            <span className="block text-[#52BBD1] text-6xl md:text-8xl lg:text-9xl">
              Sob medida
            </span>
          </h2>
          <p className="mt-4 max-w-[16rem] font-body text-sm font-normal leading-relaxed text-[#5B6675] md:absolute md:right-0 md:top-6 md:text-left lg:top-8">
            Do balcão à indústria: materiais elétricos, automação e quadros de comando
            para quem não pode parar.
          </p>
        </div>

        {/* Grid de 8 produtos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {produtos.map((p) => (
            <Link key={p.slug} href={`/produtos/${p.slug}`} className="group block">
              <div className="produto-card flex h-[300px] items-center justify-center bg-white p-6">
                <img
                  src={p.imagem}
                  alt={p.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
                <span className="hover-arrow">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              {/* Tags */}
              <div className="mt-4 flex gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[#0F315E]/20 px-2.5 py-1 font-ui text-[10px] font-medium uppercase tracking-wide text-[#0F315E] transition-colors group-hover:border-[#52BBD1] group-hover:text-[#52BBD1]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Nome */}
              <h3 className="mt-2 font-display text-xl font-semibold text-[#0F315E]">
                {p.nome}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
