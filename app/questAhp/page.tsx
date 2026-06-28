"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AHPScaleCard from "@/component/ahpQCard";
import { KRITERIA_LABEL } from "@/lib/ahpLogic";
import { AHP_QUESTIONS } from "@/lib/ahpQuest";

export default function QuestAhp() {
  const router = useRouter();

  // Default semua tengah (nilai 1 = Sama Penting)
  const [answers, setAnswers] = useState<Record<number, number>>(
    Object.fromEntries(AHP_QUESTIONS.map((_, i) => [i, 1]))
  );

  // Track pertanyaan yang udah disentuh user
  const [touched, setTouched] = useState<Record<number, boolean>>(
    Object.fromEntries(AHP_QUESTIONS.map((_, i) => [i, false]))
  );

  const [isLoaded, setIsLoaded] = useState(false);

  const questionRefs = useRef<(HTMLDivElement | null)[]>(
    Array(AHP_QUESTIONS.length).fill(null)
  );

  useEffect(() => {
    try {
      const navigationEntries = performance.getEntriesByType("navigation");
      const isReload =
        navigationEntries.length > 0 &&
        (navigationEntries[0] as PerformanceNavigationTiming).type === "reload";

      if (isReload) {
        localStorage.removeItem("finesht_ahp");
        localStorage.removeItem("finesht_ahp_touched");
      } else {
        const saved = localStorage.getItem("finesht_ahp");
        const savedTouched = localStorage.getItem("finesht_ahp_touched");
        if (saved) setAnswers(JSON.parse(saved));
        if (savedTouched) setTouched(JSON.parse(savedTouched));
      }
    } catch (e) {
      console.error("Gagal mendeteksi reload atau memulihkan data", e);
    }
    setIsLoaded(true);
  }, []);

  function handleChange(index: number, nilai: number) {
    setAnswers((prev) => {
      const updated = { ...prev, [index]: nilai };
      localStorage.setItem("finesht_ahp", JSON.stringify(updated));
      return updated;
    });

    setTouched((prev) => {
      const updated = { ...prev, [index]: true };
      localStorage.setItem("finesht_ahp_touched", JSON.stringify(updated));
      return updated;
    });

    // Auto scroll ke pertanyaan berikutnya
    setTimeout(() => {
      const nextRef = questionRefs.current[index + 1];
      if (nextRef) {
        nextRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);
  }

  const filled = Object.values(touched).filter((v) => v === true).length;
  const total = AHP_QUESTIONS.length;
  const isComplete = filled === total;
  const visibleCount = Math.min(filled + 1, total);

  function handleNext() {
    const ahpAnswers = AHP_QUESTIONS.map((q, i) => ({
      kriteria_a: q.pair.a,
      kriteria_b: q.pair.b,
      nilai: answers[i],
    }));

    localStorage.setItem("finesht_ahp_answers", JSON.stringify(ahpAnswers));
    router.push("/hasil");
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden pb-40">
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
          className="absolute left-10 flex items-center gap-1 text-white font-poppins text-sm hover:opacity-80 transition-opacity border border-white/30 px-4 py-1.5 rounded-full"
        >
          ← back
        </Link>
        <span className="text-white font-outfit font-bold text-2xl tracking-tight">
          Finesht
        </span>
      </nav>

      <section className="flex justify-center flex-col">
        <div className="flex flex-col items-center mt-10 text-center px-4">
          <h2 className="font-poppins font-semibold text-xl text-white">
            Your money, your rules.{" "}
            <span className="text-[#82E2B3] italic">Even when it comes to investing</span>
          </h2>
          <p className="font-poppins font-light text-sm mt-2 text-white/60">
            Yuk kita cek apa yang paling penting buat kamu dalam berinvestasi
          </p>
        </div>

        <div className="max-w-2xl mx-auto w-full mt-10 space-y-5 px-6">
          {AHP_QUESTIONS.slice(0, visibleCount).map((q, index) => (
            <div
              key={index}
              ref={(el) => { questionRefs.current[index] = el; }}
              className="transition-all duration-700 ease-out"
            >
              <AHPScaleCard
                question={q.question}
                kriteria_a={q.pair.a}
                kriteria_b={q.pair.b}
                labelA={KRITERIA_LABEL[q.pair.a]}
                labelB={KRITERIA_LABEL[q.pair.b]}
                value={answers[index]}
                onValueChange={(nilai) => handleChange(index, nilai)}
                touched={touched[index]}
              />
            </div>
          ))}
        </div>
      </section>

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
              lihat hasil →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}