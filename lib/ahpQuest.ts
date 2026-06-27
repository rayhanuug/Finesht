// ============================================================
// ahpQuestions.ts
// Data 10 pertanyaan pairwise comparison AHP
// Urutan sesuai PAIRWISE_PAIRS di calculateAHP.ts
// ============================================================

import { Kriteria } from "./ahpLogic";

export interface AHPQuestion {
  pair: { a: Kriteria; b: Kriteria };
  question: string;
}

export const AHP_QUESTIONS: AHPQuestion[] = [
  // 1. return vs risk
  {
    pair: { a: "return", b: "risk" },
    question:
      "Jujurly, lo tipe investor yang ngejar cuan banyak atau tipe safety player yang penting modal aman anti-boncos?",
  },

  // 2. return vs likuiditas
  {
    pair: { a: "return", b: "likuiditas" },
    question:
      "Lo lebih milih investasi yang ngasih return tinggi tapi butuh waktu lama, atau yang mau dananya fleksibel bisa ditarik kapan aja pas butuh?",
  },

  // 3. return vs modal
  {
    pair: { a: "return", b: "modal" },
    question:
      "Prioritas utama lu buat mulai berinvestasi: Persentase profit tinggi atau modal mulai berinvestasi yang murah?",
  },

  // 4. return vs timeHorizon
  {
    pair: { a: "return", b: "timeHorizon" },
    question:
      "Uang investasi lu prefer di-hold buat jangka panjang demi return maksimal, atau mau yang langsung keliatan hasilnya bulan depan?",
  },

  // 5. risk vs likuiditas
  {
    pair: { a: "risk", b: "likuiditas" },
    question:
      "Ketika lo lebih tenang kalau nilai investasi lu ga gampang turun, atau dana yang lu investasiin mudah buat dicairin kapan aja?",
  },

  // 6. risk vs modal
  {
    pair: { a: "risk", b: "modal" },
    question:
      "Kalau lu harus milih, lu lebih pilih investasi yang super stabil tapi nilai belinya cukup mahal, atau instrumen investasi yang murah meriah tapi tingkat risikonya fluktuatif?",
  },

  // 7. risk vs timeHorizon
  {
    pair: { a: "risk", b: "timeHorizon" },
    question:
      "Untuk dana yang mau lu investasiin, lu lebih mentingin nilai uang investasi lu gak berkurang sama sekali dalam waktu dekat, atau rela naik-turun asal ada peluang tumbuh?",
  },

  // 8. likuiditas vs modal
  {
    pair: { a: "likuiditas", b: "modal" },
    question:
      "Menurut lu mana yang lu butuhin saat ini untuk mulai investasi? Proses penarikan dana yang mudah, atau mulai investasi dengan harga yang murah?",
  },

  // 9. likuiditas vs timeHorizon
  {
    pair: { a: "likuiditas", b: "timeHorizon" },
    question:
      "Berdasarkan rencana keuangan, lebih butuh dana yang bisa ditarik kapanpun, atau investasi yang jangka waktunya sesuai sama target rencana lu nanti?",
  },

  // 10. modal vs timeHorizon
  {
    pair: { a: "modal", b: "timeHorizon" },
    question:
      "Buat kamu, lebih penting bisa mulai investasi dari modal kecil, atau nggak nunggu lama buat lihat hasilnya?",
  },
];