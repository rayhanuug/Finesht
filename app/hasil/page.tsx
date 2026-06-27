"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FinancialHealthPanel from "@/component/fHealth";
import PlanningPanel from "@/component/fRec";
import RankingPanel from "@/component/fRank";
import { calculateHealth, KONDISI_LABEL, KONDISI_STATUS, HealthResult } from "@/lib/profilKeuangan";
import { getFinancialPlan } from "@/lib/planning";
import { calculateAHP, AHPResult, PairwiseAnswer } from "@/lib/ahpLogic";
import { MATRIKS_ALTERNATIF_AHP } from "@/lib/altScore";

export default function Hasil() {
  const [healthResult, setHealthResult] = useState<HealthResult | null>(null);
  const [ahpResult, setAhpResult] = useState<AHPResult | null>(null);
  const [expenseRatio, setExpenseRatio] = useState(0);

  useEffect(() => {
    // ── Financial Health ──
    const rawHealth = localStorage.getItem("finesht_health");
    if (rawHealth) {
      const data = JSON.parse(rawHealth);

      const calculated = calculateHealth({
        income: Number(data.income),
        pengeluaran: Number(data.pengeluaran),
        cicilan: Number(data.cicilan),
        tabungan: Number(data.tabungan),
        danaDarurat: Number(data.danaDarurat),
      });

      const expense = Number(data.income) > 0
        ? Math.round((Number(data.pengeluaran) / Number(data.income)) * 100)
        : 0;

      setHealthResult(calculated);
      setExpenseRatio(expense);
    }

    // ── AHP ──
    const rawAhp = localStorage.getItem("finesht_ahp_answers");
    if (rawAhp) {
      const ahpAnswers: PairwiseAnswer[] = JSON.parse(rawAhp);
      const calculated = calculateAHP(ahpAnswers, MATRIKS_ALTERNATIF_AHP);
      setAhpResult(calculated);
    }
  }, []);

  // Loading state
  if (!healthResult || !ahpResult) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/50 font-poppins text-sm">
          Menghitung kondisi keuanganmu...
        </p>
      </main>
    );
  }

  const plan = getFinancialPlan(healthResult.kondisi);
  const metricColor = (isSehat: boolean) => isSehat ? "#82E2B3" : "#E2D582";

  // Convert ranking AHP ke format RankingPanel
  const rankings = ahpResult.ranking.map((item) => ({
    name: item.nama,
    match: Math.round(item.skor * 100),
  }));

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-400 opacity-45 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 120% 20% at top center, #82E2B3 0%, transparent 70%)",
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
            healthScore={healthResult.score}
            statusLabel={KONDISI_LABEL[healthResult.kondisi]}
            status={KONDISI_STATUS[healthResult.kondisi]}
            metrics={[
              {
                label: "Debt-to-income Ratio",
                value: `${healthResult.rasio.dsr}%`,
                color: metricColor(healthResult.indikator.dsr),
              },
              {
                label: "Emergency Ratio",
                value: `${healthResult.rasio.likuiditas}x`,
                color: metricColor(healthResult.indikator.likuiditas),
              },
              {
                label: "Saving Rate",
                value: `${healthResult.rasio.savingRate}%`,
                color: metricColor(healthResult.indikator.savingRate),
              },
              {
                label: "Expense Ratio",
                value: `${expenseRatio}%`,
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

          {/* Kanan — Investment Ranking dari AHP */}
          <RankingPanel rankings={rankings} />

        </div>

        {/* CR Warning — kalau tidak konsisten */}
        {!ahpResult.isConsistent && (
          <div className="max-w-sm mx-auto mb-8 text-center">
            <p className="text-yellow-400 font-poppins text-xs">
              Jawaban AHP kurang konsisten (CR: {ahpResult.cr}). Hasil ranking mungkin kurang akurat.
            </p>
          </div>
        )}

      </section>
    </main>
  );
}