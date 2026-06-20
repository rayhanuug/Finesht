// ============================================================
// calculateHealth.ts
// Logika kalkulasi kesehatan keuangan berdasarkan:
// - Jurnal Putra et al. (2024) — Analisis Rasio Keuangan Pribadi
// - Asad (2014) — Financial Check Up: In What Stage Are You?
// ============================================================

export type KondisiKeuangan =
  | "shocked"
  | "stressed"
  | "stressless"
  | "stressfree"
  | "free";

export interface HealthInput {
  income: number;        // penghasilan bulanan
  pengeluaran: number;   // total pengeluaran bulanan
  cicilan: number;       // total cicilan bulanan
  tabungan: number;      // tabungan bulanan
  danaDarurat: number;   // total dana darurat / kas yang dimiliki
}

export interface HealthResult {
  score: number;               // 0-100
  kondisi: KondisiKeuangan;
  rasio: {
    dsr: number;               // Debt Service Ratio (%)
    savingRate: number;        // Saving Rate (%)
    likuiditas: number;        // Rasio Likuiditas (x bulan)
    cashflow: number;          // Cashflow (% dari income)
  };
  indikator: {
    dsr: boolean;              // true = sehat
    savingRate: boolean;
    likuiditas: boolean;
    cashflow: boolean;
  };
}

// ============================================================
// SCORING — Interpolasi proporsional (non-fixed)
// Setiap indikator max 25 poin → total max 100
// ============================================================

function scoreDSR(dsr: number): number {
  if (dsr <= 0) return 25;
  if (dsr >= 0.35) return 0;
  return (1 - dsr / 0.35) * 25;
}

function scoreSavingRate(savingRate: number): number {
  if (savingRate <= 0) return 0;
  return Math.min(savingRate / 0.20, 1) * 25;
}

function scoreLikuiditas(likuiditas: number): number {
  if (likuiditas <= 0) return 0;
  return Math.min(likuiditas / 12, 1) * 25;
}

function scoreCashflow(cashflowPct: number): number {
  // Cashflow ideal = 30%+ dari income
  // Negatif = 0 poin
  if (cashflowPct <= 0) return 0;
  return Math.min(cashflowPct / 0.30, 1) * 25;
}

// ============================================================
// KONDISI — Priority-based sesuai Asad (2014)
// ============================================================

function determineKondisi(
  indikator: HealthResult["indikator"],
  likuiditas: number
): KondisiKeuangan {
  const { dsr, savingRate, cashflow } = indikator;

  // Shocked — cashflow negatif DAN DSR buruk
  if (!cashflow && !dsr) return "shocked";

  // Stressed — salah satu indikator utama buruk
  if (!cashflow || !dsr || !savingRate) return "stressed";

  // Semua indikator utama oke → tentukan level dari dana darurat
  if (likuiditas >= 12) return "free";
  if (likuiditas >= 6) return "stressfree";
  if (likuiditas >= 3) return "stressless";

  // Semua oke tapi DD kurang dari 3x
  return "stressed";
}

// ============================================================
// KONDISI LABEL — untuk display di UI
// ============================================================

export const KONDISI_LABEL: Record<KondisiKeuangan, string> = {
  shocked: "Financially Shocked",
  stressed: "Financially Stressed",
  stressless: "Financially Stressless",
  stressfree: "Financially Stressfree",
  free: "Financially Free",
};

export const KONDISI_STATUS: Record<KondisiKeuangan, string> = {
  shocked: "Kondisi keuangan perlu perhatian segera",
  stressed: "Masih ada tekanan di keuanganmu",
  stressless: "Kondisi dasar sudah cukup stabil",
  stressfree: "Sudah bebas dari tekanan keuangan",
  free: "Keuanganmu sangat sehat",
};

// ============================================================
// MAIN FUNCTION
// ============================================================

export function calculateHealth(input: HealthInput): HealthResult {
  const { income, pengeluaran, cicilan, tabungan, danaDarurat } = input;

  // Hitung rasio
  const dsr = income > 0 ? cicilan / income : 0;
  const savingRate = income > 0 ? tabungan / income : 0;
  const cashflowNominal = income - pengeluaran - cicilan;
  const cashflowPct = income > 0 ? cashflowNominal / income : 0;
  const likuiditas = pengeluaran > 0 ? danaDarurat / pengeluaran : 0;

  // Hitung score per indikator
  const scoreDSRVal = scoreDSR(dsr);
  const scoreSavingVal = scoreSavingRate(savingRate);
  const scoreLikuiditasVal = scoreLikuiditas(likuiditas);
  const scoreCashflowVal = scoreCashflow(cashflowPct);

  // Total score (0-100)
  const score = Math.round(
    scoreDSRVal + scoreSavingVal + scoreLikuiditasVal + scoreCashflowVal
  );

  // Indikator boolean
  const indikator = {
    dsr: dsr < 0.35,
    savingRate: savingRate >= 0.10,
    likuiditas: likuiditas >= 3,
    cashflow: cashflowNominal > 0,
  };

  // Tentukan kondisi
  const kondisi = determineKondisi(indikator, likuiditas);

  return {
    score,
    kondisi,
    rasio: {
      dsr: Math.round(dsr * 100),
      savingRate: Math.round(savingRate * 100),
      likuiditas: Math.round(likuiditas * 10) / 10,
      cashflow: Math.round(cashflowPct * 100),
    },
    indikator,
  };
}