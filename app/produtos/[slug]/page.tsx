import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { WhatsappFlutuante } from "@/components/ui/whatsapp-flutuante";

const WHATSAPP_NUMBER = "55659XXXXXXXX"; // Substitua pelo número real de produção

type ProdutoDetalhe = {
  nome: string;
  imagem: string;
  alt: string;
  tags: string[];
  descricao: string;
  bullets: string[];
  seoTitle: string;
  seoDescription: string;
};

const dados: Record<string, ProdutoDetalhe> = {
  "motores-weg": {
    nome: "Motores elétricos WEG",
    imagem: "/assets/produtos/motores-weg.png",
    alt: "Motores elétricos WEG",
    tags: ["Indústria", "WEG"],
    descricao:
      "Linha completa de motores WEG, trifásicos e monofásicos, com suporte técnico para o dimensionamento correto da sua aplicação.",
    bullets: ["Linha WEG completa", "Trifásico e monofásico", "Dimensionamento técnico", "Pronta entrega"],
    seoTitle: "Motores elétricos WEG em Mato Grosso | Elétrica Paraná",
    seoDescription:
      "Motores WEG trifásicos e monofásicos com suporte técnico e pronta entrega em todo o MT. Solicite seu orçamento com a Elétrica Paraná.",
  },
  "inversores-soft-starters": {
    nome: "Inversores de frequência e soft-starters",
    imagem: "/assets/produtos/inversores.jpg",
    alt: "Inversores de frequência e soft-starters",
    tags: ["Automação", "Motores"],
    descricao:
      "Tecnologia de ponta para partida suave, controle de velocidade e proteção total de motores elétricos industriais.",
    bullets: ["Partida suave", "Controle de velocidade", "Proteção de motor", "Aplicação industrial"],
    seoTitle: "Inversores e Soft-Starters em Mato Grosso | Elétrica Paraná",
    seoDescription:
      "Inversores de frequência e soft-starters para controle de motores elétricos. Tecnologia e pronta entrega no MT com a Elétrica Paraná.",
  },
  "quadros-de-comando": {
    nome: "Quadros de comando",
    imagem: "/assets/produtos/quadros.jpg",
    alt: "Quadros de comando montados sob medida",
    tags: ["Engenharia", "Sob medida"],
    descricao:
      "Montagem própria sob medida de painéis elétricos para acionamento, controle inteligente e proteção térmica de máquinas.",
    bullets: ["Montagem sob medida", "Comando de motores", "Baixa tensão", "Correção de fator de potência"],
    seoTitle: "Quadros de Comando Sob Medida em Mato Grosso | Elétrica Paraná",
    seoDescription:
      "Projetos e montagem própria de quadros de comando elétricos sob medida. Engenharia e qualidade garantida pela Elétrica Paraná no MT.",
  },
  "cabos-e-condutores": {
    nome: "Cabos e condutores",
    imagem: "/assets/produtos/cabos.png",
    alt: "Cabos e condutores elétricos",
    tags: ["Obra", "Estoque"],
    descricao:
      "Estoque robusto de fios e cabos para baixa e média tensão, atendendo obras civis e instalações industriais com bitolas diversas.",
    bullets: ["Várias bitolas", "Para obra e indústria", "Estoque para pronta entrega", "Orientação técnica"],
    seoTitle: "Fios e Cabos Condutores em Mato Grosso | Elétrica Paraná",
    seoDescription:
      "Cabos elétricos e condutores de alta qualidade com ampla variedade de bitolas e pronta entrega em Mato Grosso. Faça sua cotação.",
  },
  "baixa-e-alta-tensao": {
    nome: "Baixa e alta tensão",
    imagem: "/assets/produtos/tensao.jpg",
    alt: "Material de baixa e alta tensão",
    tags: ["Distribuição", "Proteção"],
    descricao:
      "Componentes de proteção e manobra, disjuntores, contatores e chaves para subestações e redes de distribuição segura.",
    bullets: ["Distribuição", "Proteção", "Disjuntores e contatores", "Painéis robustos"],
    seoTitle: "Materiais de Alta e Baixa Tensão no MT | Elétrica Paraná",
    seoDescription:
      "Disjuntores, contatores e chaves para distribuição e proteção de sistemas elétricos no MT. Faturamento CNPJ com a Elétrica Paraná.",
  },
  "automacao-industrial": {
    nome: "Automação industrial",
    imagem: "/assets/produtos/automacao.jpg",
    alt: "Automação industrial",
    tags: ["Indústria", "Controle"],
    descricao:
      "Sensores, relés, CLPs e controladores inteligentes para modernização e automação de linhas de produção fabris.",
    bullets: ["Controle inteligente", "Eficiência operacional", "Integração simplificada", "Suporte técnico dedicado"],
    seoTitle: "Automação Industrial e Componentes no MT | Elétrica Paraná",
    seoDescription:
      "Controladores, CLPs, sensores e componentes para automação industrial em Mato Grosso. Suporte técnico e pronta entrega.",
  },
  "iluminacao": {
    nome: "Iluminação e luminárias",
    imagem: "/assets/produtos/iluminacao.jpg",
    alt: "Iluminação e luminárias",
    tags: ["LED", "Eficiência"],
    descricao:
      "Showroom completo de soluções LED de alta performance e projetores para iluminação pública, comercial e galpões industriais.",
    bullets: ["LED de alto rendimento", "Eficiência energética", "Uso industrial e comercial", "Projeto luminotécnico [a confirmar]"],
    seoTitle: "Iluminação LED Comercial e Industrial no MT | Elétrica Paraná",
    seoDescription:
      "Projetores e luminárias LED industriais de alta eficiência energética. Projetos luminotécnicos e venda corporativa no MT.",
  },
  "ferramentas": {
    nome: "Ferramentas",
    imagem: "/assets/produtos/ferramentas.jpg",
    alt: "Ferramentas profissionais",
    tags: ["Profissional", "Instalação"],
    descricao:
      "Gama completa de ferramentas robustas, alicates de crimpagem, multímetros e instrumentos de medição de marcas líderes.",
    bullets: ["Uso profissional", "Ideal para instalação", "Manutenção elétrica", "Marcas renomadas (Dewalt, Vonder)"],
    seoTitle: "Ferramentas Profissionais para Eletricistas no MT | Elétrica Paraná",
    seoDescription:
      "Instrumentos de medição, alicates, chaves e ferramentas elétricas profissionais de grandes marcas no MT. Compre com faturamento B2B.",
  },
};

export function generateStaticParams() {
  return Object.keys(dados).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = dados[params.slug];
  if (!p) return {};
  return { title: p.seoTitle, description: p.seoDescription };
}

export default function ProdutoPage({ params }: { params: { slug: string } }) {
  const p = dados[params.slug];
  if (!p) notFound();

  const wpp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá, vim pela página de ${p.nome} no site da Elétrica Paraná e quero solicitar um orçamento.`,
  )}`;

  return (
    <main className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="font-ui text-sm text-[#5B6675]">
          <Link href="/" className="hover:text-[#0F315E]">Início</Link>
          <span className="mx-2">/</span>
          <Link href="/#produtos" className="hover:text-[#0F315E]">Produtos</Link>
          <span className="mx-2">/</span>
          <span className="text-[#0F315E]">{p.nome}</span>
        </nav>

        {/* Hero do produto */}
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div className="flex w-full aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-white p-8 shadow-lg shadow-[#0f315e]/10">
            <img src={p.imagem} alt={p.alt} className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <div className="flex gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-md border border-[#52BBD1] px-2.5 py-1 font-ui text-[10px] font-medium uppercase tracking-wide text-[#52BBD1]">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0F315E] md:text-5xl">
              {p.nome}
            </h1>
            <p className="mt-4 font-body text-base leading-relaxed text-[#5B6675]">
              {p.descricao}
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 font-body text-sm text-[#0F315E]">
                  <Check className="h-4 w-4 shrink-0 text-[#52BBD1]" />
                  {b}
                </li>
              ))}
            </ul>

            <a
              href={wpp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#52BBD1] px-7 py-3.5 font-ui text-base font-semibold text-[#0F315E] transition-colors duration-300 hover:bg-[#0F315E] hover:text-white"
            >
              <WhatsappIcon variant="dinamico-claro-dark" size={20} />
              Pedir preço deste produto
            </a>
          </div>
        </div>

        {/* Faixa de autoridade */}
        <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl bg-[#F4F6F9] p-8 text-center md:grid-cols-4">
          {[
            ["35 anos", "de mercado em MT"],
            ["Revenda integrada", "WEG"],
            ["+30 mil", "itens em estoque"],
            ["Entrega", "em todo o MT"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-2xl font-bold text-[#0F315E]">{n}</p>
              <p className="mt-1 font-ui text-xs text-[#5B6675]">{l}</p>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-12 flex justify-center">
          <a
            href={wpp}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full bg-[#0F315E] px-8 py-4 font-ui text-base font-semibold text-white transition-colors hover:bg-[#52BBD1] hover:text-[#0F315E] inline-flex items-center gap-2"
          >
            <WhatsappIcon variant="dinamico-dark-light" size={20} />
            Solicitar orçamento agora
          </a>
        </div>
      </div>
      <WhatsappFlutuante />
    </main>
  );
}
