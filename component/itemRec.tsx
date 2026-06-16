type Props = {
  number: number;
  title: string;
  description: string;
};

export default function ActionItem({ number, title, description }: Props) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl"
      style={{ background: "#0B0B0B" }}
    >
      {/* Nomor */}
      <span
        className="font-poppins font-bold text-5xl leading-none flex-shrink-0"
        style={{ color: "#82E2AE" }}
      >
        {number}
      </span>

      {/* Konten */}
      <div className="flex flex-col gap-1 pt-1">
        <span className="text-white font-poppins font-semibold text-sm">
          {title}
        </span>
        <span className="text-white/50 font-poppins font-light text-xs leading-relaxed">
          {description}
        </span>
      </div>
    </div>
  );
}