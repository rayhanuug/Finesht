import Link from "next/link";
import Image from "next/image";

export default function Home(){
        return (
        <main className="relative min-h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
          <nav className="px-6 py-6 md:px-12 lg:px-16">
            <Link
              href="/"
              className="text-white font-outfit font-bold text-2xl md:text-xl tracking-tight hover:opacity-80 transition-opacity"
            >
              Finesht
            </Link>
          </nav>
    
          <section className="flex-1 flex flex-col justify-center md:justify-center px-6 pt-16 md:pt-0 md:px-12 lg:px-16 lg:mb-10 md:max-w-4xl">
            <p className="text-white text-sm font-outfit font-semibold mb-3 ml-1 tracking-wide">
              | Finesht / Finance lab
            </p>
    
            <h1 className="text-white font-montserrat font-semibold text-[2rem] leading-[1.15] mb-5 w-75 md:text-3xl md:w-100 md:mb-6 lg:text-5xl lg:w-3xl  ">
              Personal Finance & Investment Recommendation
            </h1>
    
            <p className="text-white font-poppins font-light text-sm leading-relaxed w-80 md:text-base md:max-w-lg mb-8 md:mb-14 lg:text-sm lg:w-7xl">
              Many financial decisions are made without a clear understanding of
              personal financial conditions. This platform is built to help you
              assess your financial health, understand your risk profile, and make
              more structured investment decisions.
            </p>
    
            <div className="mb-12 md:mb-0">
              <Link
                href="/questOne"
                className="inline-flex items-center gap-2 border border-[#82E2B3] text-[#82E2B3] font-poppins font-light text-[9px] px-5 py-2.5 rounded-full hover:bg-[#82E2B3]/0 hover:border-[#82E2B3]/60 hover:text-[#82E2B3]/70 transition-all duration-300 group"
              >
                Start Your Financial Check
              </Link>
            </div>
          </section>
    
          <div className="absolute bottom-0 right-0 w-[170%] md:w-[150%] lg:bottom-0 lg:right-0 lg:w-[70%] pointer-events-none select-none">
            <Image
              src="image/shape.svg"
              alt=""
              width={1440}
              height={1024}
              className="w-full h-auto"
              priority
              aria-hidden="true"
            />
          </div>
        </main>
     );
}