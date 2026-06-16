"use client" 

import Link from "next/link"
import { useState } from "react"
import CriteriaCard from "@/component/cCard"
import ProgressBar from "@/component/pBar"
import Image from "next/image";


const CRITERIA = [
  {
    id: "return",
    icon:"image/ER.svg",
    bgIcon:"image/ERBg.svg",
    title:"Expected Return",
    iconH:70,
    iconW:70,
    iconCN:"absolute right-0 bottom-0 opacity-90",
    description: "Ini adalah perkiraan keuntungan yang akan kamu dapat dari sebuah investasi.",
    question: "Menurutmu seberapa penting keuntungan buat kamu?",
  },
  {
    id: "risiko",
    icon:"image/bull.svg",
    bgIcon:"image/bullBg.svg",
    iconH:95,
    iconW:95,
    iconCN:"absolute right-0 bottom-0 opacity-90",
    title: "Tingkat Resiko",
    description: "Tingkat risiko menunjukkan seberapa besar kemungkinan kamu mengalami kerugian.",
    question: "Saat memilih investasi, seberapa penting risiko ini buat kamu pertimbangkan?",
  },
  {
    id: "likuiditas",
    icon:"image/liq.svg",
    bgIcon:"image/liqBg.svg",
    iconH:90,
    iconW:90,
    iconCN:"absolute right-[-1] bottom-0 opacity-90",
    title: "Liquiditas",
    description: "Likuiditas menggambarkan seberapa mudah investasi bisa dicairkan jadi uang tunai.",
    question: "Kalau suatu saat butuh dana cepat, sepenting apa hal ini buat kamu?",
  },
  {
    id: "jangka",
    icon:"image/Growth.svg",
    bgIcon:"image/GrowthBg.svg",
    iconH:90,
    iconW:90,
    iconCN:"absolute right-[-2] bottom-0 opacity-90",
    title: "Jangka Waktu",
    description: "Jangka waktu adalah lama waktu investasi untuk melihat uang kamu bertumbuh.",
    question: "Seberapa kuat kamu menunggu uang investasimu tumbuh?",
  },
  {
    id: "minimum",
    icon:"image/minim.svg",
    bgIcon:"image/minimBg.svg",
    iconH:90,
    iconW:90,
    iconCN:"absolute right-0 bottom-0 opacity-90",
    title: "Minimum Investment",
    description: "jumlah modal awal yang perlu kamu siapkan untuk mulai investasi.",
    question: "Seberapa besar pengaruh modal buat kamu mulai investasi?",
  },
]

export default function kriteria(){
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(CRITERIA.map((c) => [c.id, 0]))
  )

  const total = Object.values(values).reduce((a, b) => a + b, 0)
  const isValid = total === 100
  const progress = Math.min(total, 100)

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
        <Link 
          href="/" 
          className="absolute left-10 flex items-center gap-1.5 text-white font-poppins text-sm border border-white/30 px-4 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          ← home
        </Link>

        <span className="text-white font-outfit font-bold text-2xl tracking-tight">
          Finesht
        </span>
      </nav>

      {/* Header */}
      <section className="flex flex-col justify-center items-center mt-10">
        <p className="font-poppins text-xl font-semibold text-white">
          Pilih Kriteria Yang Sesuai Dengan <span className="text-[#82E2B3] underline italic">Personal</span>&nbsp; kamu
        </p>
        <p className="font-poppins text-sm font-light mt-2 text-white/60">
          Atur persentase sesuai kepentingan dan kebutuhan kamu yaa
        </p>
      </section>

      {/* Next button + Cards */}
      <section className="relative z-10 px-6 md:px-12 mt-8 flex flex-col gap-4">

        {/* Next button — kanan atas */}
        <div className="flex justify-end">
          <Link
            href="/hasil" 
            className={`flex items-center gap-2 border mb-5 px-5 py-2 rounded-full font-outfit text-sm transition-all duration-200
              ${isValid
                ? "border-white text-white hover:bg-white/10 pointer-events-auto" 
                : "border-white/20 text-white/30 pointer-events-none"  
              }`}
          >
            next →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CRITERIA.map((c) => (
            <CriteriaCard
              icon={c.icon}
              bgIcon={c.bgIcon}
              bgIconHeight={c.iconH}
              bgIconWidth={c.iconW}
              bgIconClassName={c.iconCN}
              key={c.id}
              title={c.title}
              description={c.description}
              question={c.question}
              value={values[c.id]}
              onChange={(val) => setValues(prev => ({ ...prev, [c.id]: val }))}
            />
          ))}
        </div>
        <div className="w-sm mb-20 mt-10 mx-auto">
            <ProgressBar mode="percent" total={total} />
        </div>
      </section>
    </main>
  )
}