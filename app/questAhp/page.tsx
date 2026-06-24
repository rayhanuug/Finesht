"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/component/qCard";
import ProgressBar from "@/component/pBar";
import {
  PAIRWISE_PAIRS,
  KRITERIA_LABEL,
  SAATY_MAP,
  Kriteria,
} from "@/lib/ahpLogic";

const AHP_OPTIONS = [
  "A jauh lebih penting",
  "A lebih penting",
  "Keduanya sama penting",
  "B lebih penting",
  "B jauh lebih penting",
];

export default function QuestAhp() {
  const router = useRouter();

  const [answers, setAnswers] = useState<Record<number, string>>(
    Object.fromEntries(PAIRWISE_PAIRS.map((_, i) => [i, ""]))
  );

  const [isLoaded, setIsLoaded] = useState(false);

  // Refs untuk auto-scroll
  const questionRefs = useRef<(HTMLDivElement | null)[]>(
    Array(PAIRWISE_PAIRS.length).fill(null)
  );

  useEffect(() => {
    try {
      const navigationEntries = performance.getEntriesByType("navigation");
      const isReload =
        navigationEntries.length > 0 &&
        (navigationEntries[0] as PerformanceNavigationTiming).type === "reload";

      if (isReload) {
        localStorage.removeItem("finesht_ahp");
      } else {
        const saved = localStorage.getItem("finesht_ahp");
        if (saved) {
          setAnswers(JSON.parse(saved));
        }
      }
    } catch (e) {
      console.error("Gagal mendeteksi reload atau memulihkan data", e);
    }
    setIsLoaded(true);
  }, []);

  function handleChange(index: number, val: string) {
    setAnswers((prev) => {
      const updated = { ...prev, [index]: val };
      localStorage.setItem("finesht_ahp", JSON.stringify(updated));
      return updated;
    });

    // Auto scroll ke pertanyaan berikutnya
    setTimeout(() => {
      const nextRef = questionRefs.current[index + 1];
      if (nextRef) {
        nextRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 180);
  }

  const filled = Object.values(answers).filter((v) => v !== "").length;
  const total = PAIRWISE_PAIRS.length;
  const isComplete = filled === total;

  function handleNext() {
    // Convert jawaban teks ke nilai numerik Saaty
    const ahpAnswers = PAIRWISE_PAIRS.map((pair, i) => ({
      kriteria_a: pair.a,
      kriteria_b: pair.b,
      nilai: SAATY_MAP[answers[i]] ?? 1,
    }));

    localStorage.setItem("finesht_ahp_answers", JSON.stringify(ahpAnswers));
    router.push("/hasil");
  }

  // Generate pertanyaan yang ditampilin — hanya sampai pertanyaan pertama yang belum dijawab + 1
  const visibleCount = Math.min(
    filled + 1,
    total
  );

  return (
    <main className="min-h-screen bg-black relative overflow-hidden pb-40">
      {/* Gradient */}
      <div
        className="absolute top-0 left-0 w-full h-[400px] opacity-45 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 70% at top center, #82E2B3 0%, transparent 70%)",
        }}
      />

      {/* Navbar */}
      <nav className="relative flex items-center justify-center px-6 py-5 my-5">
        <Link
          href="/questOne"
          className="absolute left-10 flex items-center gap-1 text-white font-poppins text-md hover:opacity-80 transition-opacity border border-white/30 px-4 py-1.5 rounded-full"
        >
          ← back
        </Link>
        <span className="text-white font-outfit font-bold text-2xl tracking-tight">
          Finesht
        </span>
      </nav>

      <section className="flex justify-center flex-col">
        {/* Header */}
        <div className="flex flex-col items-center mt-10 text-center px-4">
          <h2 className="font-poppins font-semibold text-xl text-white">
            Your money, your rules. Even when it comes to investing          {/* <span className="italic">tapi invest dulu yang bener</span> */}
          </h2>
          <p className="font-poppins font-light text-sm mt-2 text-white/60">
            Yuk kita cek apa yang paling penting buat kamu dalam berinvestasi
          </p>
        </div>

        {/* Questions */}
        <div className="max-w-xl mx-auto w-full mt-7 space-y-5 px-6">
          {PAIRWISE_PAIRS.slice(0, visibleCount).map((pair, index) => {
            const labelA = KRITERIA_LABEL[pair.a];
            const labelB = KRITERIA_LABEL[pair.b];

            // Ganti "A" dan "B" di options dengan nama kriteria
            const dynamicOptions = AHP_OPTIONS.map((opt) =>
              opt
                .replace("A", labelA)
                .replace("B", labelB)
            );

            return (
              <div
                key={index}
                ref={(el) => {
                  questionRefs.current[index] = el;
                }}
                className="transition-all duration-700 ease-out"
              >
                <QuestionCard
                  type="radio"
                  question={`Kalau kamu mau mulai invest, lebih penting mana — ${labelA} atau ${labelB}?`}
                  options={dynamicOptions}
                  value={answers[index]}
                  onValueChange={(val) => handleChange(index, val)}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-70 px-3">
        <div
          className={`backdrop-blur-xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 ease-out h-7 border
            ${isComplete
              ? "bg-transparent border-[#82E2B3] hover:shadow-[0_0_15px_rgba(130,226,179,0.25)] hover:scale-[1.03] active:scale-[0.98]"
              : "bg-black/40 border-white/10"
            }`}
        >
          {!isComplete ? (
            <div className="flex gap-1.5 items-center justify-center w-full px-4">
              {[...Array(total)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i < filled
                      ? "bg-[#82E2B3] w-6 shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                      : "bg-white/15 w-4"
                  }`}
                />
              ))}
            </div>
          ) : (
            <button
              onClick={handleNext}
              className="w-full h-full flex items-center justify-center text-[#82E2B3] font-poppins text-xs font-medium tracking-wider transition-colors duration-200 cursor-pointer"
            >
              lihat hasil
            </button>
          )}
        </div>
      </div>
    </main>
  );
}