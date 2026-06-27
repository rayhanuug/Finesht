type Props = {
  rank: number;
  name: string;
  match: number;
  variant?: "podium" | "list";
};

export default function RankingCard({ rank, name, match, variant = "list" }: Props) {
  const isPodium = variant === "podium";

  return (
    <div
      className={`relative flex flex-col rounded-xl border border-white/10 overflow-hidden
        ${isPodium ? "p-4 gap-3" : "p-3 flex-row items-center gap-4"}`}
      style={{
        background: "rgba(4, 4, 4, 0.20)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Rank number */}
      <span
        className={`font-poppins font-bold leading-none shrink-0
          ${isPodium ? "text-4xl mb-6 text-transparent [-webkit-text-stroke:0.8px_rgba(130,226,174,0.5)]" : "text-2xl w-5 text-transparent [-webkit-text-stroke:0.8px_rgba(130,226,174,0.5)]"}`}
      >
        {rank}
      </span>

      {isPodium ? (
        <>
          {/* Placeholder ilustrasi
          <div className="w-full h-16 rounded-lg bg-white/5 flex items-center justify-center">
            <span className="text-white/20 text-xs font-poppins"></span>
          </div> */}

          {/* Info */}
          <div className="flex flex-col gap-1">
            <span className="text-white font-poppins font-semibold text-sm">{name}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-poppins" style={{ color: "#82E2B3" }}>
                {match}% match
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Placeholder ilustrasi kecil
          <div className="w-10 h-10 rounded-lg bg-white/5 flex-shrink-0 flex items-center justify-center">
            <span className="text-white/20 text-[8px] font-poppins"></span>
          </div> */}

          {/* Info */}
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-white font-poppins font-semibold text-sm">{name}</span>
            <span className="text-xs font-poppins" style={{ color: "#82E2B3" }}>
              {match}% match
            </span>
          </div>
        </>
      )}
    </div>
  );
}