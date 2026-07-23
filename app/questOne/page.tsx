"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/component/qCard";

export default function QuestOne() {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    income: "",
    pengeluaran: "",
    cicilan: "",
    tabungan: "",
    danaDarurat: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const q2Ref = useRef<HTMLDivElement>(null);
  const q3Ref = useRef<HTMLDivElement>(null);
  const q4Ref = useRef<HTMLDivElement>(null);
  const q5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const navigationEntries = performance.getEntriesByType("navigation");
      const isReload =
        navigationEntries.length > 0 &&
        (navigationEntries[0] as PerformanceNavigationTiming).type === "reload";

      if (isReload) {
        localStorage.removeItem("finesht_health");
      } else {
        const saved = localStorage.getItem("finesht_health");
        if (saved) {
          setAnswers(JSON.parse(saved));
        }
      }
    } catch (e) {
      console.error("Gagal mendeteksi reload atau memulihkan data", e);
    }
    setIsLoaded(true);
  }, []);

  function handleChange(key: keyof typeof answers, val: string) {
    setAnswers((prev) => {
      const updated = { ...prev, [key]: val };
      localStorage.setItem("finesht_health", JSON.stringify(updated));
      return updated;
    });
  }

  useEffect(() => {
    if (!isLoaded) return;
    if (answers.income !== "" && answers.pengeluaran === "") {
      const timer = setTimeout(() => {
        q2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [answers.income, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (answers.pengeluaran !== "" && answers.cicilan === "") {
      const timer = setTimeout(() => {
        q3Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [answers.pengeluaran, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (answers.cicilan !== "" && answers.tabungan === "") {
      const timer = setTimeout(() => {
        q4Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [answers.cicilan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (answers.tabungan !== "" && answers.danaDarurat === "") {
      const timer = setTimeout(() => {
        q5Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [answers.tabungan, isLoaded]);

  const filled = Object.values(answers).filter((v) => v !== "").length;
  const total = Object.keys(answers).length;
  const isComplete = filled === total;

  function handleNext() {
    localStorage.setItem("finesht_health", JSON.stringify(answers));
    router.push("/questAhp");
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden pb-40">
      <div
        className="absolute top-0 left-0 w-full h-130 md:h-100 opacity-45 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 70% at top center, #82E2B3 0%, transparent 70%)",
        }}
      />

      <nav className="relative flex items-center justify-between md:justify-center px-6 py-5 my-3 md:my-5 w-full">
        <Link
          href="/" className="md:absolute md:left-10 flex items-center gap-1 text-white font-poppins text-sm md:text-md hover:opacity-80 transition-opacity"
        >
          home
        </Link>  
        <span className="text-white font-outfit font-bold text-xl md:text-2xl tracking-tight md:mx-auto">
          Finesht
        </span>
      </nav>

      <section className="flex justify-center flex-col">
        <div className="flex flex-col items-center mt-8 mb-5 md:mt-10 text-center px-6">
          <h2 className="font-poppins font-semibold text-xl w-80 sm:text-xl text-white md:w-auto md:text-2xl">
            <em>In this economy</em> seberapa <span className="text-[#82E2B3] underline"> survive</span> <span className="text-[#82E2B3]"> finansialmu?</span>
          </h2>
          <p className="font-poppins font-light text-xs w-50 sm:text-sm mt-2 text-white/60 max-w-xs sm:max-w-sm md:w-100">
            yuk, kita cek kesehatan dan kebebasan financialmu!
          </p>
        </div>

        {/* Questions Area */}
        <div className="max-w-xl mx-auto w-full mt-7 space-y-5 px-4 sm:px-6">
          {/*ini Q-1 */}
          <div className="transition-all duration-500 opacity-100 transform translate-y-0">
            <QuestionCard
              type="chip-input"
              question="Berapa penghasilan bulananmu?"
              options={["3 Jt", "5 Jt", "7 Jt", "10 Jt", "15 Jt"]}
              value={answers.income}
              onValueChange={(val) => handleChange("income", val)}
            />
          </div>

          {/*ini Q-2 */}
          {answers.income !== "" && (
            <div
              ref={q2Ref}
              className="transition-all duration-700 ease-out opacity-100 transform translate-y-0"
            >
              <QuestionCard
                type="chip-input"
                question="Berapa total pengeluaran rutinmu dalam sebulan?"
                options={["1 Jt", "2 Jt", "3 Jt", "5 Jt", "7 Jt"]}
                value={answers.pengeluaran}
                onValueChange={(val) => handleChange("pengeluaran", val)}
              />
            </div>
          )}

          {/*ini Q-3 */}
          {answers.pengeluaran !== "" && (
            <div
              ref={q3Ref}
              className="transition-all duration-700 ease-out opacity-100 transform translate-y-0"
            >
              <QuestionCard
                type="chip-input"
                question="Berapa total cicilan yang kamu bayar tiap bulan?"
                options={["Tidak ada", "500 Rb", "1 Jt", "2 Jt", "3 Jt"]}
                value={answers.cicilan}
                onValueChange={(val) => handleChange("cicilan", val)}
              />
            </div>
          )}

          {/*ini Q-4 */}
          {answers.cicilan !== "" && (
            <div
              ref={q4Ref}
              className="transition-all duration-700 ease-out opacity-100 transform translate-y-0"
            >
              <QuestionCard
                type="chip-input"
                question="Berapa yang kamu sisihkan untuk ditabung tiap bulan?"
                options={["100 Rb", "300 Rb", "500 Rb", "1 Jt", "2 Jt"]}
                value={answers.tabungan}
                onValueChange={(val) => handleChange("tabungan", val)}
              />
            </div>
          )}

          {/*ini Q-5 */}
          {answers.tabungan !== "" && (
            <div
              ref={q5Ref}
              className="transition-all duration-700 ease-out opacity-100 transform translate-y-0"
            >
              <QuestionCard
                type="input"
                question="Berapa total dana darurat / tabungan kas yang kamu punya sekarang?"
                value={answers.danaDarurat}
                onValueChange={(val) => handleChange("danaDarurat", val)}
              />
            </div>
          )}
        </div>
      </section>

      {/* STEPPER / BUTTON NEXT */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full px-4 flex justify-center">
        <div
          className={`backdrop-blur-xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 ease-out h-10 border ${
            isComplete
              ? "bg-black/60 border-[#82E2B3] w-40 hover:shadow-[0_0_15px_rgba(130,226,179,0.25)] hover:scale-[1.03] active:scale-[0.98]"
              : "bg-black/40 border-white/10 w-52"
          }`}
        >
          {!isComplete ? (
            <div className="flex gap-2 items-center justify-center w-full px-4">
              {[...Array(total)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i < filled
                      ? "bg-[#82E2B3] w-6 shadow-[0_0_6px_rgba(130,226,179,0.5)]"
                      : "bg-white/15 w-3"
                  }`}
                />
              ))}
            </div>
          ) : (
            <button
              onClick={handleNext}
              className="w-full h-full flex items-center justify-center text-[#82E2B3] font-poppins text-sm font-medium tracking-wider transition-colors duration-200 cursor-pointer"
            >
              next →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}