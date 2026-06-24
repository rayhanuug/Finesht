// ============================================================
// calculateAHP.ts
// Logika perhitungan AHP berdasarkan:
// - Saaty, T.L. (1980) — The Analytic Hierarchy Process
// - Saaty, T.L. (2008) — Decision making with the AHP
// - Ishizaka & Labib (2011) — Review of the main developments in AHP
// ============================================================

// ──────────────────────────────────────────────
// TIPE DATA
// ──────────────────────────────────────────────

export type Kriteria = "return" | "risk" | "likuiditas" | "modal" | "timeHorizon";

export type Alternatif =
  | "emas"
  | "deposito"
  | "rdpu"
  | "obligasi"
  | "rdpt"
  | "campuran"
  | "rdSaham"
  | "saham";

export interface PairwiseAnswer {
  kriteria_a: Kriteria;
  kriteria_b: Kriteria;
  nilai: number; // 1/5, 1/3, 1, 3, 5
}

export interface AHPResult {
  bobot: Record<Kriteria, number>;
  ranking: { alternatif: Alternatif; skor: number; nama: string }[];
  cr: number;
  isConsistent: boolean;
}

// ──────────────────────────────────────────────
// KONSTANTA
// ──────────────────────────────────────────────

export const KRITERIA_LIST: Kriteria[] = [
  "return",
  "risk",
  "likuiditas",
  "modal",
  "timeHorizon",
];

export const KRITERIA_LABEL: Record<Kriteria, string> = {
  return: "Expected Return",
  risk: "Tingkat Risiko",
  likuiditas: "Likuiditas",
  modal: "Minimum Investment",
  timeHorizon: "Jangka Waktu",
};

export const ALTERNATIF_LABEL: Record<Alternatif, string> = {
  emas: "Emas",
  deposito: "Deposito",
  rdpu: "Reksa Dana Pasar Uang",
  obligasi: "Obligasi",
  rdpt: "Reksa Dana Pendapatan Tetap",
  campuran: "Reksa Dana Campuran",
  rdSaham: "Reksa Dana Saham",
  saham: "Saham",
};

// Random Index untuk CR (Saaty, 1980)
const RI: Record<number, number> = {
  1: 0,
  2: 0,
  3: 0.58,
  4: 0.90,
  5: 1.12,
  6: 1.24,
  7: 1.32,
  8: 1.41,
  9: 1.45,
};

// Mapping teks pilihan → nilai Saaty
export const SAATY_MAP: Record<string, number> = {
  "A jauh lebih penting": 5,
  "A lebih penting": 3,
  "Keduanya sama penting": 1,
  "B lebih penting": 1 / 3,
  "B jauh lebih penting": 1 / 5,
};

// 10 pasangan pairwise untuk 5 kriteria
export const PAIRWISE_PAIRS: { a: Kriteria; b: Kriteria }[] = [
  { a: "return", b: "risk" },
  { a: "return", b: "likuiditas" },
  { a: "return", b: "modal" },
  { a: "return", b: "timeHorizon" },
  { a: "risk", b: "likuiditas" },
  { a: "risk", b: "modal" },
  { a: "risk", b: "timeHorizon" },
  { a: "likuiditas", b: "modal" },
  { a: "likuiditas", b: "timeHorizon" },
  { a: "modal", b: "timeHorizon" },
];

// ──────────────────────────────────────────────
// BANGUN MATRIKS PAIRWISE 5x5
// ──────────────────────────────────────────────

function buildMatrix(answers: PairwiseAnswer[]): number[][] {
  const n = KRITERIA_LIST.length;
  // Inisialisasi matriks identitas
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(1));

  for (const ans of answers) {
    const i = KRITERIA_LIST.indexOf(ans.kriteria_a);
    const j = KRITERIA_LIST.indexOf(ans.kriteria_b);
    matrix[i][j] = ans.nilai;
    matrix[j][i] = 1 / ans.nilai;
  }

  return matrix;
}

// ──────────────────────────────────────────────
// HITUNG BOBOT KRITERIA
// Metode: normalisasi kolom → rata-rata baris
// ──────────────────────────────────────────────

function calculateWeights(matrix: number[][]): number[] {
  const n = matrix.length;

  // Jumlah tiap kolom
  const colSums = Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      colSums[j] += matrix[i][j];
    }
  }

  // Normalisasi tiap elemen
  const normalized: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      normalized[i][j] = matrix[i][j] / colSums[j];
    }
  }

  // Rata-rata tiap baris = bobot kriteria
  const weights = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    weights[i] = normalized[i].reduce((a, b) => a + b, 0) / n;
  }

  return weights;
}

// ──────────────────────────────────────────────
// HITUNG CONSISTENCY RATIO (CR)
// CR < 0.1 = konsisten (Saaty, 1980)
// ──────────────────────────────────────────────

function calculateCR(matrix: number[][], weights: number[]): number {
  const n = matrix.length;

  // Hitung λmax
  let lambdaMax = 0;
  for (let i = 0; i < n; i++) {
    let weightedSum = 0;
    for (let j = 0; j < n; j++) {
      weightedSum += matrix[i][j] * weights[j];
    }
    lambdaMax += weightedSum / weights[i];
  }
  lambdaMax /= n;

  // Consistency Index
  const ci = (lambdaMax - n) / (n - 1);

  // Consistency Ratio
  const ri = RI[n] ?? 1.12;
  const cr = ci / ri;

  return Math.round(cr * 1000) / 1000;
}

// ──────────────────────────────────────────────
// HITUNG RANKING ALTERNATIF
// Skor = Σ (bobot kriteria × skor alternatif per kriteria)
// ──────────────────────────────────────────────

function calculateRanking(
  bobotRecord: Record<Kriteria, number>,
  altScores: Record<Alternatif, Record<Kriteria, number>>
): { alternatif: Alternatif; skor: number; nama: string }[] {
  const results = (Object.keys(altScores) as Alternatif[]).map((alt) => {
    let skor = 0;
    for (const k of KRITERIA_LIST) {
      skor += bobotRecord[k] * altScores[alt][k];
    }
    return {
      alternatif: alt,
      skor: Math.round(skor * 10000) / 10000,
      nama: ALTERNATIF_LABEL[alt],
    };
  });

  // Urutkan dari skor tertinggi
  return results.sort((a, b) => b.skor - a.skor);
}

// ──────────────────────────────────────────────
// MAIN FUNCTION
// ──────────────────────────────────────────────

export function calculateAHP(
  answers: PairwiseAnswer[],
  altScores: Record<Alternatif, Record<Kriteria, number>>
): AHPResult {
  // 1. Bangun matriks
  const matrix = buildMatrix(answers);

  // 2. Hitung bobot kriteria
  const weights = calculateWeights(matrix);

  // 3. Convert ke Record
  const bobotRecord = Object.fromEntries(
    KRITERIA_LIST.map((k, i) => [k, Math.round(weights[i] * 10000) / 10000])
  ) as Record<Kriteria, number>;

  // 4. Hitung CR
  const cr = calculateCR(matrix, weights);
  const isConsistent = cr < 0.1;

  // 5. Hitung ranking
  const ranking = calculateRanking(bobotRecord, altScores);

  return {
    bobot: bobotRecord,
    ranking,
    cr,
    isConsistent,
  };
}