"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/component/qCard";
import ProgressBar from "@/component/pBar";

export default function QuestOne() {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    income: "",
    pengeluaran: "",
    cicilan: "",
    tabungan: "",
    danaDarurat: "",
  });

  function handleChange(key: keyof typeof answers, val: string) {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  }

  // Hitung progress — berapa pertanyaan yang udah diisi
  const filled = Object.values(answers).filter((v) => v !== "" && v !== "0").length;
  const total = Object.keys(answers).length;

  function handleNext() {
    // Simpan ke localStorage buat diambil di page hasil
    localStorage.setItem("finesht_health", JSON.stringify(answers));
    router.push("/hasil");
  }

  const isComplete = filled === total;

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
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
          href="/"
          className="absolute left-10 bottom-6.5 flex items-center gap-1 text-white font-poppins text-md hover:opacity-80 transition-opacity"
        >
          home
        </Link>
        <span className="text-white font-outfit font-bold text-2xl tracking-tight">
          Finesht
        </span>
      </nav>

      <section className="flex justify-center flex-col">
        {/* Header */}
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-poppins font-semibold text-xl text-white">
            <em>In this economy</em>&nbsp;seberapa&nbsp;
            <span className="text-[#82E2B3] underline">survive</span>&nbsp;
            <span className="text-[#82E2B3]">finansialmu?</span>
          </h2>
          <p className="font-poppins font-light text-sm mt-2 text-white/60">
            yuk, kita cek kesehatan dan kebebasan financialmu!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-lg mx-auto w-full px-6 mt-8">
          <ProgressBar mode="step" current={filled} total={total} />
        </div>

        {/* Questions */}
        <div className="max-w-lg mx-auto w-full px-6">

          <div className="my-6">
            <QuestionCard
              type="chip-input"
              question="Berapa penghasilan bulananmu?"
              options={["3 Jt", "5 Jt", "7 Jt", "10 Jt", "15 Jt"]}
              onValueChange={(val) => handleChange("income", val)}
            />
          </div>

          <div className="my-6">
            <QuestionCard
              type="chip-input"
              question="Berapa total pengeluaran rutinmu dalam sebulan?"
              options={["1 Jt", "2 Jt", "3 Jt", "5 Jt", "7 Jt"]}
              onValueChange={(val) => handleChange("pengeluaran", val)}
            />
          </div>

          <div className="my-6">
            <QuestionCard
              type="chip-input"
              question="Berapa total cicilan yang kamu bayar tiap bulan?"
              options={["Tidak ada", "500 Rb", "1 Jt", "2 Jt", "3 Jt"]}
              onValueChange={(val) => handleChange("cicilan", val)}
            />
          </div>

          <div className="my-6">
            <QuestionCard
              type="chip-input"
              question="Berapa yang kamu sisihkan untuk ditabung tiap bulan?"
              options={["100 Rb", "300 Rb", "500 Rb", "1 Jt", "2 Jt"]}
              onValueChange={(val) => handleChange("tabungan", val)}
            />
          </div>

          <div className="my-6">
            <QuestionCard
              type="input"
              question="Berapa total dana darurat / tabungan kas yang kamu punya sekarang?"
              onValueChange={(val) => handleChange("danaDarurat", val)}
            />
          </div>

          {/* Next Button */}
          <div className="flex justify-end mb-16">
            <button
              onClick={handleNext}
              disabled={!isComplete}
              className={`flex items-center gap-2 border px-6 py-2.5 rounded-full font-outfit text-sm transition-all duration-200
                ${isComplete
                  ? "border-white text-white hover:bg-white/10 cursor-pointer"
                  : "border-white/20 text-white/30 cursor-not-allowed"
                }`}
            >
              next →
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}