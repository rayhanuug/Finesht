"use client";

import { Kriteria } from "@/lib/ahpLogic";

const SCALE_POINTS = [
  { label: "Tim Kiri Banget", nilai: 5 },
  { label: "Cenderung Pilih Kiri", nilai: 3 },
  { label: "Dua-Duanya Sama Penting", nilai: 1 },
  { label: "Cenderung Pilih Kanan", nilai: 1 / 3 },
  { label: "Tim Kanan Banget", nilai: 1 / 5 },
];

const KRITERIA_ICON: Record<Kriteria, string> = {
  return: "image/ERBg.svg",
  risk: "image/bull.svg",
  likuiditas: "image/liq.svg",
  modal: "image/minim.svg",
  timeHorizon: "image/Growth.svg",
};

const KRITERIA_DESC: Record<Kriteria, string> = {
  return: "perkiraan keuntungan yang bisa kamu dapatkan dari sebuah investasi.",
  risk: "Tingkat risiko menunjukkan seberapa besar kemungkinan kamu mengalami kerugian",
  likuiditas: "seberapa mudah investasi bisa dicairkan jadi uang tunai",
  modal: "jumlah modal awal yang perlu kamu siapkan untuk mulai investasi",
  timeHorizon: "lama waktu investasi untuk melihat uang kamu bertumbuh",
};

interface Props {
  question: string;
  kriteria_a: Kriteria;
  kriteria_b: Kriteria;
  labelA: string;
  labelB: string;
  value: number;
  onValueChange: (nilai: number) => void;
  touched?: boolean;
}

export default function AHPScaleCard({
  question,
  kriteria_a,
  kriteria_b,
  labelA,
  labelB,
  value,
  onValueChange,
  touched = false,
}: Props) {
  const activeIndex = SCALE_POINTS.findIndex((p) => p.nilai === value);
  const currentStep = touched ? activeIndex : -1;
  const glowPercent = touched ? (currentStep / 4) * 100 : 50;

  function mapStepToValue(step: number): number {
    return SCALE_POINTS[step].nilai;
  }

  const sideA = touched && activeIndex < 2;  
  const sideB = touched && activeIndex > 2;  

  return (
    <div
      className="rounded-2xl border border-white/20 overflow-hidden w-full relative"
      style={{
        background: "rgba(4, 4, 4, 0.20)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Pertanyaan */}
      <p className="text-white font-poppins font-semibold text-base leading-relaxed p-6 pb-4">
        {question}
      </p>

      {/* Kontainer Utama Dua Kriteria dengan Background Slanted Highlight */}
      <div className="relative flex items-stretch min-h-40 px-8 overflow-hidden">
        
        {/* ================= BACKGROUND HIGHLIGHTS (DIAGONAL SEIMBANG 50/50) ================= */}
        {/* Highlight Sisi Kiri (Green Transparent) - Koordinat disesuaikan agar simetris di tengah */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-0"
          style={{
            background: sideA ? "rgba(130, 226, 179, 0.15)" : "transparent",
            clipPath: "polygon(0 0, 53% 0, 47% 100%, 0 100%)",
          }}
        />

        {/* Highlight Sisi Kanan (Green Transparent) - Koordinat disesuaikan agar simetris di tengah */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-0"
          style={{
            background: sideB ? "rgba(130, 226, 179, 0.15)" : "transparent",
            clipPath: "polygon(53% 0, 100% 0, 100% 100%, 47% 100%)",
          }}
        />

        {/* ================= DIAGONAL DIVIDER & BADGE (CENTERED 50%) ================= */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line 
              x1="53%" y1="0" 
              x2="47%" y2="100%" 
              stroke="rgba(255, 255, 255, 0.2)" 
              strokeWidth="1.5" 
            />
          </svg>
          {/* Badge "Or" diletakkan tepat di tengah-tengah kartu (50%) */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#080808] border border-white/10 px-2.5 py-1 rounded-md text-[10px] text-white tracking-widest font-mono uppercase select-none"
            style={{ left: "50%" }} 
          >
            Or
          </div>
        </div>

        {/* ================= ISI KONTEN KRITERIA ================= */}
        {/* Kriteria A — Kiri (Menyesuaikan padding kanan agar tidak tertabrak garis miring) */}
        <div className="flex-1 flex flex-col justify-between p-5 relative z-10 overflow-hidden select-none pr-6 sm:pr-8">
          {/* Faint Background Icon */}
          <div className="absolute bottom-1 right-2 w-2/3 h-2/3 opacity-[0.06] pointer-events-none flex items-end justify-end">
            {/* <img 
              src={KRITERIA_ICON[kriteria_a]} 
              alt="" 
              className="h-24 w-24 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            /> */}
          </div>

          <div>
            <p className="text-white font-montserrat font-medium text-sm leading-tight transition-all duration-300">
              {labelA}
            </p>
          </div>

          <p className="text-white font-poppins font-light text-[10px] leading-relaxed mt-3 pr-4 sm:pr-6">
            {KRITERIA_DESC[kriteria_a]}
          </p>
        </div>

        {/* Kriteria B — Kanan (Menyesuaikan padding kiri agar tidak tertabrak garis miring) */}
        <div className="flex-1 flex flex-col justify-between p-5 relative z-10 overflow-hidden select-none pl-6 sm:pl-8">
          {/* Faint Background Icon */}
          <div className="absolute bottom-1 left-2 w-2/3 h-2/3 opacity-[0.06] pointer-events-none flex items-end justify-start">
            {/* <img 
              src={KRITERIA_ICON[kriteria_b]} 
              alt="" 
              className="h-24 w-24 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            /> */}
          </div>

          <div className="text-right">
            <p className="text-white font-montserrat font-medium text-sm leading-tight transition-all duration-300">
              {labelB}
            </p>
          </div>

          <p className="text-white text-right font-poppins font-light text-[10px] leading-relaxed mt-3 pl-4 sm:pl-6">
            {KRITERIA_DESC[kriteria_b]}
          </p>
        </div>

      </div>

      {/* Slider Navigasi 5 Titik */}
      <div className="flex flex-col gap-4 px-6 py-5 relative z-20">

        {/* Track + Titik */}
        <div className="relative py-4">

          {/* Glow blur di belakang track fill */}
          {currentStep !== -1 && currentStep !== 2 && (
            <div
              className="absolute h-1.5 top-1/2 -translate-y-1/2 rounded-full bg-[#82E2B3] blur-[4px] transition-all duration-300 opacity-30"
              style={{
                left: currentStep < 2 ? `${glowPercent}%` : "50%",
                right: currentStep > 2 ? `${100 - glowPercent}%` : "50%",
              }}
            />
          )}

          {/* Track */}
          <div className="h-1 w-full bg-white/10 rounded-full relative">

            {/* Track fill hijau — dari titik aktif ke tengah */}
            {currentStep !== -1 && currentStep !== 2 && (
              <div
                className="absolute h-full bg-[#82E2B3] rounded-full transition-all duration-300"
                style={{
                  left: currentStep < 2 ? `${glowPercent}%` : "50%",
                  right: currentStep > 2 ? `${100 - glowPercent}%` : "50%",
                }}
              />
            )}

            {/* Titik-titik */}
            {[0, 1, 2, 3, 4].map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => onValueChange(mapStepToValue(step))}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center
                  ${step === currentStep
                    ? "border-[#82E2B3] bg-black scale-125 z-20 shadow-[0_0_12px_rgba(130,226,179,0.8)]"
                    : "border-white/10 bg-zinc-900 hover:border-white/30"
                  }`}
                style={{ left: `${step * 25}%` }}
              >
                {step === currentStep && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#82E2B3]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Label */}
        <div className="flex justify-between select-none">
          {SCALE_POINTS.map((point, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onValueChange(point.nilai)}
              className="text-center focus:outline-none"
              style={{ width: i === 0 || i === 4 ? 56 : 72 }}
            >
              <span
                className="font-poppins text-[10px] leading-tight whitespace-pre-line transition-all duration-300"
                style={{
                  color: touched && i === activeIndex
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.25)",
                }}
              >
                {point.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}