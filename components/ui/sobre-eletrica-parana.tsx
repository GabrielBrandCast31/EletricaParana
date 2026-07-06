"use client";

import * as React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Layers, CheckCircle2 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { year: "1991", revenue: 10000, stores: 1 },
  { year: "2005", revenue: 500000, stores: 2 },
  { year: "2015", revenue: 2000000, stores: 3 },
  { year: "2026", revenue: 4000000, stores: 4 },
];

const chartConfig = {
  revenue: {
    label: "Faturamento (R$)",
    color: "#52BBD1",
  },
  stores: {
    label: "Lojas + CD",
    color: "#1A4680",
  },
};

export default function SobreEletricaParana() {
  return (
    <section className="relative overflow-hidden bg-[#0F315E] py-20 text-white md:py-28" id="sobre">
      {/* Textura de malha técnica (blueprint) sutil como fundo */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 bg-cover bg-center opacity-5"
        style={{ backgroundImage: "url(/assets/sobre-textura.jpg)" }}
      />

      <div className="relative z-20 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Coluna Esquerda: Texto e História (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="mb-4 inline-block rounded-full border border-[#52BBD1]/30 bg-[#52BBD1]/15 px-4 py-1.5 font-ui text-xs font-semibold tracking-wider text-[#52BBD1] uppercase">
              Nossa História
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight leading-tight md:text-4xl lg:text-5xl">
              35 anos de solidez e <span className="text-[#52BBD1]">liderança técnica no MT.</span>
            </h2>
            <div className="mt-6 font-body text-base leading-relaxed text-white/85 space-y-4">
              <p>
                Fundada em 1991 por Seu João, a Elétrica Paraná nasceu no coração do Mato Grosso com um compromisso claro: fornecer materiais elétricos de alta qualidade com atendimento técnico de excelência e agilidade incomparável.
              </p>
              <p>
                O que começou como uma operação familiar cresceu e se consolidou ao longo de mais de três décadas. Hoje, somos a distribuidora referência no estado, faturando R$ 4 milhões mensais e atendendo indústrias de grande porte, usinas, construtoras e revendas, com a robustez e seriedade de quem entende de energia de verdade.
              </p>
            </div>

            {/* Pilares chaves */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 w-full">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#52BBD1]/15 text-[#52BBD1]">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="font-ui">
                  <strong className="block text-sm font-semibold text-white">Pronta Entrega Industrial</strong>
                  <p className="mt-1 text-xs text-white/70 leading-normal">
                    Mais de 30 mil itens em estoque real com as melhores marcas do mercado nacional.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#52BBD1]/15 text-[#52BBD1]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="font-ui">
                  <strong className="block text-sm font-semibold text-white">DNA Técnico</strong>
                  <p className="mt-1 text-xs text-white/70 leading-normal">
                    Montagem de painéis, especificação WEG e engenharia dedicada a sua obra.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Painel Visual e Gráfico (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Grid de Imagens Premium */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 h-48 overflow-hidden rounded-xl border border-white/10 shadow-lg group">
                <img 
                  src="/assets/sobre-historia.jpg" 
                  alt="Interior do CD da Elétrica Paraná" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="col-span-5 h-48 overflow-hidden rounded-xl border border-white/10 shadow-lg group">
                <img 
                  src="/assets/sobre-atendimento.jpg" 
                  alt="Técnico de comandos elétricos" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Dashboard Card com Recharts */}
            <div className="rounded-xl border border-white/10 bg-[#071D3A]/85 p-6 shadow-xl backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                <h4 className="font-display text-sm font-semibold text-white">Evolução e Capacidade</h4>
                <div className="flex gap-4 text-[10px] text-white/60">
                  <div className="flex items-center gap-1.5">
                    <div className="h-0.5 w-3 bg-[#52BBD1]" />
                    <span>Faturamento (R$)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-sm bg-[#1A4680]" />
                    <span>Lojas + CD</span>
                  </div>
                </div>
              </div>

              <div className="h-36 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#52BBD1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#52BBD1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="year" 
                        stroke="rgba(255,255,255,0.4)" 
                        fontSize={9}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.4)" 
                        fontSize={8}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => {
                          if (value >= 1000000) return `R$ ${value / 1000000}M`;
                          if (value >= 1000) return `R$ ${value / 1000}k`;
                          return `R$ ${value}`;
                        }}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#52BBD1" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
