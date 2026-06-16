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
        <span className="text-white/50 font-poppins text-xs">
          Prioritas Utama
        </span>
        <h3 className="text-white font-poppins font-bold text-lg leading-tight">
          {priority}
        </h3>
        <p className="text-white/60 font-poppins font-light text-xs leading-relaxed">
          {description}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Action Items */}
      <div className="flex flex-col gap-3">
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