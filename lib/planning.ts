
import { KondisiKeuangan } from "./profilKeuangan";

export interface ActionItem {
  title: string;
  description: string;
}

export interface FinancialPlan {
  prioritas: string;
  deskripsi: string;
  actions: ActionItem[];
}

export const FINANCIAL_PLANNING: Record<KondisiKeuangan, FinancialPlan> = {
  // SHOCKED 
  shocked: {
    prioritas: "Stabilkan Kondisi Keuanganmu Dulu",
    deskripsi:
      "Cashflow kamu lagi negatif dan cicilan udah terlalu besar dari income. Ini saatnya berhenti sejenak dan benerin fondasinya dulu — investasi bisa nunggu, tapi kondisi ini enggak.",
    actions: [
      {
        title: "Audit dan potong pengeluaran tidak esensial",
        description:
          "Bedain mana kebutuhan dan mana keinginan. Pengeluaran konsumtif yang tidak mendesak harus jadi yang pertama dipangkas untuk membuat cashflow kembali positif.",
      },
      {
        title: "Restrukturisasi cicilan",
        description:
          "Cicilan idealnya maksimal 30% dari penghasilan. Hubungi pemberi pinjaman untuk negosiasi keringanan agar beban utang bisa dikurangi dan cashflow membaik.",
      },
      {
        title: "Tunda investasi, fokus cashflow positif dulu",
        description:
          "Pendapatan harus lebih besar dari pengeluaran sebelum memikirkan instrumen investasi apapun. Bangun dulu fondasi yang stabil.",
      },
    ],
  },

  // STRESSED 
  stressed: {
    prioritas: "Perbaiki Cashflow dan Bangun Kebiasaan Menabung",
    deskripsi:
      "Kondisi keuanganmu masih dalam tekanan. Ada indikator yang perlu diperbaiki sebelum bisa melangkah ke tahap berikutnya. Fokus bangun kebiasaan keuangan yang lebih sehat dulu.",
    actions: [
      {
        title: "Terapkan prinsip 'sisihkan, bukan sisakan'",
        description:
          "Sisihkan minimal 10% dari income di awal bulan sebelum bayar apapun. Pindahkan ke rekening terpisah biar tidak tergoda dipakai untuk kebutuhan lain.",
      },
      {
        title: "Buat anggaran bulanan dengan alokasi jelas",
        description:
          "Gunakan panduan alokasi: maksimal 30% cicilan, minimal 10-20% tabungan, 40% kebutuhan harian, dan 10% sosial. Pastikan total pengeluaran tidak melebihi income.",
      },
      {
        title: "Bangun dana darurat 3x pengeluaran dulu",
        description:
          "Sebelum investasi, pastikan ada jaring pengaman. Dana darurat minimal 3x pengeluaran bulanan adalah fondasi utama yang harus dibangun terlebih dahulu.",
      },
    ],
  },

  // STRESSLESS 
  stressless: {
    prioritas: "Perkuat Dana Darurat dan Kenalan sama Investasi",
    deskripsi:
      "Kondisi keuangan dasarmu udah oke — cashflow positif dan udah mulai menabung. Tapi dana darurat masih perlu diperkuat sebelum investasi lebih serius. Ini momen yang tepat untuk mulai belajar dan coba investasi kecil-kecilan.",
    actions: [
      {
        title: "Perkuat dana darurat ke 6x pengeluaran",
        description:
          "Sebelum investasi agresif, pastikan dana darurat cukup untuk menutup 6 bulan pengeluaran. Ini yang bikin investasimu sustainable dan tidak terganggu saat kondisi darurat terjadi.",
      },
      {
        title: "Mulai investasi dengan modal kecil di instrumen rendah risiko",
        description:
          "Coba reksa dana pasar uang atau deposito sebagai langkah awal. Banyak platform yang bisa mulai dari Rp10.000 — yang penting mulai dan belajar dari pengalaman nyata.",
      },
      {
        title: "Pahami profil risikomu sebelum memilih instrumen",
        description:
          "Setiap individu punya toleransi risiko berbeda. Pemahaman profil risiko membantu memilih instrumen yang tepat — obligasi untuk yang konservatif, saham untuk yang lebih agresif.",
      },
    ],
  },

  // STRESSFREE
  stressfree: {
    prioritas: "Optimalkan Portofolio dan Tingkatkan Dana Darurat",
    deskripsi:
      "Kamu udah di posisi yang cukup solid. Dana darurat ada, cashflow positif, dan menabung dengan baik. Sekarang waktunya tingkatkan kualitas investasi dan pastikan dana darurat udah di level ideal.",
    actions: [
      {
        title: "Tingkatkan dana darurat ke 12x pengeluaran",
        description:
          "Kamu udah di jalur yang benar. Dorong dana darurat ke level ideal biar punya ketenangan penuh saat berinvestasi lebih agresif tanpa khawatir kondisi darurat.",
      },
      {
        title: "Diversifikasi ke beberapa instrumen investasi",
        description:
          "Jangan taruh semua di satu instrumen. Spread ke reksa dana, obligasi, dan emas untuk melindungi nilai investasi dari fluktuasi pasar dan mengurangi risiko kerugian besar.",
      },
      {
        title: "Evaluasi portofolio secara berkala",
        description:
          "Pantau kinerja investasi dan sesuaikan dengan perubahan kondisi keuangan atau tujuan finansial. Lakukan evaluasi minimal setahun sekali untuk memastikan portofolio tetap optimal.",
      },
    ],
  },

  // FREE 
  free: {
    prioritas: "Fokus ke Pertumbuhan Aset Jangka Panjang",
    deskripsi:
      "Selamat — kondisi keuanganmu sangat sehat! Dana darurat lebih dari cukup, cashflow positif, dan kebiasaan menabung udah terbentuk dengan baik. Sekarang saatnya uangmu bekerja lebih keras untuk masa depan.",
    actions: [
      {
        title: "Eksplorasi instrumen dengan potensi return lebih tinggi",
        description:
          "Dengan fondasi yang kuat, mulai pertimbangkan saham atau reksa dana saham sesuai profil risikomu — konservatif, moderat, atau agresif. Potensi return lebih besar dengan strategi yang tepat.",
      },
      {
        title: "Terapkan diversifikasi penuh",
        description:
          "Spread investasi ke beberapa instrumen: saham, obligasi, reksa dana, dan emas. Prinsip 'jangan taruh semua telur dalam satu keranjang' tetap berlaku meski kondisi keuangan sudah sangat baik.",
      },
      {
        title: "Monitor dan evaluasi portofolio rutin",
        description:
          "Review strategi investasi secara berkala dan sesuaikan alokasi dengan perkembangan pasar dan perubahan tujuan keuangan jangka panjangmu untuk hasil yang optimal.",
      },
    ],
  },
};

// Helper — ambil planning berdasarkan kondisi
export function getFinancialPlan(kondisi: KondisiKeuangan): FinancialPlan {
  return FINANCIAL_PLANNING[kondisi];
}