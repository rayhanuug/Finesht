import ActionItem from "@/component/itemRec";

type Action = {
  title: string;
  description: string;
};

type Props = {
  priority: string;
  description: string;
  actions: Action[];
};

export default function PlanningPanel({ priority, description, actions }: Props) {
  return (
    <div
      className="flex flex-col gap-4 rounded-xl border border-white/10 p-5"
      style={{
        background: "rgba(4, 4, 4, 0.20)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="text-white font-poppins font-light text-xs">
          Prioritas Utama
        </span>
        <h3 className="text-white font-poppins font-semibold">
          {priority}
        </h3>
        <p className="text-white/80 mt-2 font-poppins font-light text-xs leading-relaxed">
          {description}
        </p>
      </div>

      <p className="text-white font-poppins font-medium text-md mt-5">Smart planning</p>

      {/* Action Items */}
      <div className="flex flex-col gap-5">
        {actions.map((action, index) => (
          <ActionItem
            key={index}
            number={index + 1}
            title={action.title}
            description={action.description}
          />
        ))}
      </div>
    </div>
  );
}