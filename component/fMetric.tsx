type Props = {
  label: string;
  value: string;
  color?: string; // default #82E2B3
};

export default function FinancialMetric({ label, value, color = "#82E2B3" }: Props) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-xl border border-white/10"
      style={{
        background: "rgba(4, 4, 4, 0.20)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span className="text-white/50 font-poppins text-xs">{label}</span>
      <span
        className="font-poppins font-semibold text-2xl leading-tight"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}