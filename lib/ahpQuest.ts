
import { Kriteria } from "./ahpLogic";

export interface AHPQuestion {
  pair: { a: Kriteria; b: Kriteria };
  question: string;
}

export const AHP_QUESTIONS: AHPQuestion[] = [
  {
    pair: { a: "return", b: "risk" },
    question:
      "Jujurly, lo tipe investor yang ngejar cuan banyak atau tipe safety player yang penting modal aman anti-boncos?",
  },

  {
    pair: { a: "return", b: "likuiditas" },
    question:
      "Lo lebih milih investasi yang ngasih return tinggi tapi butuh waktu lama, atau yang mau dananya fleksibel bisa ditarik kapan aja pas butuh?",
  },

  {
    pair: { a: "return", b: "modal" },
    question:
      "Prioritas utama lu buat mulai berinvestasi: Persentase profit tinggi atau modal mulai berinvestasi yang murah?",
  },

  {
    pair: { a: "return", b: "timeHorizon" },
    question:
      "Uang investasi lu prefer di-hold buat jangka panjang demi return maksimal, atau mau yang langsung keliatan hasilnya bulan depan?",
  },

  {
    pair: { a: "risk", b: "likuiditas" },
    question:
      "Ketika lo lebih tenang kalau nilai investasi lu ga gampang turun, atau dana yang lu investasiin mudah buat dicairin kapan aja?",
  },

  {
    pair: { a: "risk", b: "modal" },
    question:
      "Kalau lu harus milih, lu lebih pilih investasi yang super stabil tapi nilai belinya cukup mahal, atau instrumen investasi yang murah meriah tapi tingkat risikonya fluktuatif?",
  },

  {
    pair: { a: "risk", b: "timeHorizon" },
    question:
      "Untuk dana yang mau lu investasiin, lu lebih mentingin nilai uang investasi lu gak berkurang sama sekali dalam waktu dekat, atau rela naik-turun asal ada peluang tumbuh?",
  },

  {
    pair: { a: "likuiditas", b: "modal" },
    question:
      "Menurut lu mana yang lu butuhin saat ini untuk mulai investasi? Proses penarikan dana yang mudah, atau mulai investasi dengan harga yang murah?",
  },

  {
    pair: { a: "likuiditas", b: "timeHorizon" },
    question:
      "Berdasarkan rencana keuangan, lebih butuh dana yang bisa ditarik kapanpun, atau investasi yang jangka waktunya sesuai sama target rencana lu nanti?",
  },

  {
    pair: { a: "modal", b: "timeHorizon" },
    question:
      "Buat kamu, lebih penting bisa mulai investasi dari modal kecil, atau nggak nunggu lama buat lihat hasilnya?",
  },
];