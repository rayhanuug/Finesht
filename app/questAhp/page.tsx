import Link from "next/link";
import QuestionCard from "@/component/qCard"

export default function QuestOne(){
    return(
        <main className="min-h-screen bg-black relative overflow-hidden">     
            <div 
            className="absolute top-0 left-0 w-full h-[400px] opacity-45 pointer-events-none"
            style={{
                background: "radial-gradient(ellipse 120% 70% at top center, #82E2B3 0%, transparent 70%)",
            }}
            />
            {/* ini navbar */}
            <nav className="relative flex items-center justify-center px-6 py-5 my-5">
                <Link href="/" className="absolute left-10 bottom-6.5 flex items-center gap-1 text-white font-poppins text-md hover:opacity-80 transition-opacity">
                    home
                </Link>

                <span className="text-white font-outfit font-bold text-2xl tracking-tight">
                    Finesht
                </span>
            </nav>

            <section className="flex justify-center flex-col">
                <div className="flex flex-col items-center mt-10">
                    <h2 className="font-poppins font-semibold text-xl italic">
                        Your money, your rules — tapi invest dulu yang bener
                    </h2>
                    <p className="font-poppins font-light text-sm mt-2">
                        Yuk kita cek apa yang paling penting buat kamu dalam berinvestasi
                    </p>
                </div>
                <div className="">
                    <div className="max-w-xl mx-auto my-10">
                        <QuestionCard
                            type="radio"
                            question="Kalau kamu mau mulai invest, lebih penting mana — return yang tinggi atau uang kamu tetap aman?"
                            options={["Return jauh lebih penting", "Return sedikit lebih penting", "Keduanya sama penting", "Keamanan sedikit lebih penting", "Keamanan jauh lebih penting"]}
                        />
                    </div>
                    <div className="max-w-xl mx-auto my-10">
                        <QuestionCard
                            type="radio"
                            question="Kalau kamu mau mulai invest, lebih penting mana — return yang tinggi atau uang kamu tetap aman?"
                            options={["Return jauh lebih penting", "Return sedikit lebih penting", "Keduanya sama penting", "Keamanan sedikit lebih penting", "Keamanan jauh lebih penting"]}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}