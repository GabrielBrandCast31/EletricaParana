export default function BackgroundMarca() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#0B2342] overflow-hidden">
      {/* Glow radial turquesa no topo-centro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,#52BBD1,transparent)] opacity-30" />
      {/* Grade de linhas (malha de blueprint técnico) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#52BBD110_1px,transparent_1px),linear-gradient(to_bottom,#52BBD110_1px,transparent_1px)] bg-[size:18px_18px]" />
    </div>
  );
}
