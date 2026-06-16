import Link from "next/link";
import FinancialHealthPanel from "@/component/fHealth";
import PlanningPanel from "@/component/fRec";
import RankingPanel from "@/component/fRank";

export default function Hasil(){
    return(
        <main className="min-h-screen bg-black relative overflow-hidden">     
            <div 
                className="absolute top-0 left-0 w-full h-[400px] opacity-45 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 120% 70% at top center, #82E2B3 0%, transparent 70%)",
                }}
            />

            {/* Navbar */}
            <nav className="relative flex items-center justify-center px-6 py-5 my-5">
                <Link href="/" className="absolute left-10 bottom-6.5 flex items-center gap-1 text-white font-poppins text-md hover:opacity-80 transition-opacity">
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
                        healthScore={72}
                        statusLabel="Kondisi Sehat"
                        status="Sudah bebas dari survival mode"
                        metrics={[
                            { label: "Debt-to-income Ratio", value: "24%", color: "#82E2B3" },
                            { label: "Emergency Ratio", value: "8x", color: "#82E2B3" },
                            { label: "Saving Rate", value: "9%", color: "#E2D582" },
                            { label: "Expense Ratio", value: "61%", color: "#82E2B3" },
                        ]}
                    />

                    {/* Tengah — Financial Planning */}
                    <PlanningPanel
                        priority="Tingkatkan Saving Rate kamu"
                        description="Dana darurat kamu sudah cukup, tapi saving rate-mu masih di bawah 10%. Sebelum mulai invest agresif, pastiin dulu cash flow kamu surplus yang cukup biar investasinya sustainable jangka panjang."
                        actions={[
                            {
                                title: "Audit pengeluaran bulanan",
                                description: "Cek mana pengeluaran yang bisa dikurangin. Target saving rate minimal 10% dari income.",
                            },
                            {
                                title: "Buat anggaran bulanan",
                                description: "Alokasikan minimal 10% dari income untuk saving sebelum bayar kebutuhan lain.",
                            },
                            {
                                title: "Evaluasi pos pengeluaran",
                                description: "Identifikasi pengeluaran yang tidak produktif dan alihkan ke saving atau investasi.",
                            },
                        ]}
                    />

                    {/* Kanan — Investment Ranking */}
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
    )
}