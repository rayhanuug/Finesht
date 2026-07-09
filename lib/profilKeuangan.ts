
export type KondisiKeuangan =
  | "shocked"
  | "stressed"
  | "stressless"
  | "stressfree"
  | "free";

export interface HealthInput {
  income: number;        
  pengeluaran: number;  
  cicilan: number;       
  tabungan: number;      
  danaDarurat: number;   
}

export interface HealthResult {
  score: number;               
  kondisi: KondisiKeuangan;
  rasio: {
    dsr: number;               
    savingRate: number;        
    likuiditas: number;        
    cashflow: number;          
  };
  indikator: {
    dsr: boolean;              
    savingRate: boolean;
    likuiditas: boolean;
    cashflow: boolean;
  };
}

// SCORING dalam bemtuk persen
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
  if (cashflowPct <= 0) return 0;
  return Math.min(cashflowPct / 0.30, 1) * 25;
}

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

// MAIN FUNCTION
export function calculateHealth(input: HealthInput): HealthResult {
  const { income, pengeluaran, cicilan, tabungan, danaDarurat } = input;

  // ini Hitung rasio
  const dsr = income > 0 ? cicilan / income : 0;
  const savingRate = income > 0 ? tabungan / income : 0;
  const cashflowNominal = income - pengeluaran - cicilan;
  const cashflowPct = income > 0 ? cashflowNominal / income : 0;
  const likuiditas = pengeluaran > 0 ? danaDarurat / pengeluaran : 0;

  // ini score per indikator
  const scoreDSRVal = scoreDSR(dsr);
  const scoreSavingVal = scoreSavingRate(savingRate);
  const scoreLikuiditasVal = scoreLikuiditas(likuiditas);
  const scoreCashflowVal = scoreCashflow(cashflowPct);

  // ini Total score (0-100)
  const score = Math.round(
    scoreDSRVal + scoreSavingVal + scoreLikuiditasVal + scoreCashflowVal
  );

  // ini Indikator boolean
  const indikator = {
    dsr: dsr < 0.35,
    savingRate: savingRate >= 0.10,
    likuiditas: likuiditas >= 3,
    cashflow: cashflowNominal > 0,
  };

  // cek kondisi
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