"use client";

import { Kriteria } from "@/lib/ahpLogic";

// ──────────────────────────────────────────────
// KONSTANTA TITIK SKALA SAATY (1-5)
// ──────────────────────────────────────────────
const SCALE_POINTS = [
  { label: "Tim Kiri Banget", nilai: 5 },
  { label: "Cenderung Pilih Kiri", nilai: 3 },
  { label: "Dua-Duanya Sama", nilai: 1 },
  { label: "Cenderung Pilih Kanan", nilai: 1 / 3 },
  { label: "Tim Kanan Banget", nilai: 1 / 5 },
];

// Map warna pendaran glow untuk masing-masing kriteria
const KRITERIA_COLOR: Record<Kriteria, string> = {
  return: "#82E2B3",        // Emerald Mint
  risk: "#82B3E2",    // Ice Blue (risk / pengganti risk)
  likuiditas: "#82E2D4",    // Cyan Aquamarine
  modal: "#E2C882",         // Gold Amber
  timeHorizon: "#C882E2",   // Purple Lavender
};

// Map sub-deskripsi kualitatif untuk memperjelas visualisasi di bawah teks kriteria utama
const KRITERIA_DESC: Record<Kriteria, string> = {
  return: "perkiraan keuntungan yang bisa kamu dapatkan dari sebuah investasi",
  risk: "stabilitas nilai portofolio untuk menjaga agar uang pokok kamu tidak berkurang",
  likuiditas: "kemudahan pencairan dana secara cepat tanpa denda penalti atau batasan waktu",
  modal: "kemudahan untuk langsung mulai berinvestasi dari nominal terkecil yang ramah di dompet",
  timeHorizon: "target pencapaian dana atau jangka waktu jatuh tempo investasi yang sangat pendek",
};

interface Props {
  question: string;
  kriteria_a: Kriteria;
  kriteria_b: Kriteria;
  labelA: string;
  labelB: string;
  value: number | null;
  onValueChange: (nilai: number) => void;
}

export default function AHPScaleCard({
  question,
  kriteria_a,
  kriteria_b,
  labelA,
  labelB,
  value,
  onValueChange,
}: Props) {
  // Temukan indeks titik aktif berdasarkan nilai Saaty terpilih
  const activeIndex = value !== null
    ? SCALE_POINTS.findIndex((p) => p.nilai === value)
    : -1;

  // Cek apakah kecenderungan pilihan berada di Kiri (index 0,1), Seimbang (2), atau Kanan (3,4)
  const isLeftDominant = activeIndex !== -1 && activeIndex < 2;
  const isRightDominant = activeIndex !== -1 && activeIndex > 2;
  const isBalanced = activeIndex === 2;

  return (
    <div
      className="rounded-[28px] border border-white/10 p-8 sm:p-10 flex flex-col gap-10 w-full transition-all duration-300 relative overflow-hidden"
      style={{
        background: "rgba(6, 6, 6, 0.45)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* 1. Header Pertanyaan */}
      <div className="space-y-2 text-center sm:text-left">
        <h3 className="text-white font-poppins font-medium text-base sm:text-lg leading-relaxed max-w-2xl">
          {question}
        </h3>
      </div>

      {/* 2. Visualisasi Perbandingan Asimetris (Gaya Figma Baru) */}
      <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-6 py-6 border-y border-white/5 relative">
        
        {/* Kriteria Kiri (A) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right gap-4 transition-all duration-300">
          <h2 
            className={`font-poppins font-bold text-3xl sm:text-4xl tracking-tight transition-all duration-500 transform ${
              isLeftDominant 
                ? "scale-105" 
                : "opacity-45 scale-100"
            }`}
            style={{
              color: isLeftDominant ? KRITERIA_COLOR[kriteria_a] : "#FFFFFF",
              textShadow: isLeftDominant 
                ? `0 0 30px ${KRITERIA_COLOR[kriteria_a]}60` 
                : "none",
            }}
          >
            {labelA}
          </h2>
          <p className="text-[10.5px] font-poppins font-light text-white/50 leading-relaxed max-w-55">
            {KRITERIA_DESC[kriteria_a]}
          </p>
        </div>

        <div className="md:col-span-1 flex justify-center items-center py-2 md:py-0">
          <div className="relative flex items-center justify-center">
            <div className="w-[1.5px] h-40 bg-white/10 transform rotate-25 hidden md:block" />
            <span className="absolute bg-[#080808] border border-white/10 px-2 py-1 rounded-md text-[10px] text-white/40 font-mono uppercase tracking-widest">
              or
            </span>
          </div>
        </div>

        {/* Kriteria Kanan (B) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-4 transition-all duration-300">
          <h2 
            className={`font-poppins font-bold text-3xl sm:text-4xl tracking-tight transition-all duration-500 transform ${
              isRightDominant 
                ? "scale-105" 
                : "opacity-45 scale-100"
            }`}
            style={{
              color: isRightDominant ? KRITERIA_COLOR[kriteria_b] : "#FFFFFF",
              textShadow: isRightDominant 
                ? `0 0 30px ${KRITERIA_COLOR[kriteria_b]}60` 
                : "none",
            }}
          >
            {labelB}
          </h2>
          <p className="text-[10.5px] font-poppins font-light text-white/50 leading-relaxed max-w-55">
            {KRITERIA_DESC[kriteria_b]}
          </p>
        </div>

      </div>

      {/* 3. Slider Navigasi 5 Titik (Gaya Figma Baru) */}
      <div className="flex flex-col gap-5 mt-2">
        
        {/* Jalur Track & Bulatan Tombol */}
        <div className="relative flex items-center justify-between px-2 sm:px-4">
          
          {/* Garis Dasar Track */}
          <div className="absolute left-4 right-4 h-2 bg-white/15 top-1/2 -translate-y-1/2" />

          {/* Garis Progress Berwarna Sesuai Kriteria Aktif */}
          {activeIndex !== -1 && (
            <div
              className="absolute h-1.5 top-1/2 -translate-y-1/2 transition-all duration-500 rounded-full"
              style={{
                left: activeIndex <= 2 ? `${activeIndex * 25}%` : "50%",
                width: activeIndex <= 2 ? `${50 - (activeIndex * 25)}%` : `${(activeIndex - 2) * 25}%`,
                background: isLeftDominant 
                  ? KRITERIA_COLOR[kriteria_a] 
                  : isRightDominant 
                  ? KRITERIA_COLOR[kriteria_b] 
                  : "#82E2AE",
              }}
            />
          )}

          {/* Render 5 Titik Node Interaktif */}
          {SCALE_POINTS.map((point, i) => {
            const isSelected = i === activeIndex;
            let activeColor = "#82E2AE"; // Default netral
            if (i < 2) activeColor = KRITERIA_COLOR[kriteria_a];
            if (i > 2) activeColor = KRITERIA_COLOR[kriteria_b];

            return (
              <button
                key={i}
                type="button"
                onClick={() => onValueChange(point.nilai)}
                className="relative color-white z-10 flex flex-col items-center group focus:outline-none"
              >
                {/* Node Bulatan */}
                <div
                  className={`rounded-full border transition-all duration-300 flex items-center justify-center ${
                    isSelected
                      ? "w-5 h-5 border-white scale-110"
                      : "w-3.5 h-3.5 border-white/20 bg-zinc-950 group-hover:border-white/50 group-hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: isSelected ? activeColor : "transparent",
                    boxShadow: isSelected
                      ? `0 0 16px ${activeColor}90`
                      : "none",
                  }}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>

                {/* Teks Label di Atas / Bawah Node */}
                <span
                  className={`absolute top-7 text-center font-poppins text-[10px] whitespace-nowrap transition-all duration-300 pointer-events-none ${
                    isSelected
                      ? "text-white font-medium opacity-100"
                      : "text-white/30 font-light opacity-60 group-hover:text-white/50"
                  }`}
                >
                  {point.label}
                </span>
              </button>
            );
          })}

        </div>

      </div>
    </div>
  );
}