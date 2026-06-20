"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FinancialHealthPanel from "@/component/fHealth";
import PlanningPanel from "@/component/fRec";
import RankingPanel from "@/component/fRank";
import { calculateHealth, KONDISI_LABEL, KONDISI_STATUS, HealthResult } from "@/lib/profilKeuangan";
import { getFinancialPlan } from "@/lib/planning";

export default function Hasil() {
  const [result, setResult] = useState<HealthResult | null>(null);
  const [expenseRatio, setExpenseRatio] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem("finesht_health");
    if (!raw) return;

    const data = JSON.parse(raw);

    const calculated = calculateHealth({
      income: Number(data.income),
      pengeluaran: Number(data.pengeluaran),
      cicilan: Number(data.cicilan),
      tabungan: Number(data.tabungan),
      danaDarurat: Number(data.danaDarurat),
    });

    // Hitung expense ratio langsung dari raw data — cuma buat display
    const expense = Number(data.income) > 0
      ? Math.round((Number(data.pengeluaran) / Number(data.income)) * 100)
      : 0;

    setResult(calculated);
    setExpenseRatio(expense);
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/50 font-poppins text-sm">Menghitung kondisi keuanganmu...</p>
      </main>
    );
  }

  const plan = getFinancialPlan(result.kondisi);
  const metricColor = (isSehat: boolean) => isSehat ? "#82E2B3" : "#E2D582";

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-[400px] opacity-45 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 120% 70% at top center, #82E2B3 0%, transparent 70%)",
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

      {/* Content */}
      <section className="relative z-10 flex flex-col px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col items-center mt-10 mb-8">
          <h2 className="font-poppins font-semibold text-xl text-white">
            Here's Your <span className="text-[#82E2B3]">Financial </span>
            <span className="text-[#82E2B3] underline italic">SnapShot</span>
          </h2>
          <p className="font-poppins font-light text-xs mt-2 text-white/60">
            This is how your financial situation looks today
          </p>
        </div>

        {/* 3 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">

          {/* Kiri — Financial Health */}
          <FinancialHealthPanel
            healthScore={result.score}
            statusLabel={KONDISI_LABEL[result.kondisi]}
            status={KONDISI_STATUS[result.kondisi]}
            metrics={[
              {
                label: "Debt-to-income Ratio",
                value: `${result.rasio.dsr}%`,
                color: metricColor(result.indikator.dsr),
              },
              {
                label: "Emergency Ratio",
                value: `${result.rasio.likuiditas}x`,
                color: metricColor(result.indikator.likuiditas),
              },
              {
                label: "Saving Rate",
                value: `${result.rasio.savingRate}%`,
                color: metricColor(result.indikator.savingRate),
              },
              {
                label: "Expense Ratio",
                value: `${expenseRatio}%`,
                // Sehat kalau expense ratio <= 70% dari income
                color: expenseRatio <= 70 ? "#82E2B3" : "#E2D582",
              },
            ]}
          />

          {/* Tengah — Financial Planning */}
          <PlanningPanel
            priority={plan.prioritas}
            description={plan.deskripsi}
            actions={plan.actions}
          />

          {/* Kanan — Investment Ranking (hardcode dulu) */}
          <RankingPanel
            rankings={[
              { name: "Reksa Dana", match: 92 },
              { name: "Obligasi", match: 85 },
              { name: "Deposito", match: 78 },
              { name: "Saham", match: 65 },
              { name: "Emas", match: 60 },
              { name: "Kripto", match: 40 },
            ]}
          />

        </div>
      </section>
    </main>
  );
}