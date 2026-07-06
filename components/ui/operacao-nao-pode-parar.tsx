"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Building2,
  Tag,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

const WHATSAPP_NUMBER = "55659XXXXXXXX"; // SUBSTITUIR antes de publicar

type Card = {
  categoria: string;
  titulo: string;
  resumo: string;
  imagem: string;
  alt: string;
  botao: string;
  wppMensagem: string;
};

const cards: Card[] = [
  {
    categoria: "Estoque",
    titulo: "Pronta entrega de mais de 30 mil itens em estoque",
    resumo:
      "Evite atrasos logísticos na sua instalação. Mantemos um estoque robusto com cabos, disjuntores, contatos e materiais industriais a pronta entrega.",
    imagem: "/assets/operacao/card-1.jpg",
    alt: "Prateleiras de estoque de materiais elétricos",
    botao: "Verificar disponibilidade",
    wppMensagem:
      "Olá, vim pelo site da Elétrica Paraná e preciso verificar a disponibilidade de um item em estoque.",
  },
  {
    categoria: "Emergência",
    titulo: "Atendimento emergencial para parada de máquina",
    resumo:
      "Sua linha de produção não pode ficar parada. Oferecemos suporte prioritário e ágil para fornecer peças de reposição e comandos com urgência absoluta.",
    imagem: "/assets/operacao/card-2.jpg",
    alt: "Técnico em atendimento emergencial junto a painel elétrico",
    botao: "Atendimento urgente",
    wppMensagem:
      "Olá, vim pelo site da Elétrica Paraná e estou com uma urgência: parada de operação por falta de material.",
  },
  {
    categoria: "Quadros",
    titulo: "Quadros de comando montados sob medida",
    resumo:
      "Projetamos e montamos painéis elétricos customizados de acionamento e proteção, seguindo todas as normas técnicas vigentes e homologações do setor.",
    imagem: "/assets/operacao/card-3.jpg",
    alt: "Quadro de comando elétrico montado sob medida",
    botao: "Solicitar orçamento técnico",
    wppMensagem:
      "Olá, vim pelo site da Elétrica Paraná e preciso de um quadro de comando montado sob medida.",
  },
  {
    categoria: "WEG",
    titulo: "Revenda integrada WEG: o produto certo, do orçamento à entrega",
    resumo:
      "Somos revenda especializada WEG. Oferecemos suporte técnico completo na seleção e fornecimento de motores, inversores de frequência e soft-starters.",
    imagem: "/assets/operacao/card-4.jpg",
    alt: "Motores e componentes WEG em prateleira",
    botao: "Falar com especialista",
    wppMensagem:
      "Olá, vim pelo site da Elétrica Paraná e quero falar sobre produtos WEG.",
  },
  {
    categoria: "Entrega",
    titulo: "Frota própria entregando em todo o Mato Grosso",
    resumo:
      "Com frota de entrega própria e centros de distribuição estrategicamente localizados, garantimos a integridade e pontualidade na entrega dos materiais.",
    imagem: "/assets/operacao/card-5.jpg",
    alt: "Caminhão da frota própria em centro de distribuição",
    botao: "Consultar prazo na minha cidade",
    wppMensagem:
      "Olá, vim pelo site da Elétrica Paraná e quero saber o prazo de entrega na minha cidade.",
  },
  {
    categoria: "Técnico",
    titulo: "Suporte técnico para especificar a solução certa",
    resumo:
      "Conte com o suporte de nossa equipe de engenharia e técnicos de vendas para especificar de forma assertiva os materiais elétricos do seu projeto.",
    imagem: "/assets/operacao/card-6.jpg",
    alt: "Suporte técnico especificando material elétrico com cliente",
    botao: "Falar com o time técnico",
    wppMensagem:
      "Olá, vim pelo site da Elétrica Paraná e preciso de suporte técnico para especificar material.",
  },
];

function wppLink(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function OperacaoNaoPodeParar() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  return (
    <section className="bg-[#F4F6F9] px-4 py-16 md:py-24" id="operacao">
      <div className="mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <div className="relative mb-6">
          <h2 className="font-display font-extrabold uppercase leading-[0.85] tracking-tight">
            <span className="block text-[#0F315E] text-6xl md:text-8xl lg:text-9xl">
              Sua operação
            </span>
            <span className="block text-[#52BBD1] text-6xl md:text-8xl lg:text-9xl">
              não pode parar
            </span>
          </h2>
        </div>

        {/* Carrossel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {cards.map((card, i) => (
                <article
                  key={i}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,49,94,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(15,49,94,0.12)]">
                    <div className="relative">
                      <img
                        src={card.imagem}
                        alt={card.alt}
                        loading="lazy"
                        className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-[#0F315E] px-3 py-1.5 font-ui text-xs font-medium text-white">
                        <Tag className="h-3.5 w-3.5 text-[#52BBD1]" />
                        {card.categoria}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-1.5 font-ui text-xs text-[#5B6675]">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>Elétrica Paraná</span>
                      </div>

                      <h3 className="font-display text-lg font-semibold leading-snug text-[#0F315E] min-h-[2.8em] line-clamp-2">
                        {card.titulo}
                      </h3>

                      <p className="mt-3 flex-1 font-body text-sm font-light leading-relaxed text-[#5B6675]">
                        {card.resumo}
                      </p>

                      <a
                        href={wppLink(card.wppMensagem)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#52BBD1] px-5 py-2.5 font-ui text-sm font-semibold text-[#0F315E] transition-colors duration-300 hover:bg-[#0F315E] hover:text-white"
                      >
                        <WhatsappIcon variant="dinamico-claro-dark" size={16} />
                        {card.botao}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Setas */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={scrollPrev}
              aria-label="Ver anteriores"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F315E] text-white transition-colors duration-300 hover:bg-[#52BBD1] hover:text-[#0F315E]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Ver próximos"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F315E] text-white transition-colors duration-300 hover:bg-[#52BBD1] hover:text-[#0F315E]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CTA de fechamento */}
        <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center">
          <p className="font-ui text-sm font-light text-[#5B6675]">
            Resposta em até 5 minutos no horário comercial.
          </p>
          <a
            href={wppLink(
              "Olá, vim pelo site da Elétrica Paraná e quero solicitar um orçamento.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-0"
          >
            <span className="rounded-full bg-[#52BBD1] px-7 py-3.5 font-ui font-semibold text-[#0F315E] duration-500 ease-in-out group-hover:bg-[#0F315E] group-hover:text-white">
              Solicitar orçamento agora
            </span>
            <span className="relative ml-1.5 flex h-fit items-center overflow-hidden rounded-full bg-[#52BBD1] p-5 text-[#0F315E] duration-500 ease-in-out group-hover:bg-[#0F315E] group-hover:text-white">
              <WhatsappIcon variant="dinamico-claro-dark" className="absolute -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" size={20} />
              <WhatsappIcon variant="dinamico-claro-dark" className="absolute -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" size={20} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
