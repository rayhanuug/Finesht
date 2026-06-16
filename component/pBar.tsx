type PercentProps = {
  mode: "percent";
  total: number;
};

type StepProps = {
  mode: "step";
  current: number;
  total: number;
};

type Props = PercentProps | StepProps;

export default function ProgressBar(props: Props) {
  const isPercent = props.mode === "percent";

  const progress = isPercent
    ? Math.min(props.total, 100)
    : Math.min((props.current / props.total) * 100, 100);

  const isValid = isPercent ? props.total === 100 : false;
  const isOver = isPercent ? props.total > 100 : false;

  const barColor = isOver
    ? "#f87171"
    : "linear-gradient(to right, #4ade80, #82E2B3)";

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <div className="flex justify-between items-center">
        <span className="text-white/50 font-poppins text-xs">
          {isPercent ? "Total Kriteria" : "Progress"}
        </span>
        <span
          className={`font-poppins text-xs font-medium transition-colors duration-300 ${
            isPercent
              ? isValid
                ? "text-[#82E2B3]"
                : isOver
                ? "text-red-400"
                : "text-white/50"
              : "text-white/50"
          }`}
        >
          {isPercent
            ? `${props.total}%`
            : `${props.current}/${props.total}`}
        </span>
      </div>

      {/* Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: barColor,
          }}
        />
      </div>

      {/* Warning percent */}
      {isPercent && isOver && (
        <p className="font-poppins text-xs text-center text-red-500 transition-all duration-200">
            Total melebihi 100%
        </p>
        )}
    </div>
  );
}