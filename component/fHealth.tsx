import FinancialMetric from "@/component/fMetric";
import ProgressBar from "@/component/pBar";
import {Icon} from "@iconify/react";

type Props = {
  healthScore: number;
  status: string;
  statusLabel: string;
  metrics: {
    label: string;
    value: string;
    color?: string;
  }[];
};

export default function FinancialHealthPanel({
  healthScore,
  status,
  statusLabel,
  metrics,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* Health Score Card */}
      <div
        className="rounded-xl border border-white/10 p-5 flex flex-col gap-4"
        style={{
          background: "rgba(4, 4, 4, 0.20)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-white font-poppins font-semibold text-base">
            Health Score
          </span>
          <span
            className="text-xs font-poppins px-3 py-1 rounded-full border"
            style={{ color: "#82E2B3", borderColor: "#82E2B3" }}
          >
            {statusLabel}
          </span>
        </div>

        {/*Score*/}
        <div className="flex items-end gap-1">
          <span
            className="font-poppins font-bold text-5xl leading-none"
            style={{ color: "#82E2B3" }}
          >
            {healthScore}
          </span>
          <span className="text-white/40 font-poppins text-lg mb-1">/100</span>
        </div>
        <ProgressBar mode="step" current={healthScore} total={100} />
      </div>

      {/*Status*/}
      <div
        className="rounded-xl border border-white/10 p-4 flex items-center gap-3"
        style={{
          background: "rgba(4, 4, 4, 0.20)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <Icon
          icon="solar:shield-bold"
          width={28}
          height={28}
          style={{ color: "#82E2B3" }}
        />
        <div className="flex flex-col">
          <span className="text-white/50 font-poppins text-xs">
            Status Kebebasan Finansial
          </span>
          <span className="text-white font-poppins font-medium text-sm">
            {status}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <FinancialMetric
            key={m.label}
            label={m.label}
            value={m.value}
            color={m.color}
          />
        ))}
      </div>
    </div>
  );
}