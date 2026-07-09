type Props = {
  number: number;
  title: string;
  description: string;
};

export default function ActionItem({ number, title, description }: Props) {

  const isFirst= number === 1;

  return (
    <div
      className="flex items-start gap-4 py-2 rounded-xl"
    >
      {}
      <span
        className={`font-poppins font-regular text-5xl shrink-0 w-7 inline-block text-left transition-all duration-300 transform ${
          isFirst
            ? "text-transparent [-webkit-text-stroke:0.8px_rgba(130,226,174,0.5)] translate-x-1.5"
            : "text-transparent [-webkit-text-stroke:0.8px_rgba(130,226,174,0.5)]"
        }`}
      >
        {number}
      </span>
      {}
      <div className="flex flex-col gap-1 pt-1">
        <span className="text-white font-poppins font-medium text-[10px]">
          {title}
        </span>
        <span className="text-white/50 font-poppins font-light text-[10px]">
          {description}
        </span>
      </div>
    </div>
  );
}