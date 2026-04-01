import { useTaskStore } from "../task/taskStore";

type Priority = "all" | "low" | "medium" | "high";

const priorities: {
  value: Priority;
  label: string;
  dot?: string;
  activeClasses: string;
}[] = [
  {
    value: "all",
    label: "All",
    activeClasses:
      "bg-black/[0.06] dark:bg-white/[0.08] border-black/10 dark:border-white/12 text-black/80 dark:text-white/85 font-semibold",
  },
  {
    value: "low",
    label: "Low",
    dot: "bg-green-500",
    activeClasses:
      "bg-green-500/[0.12] border-green-500/25 text-green-700 dark:text-green-400 font-semibold",
  },
  {
    value: "medium",
    label: "Medium",
    dot: "bg-amber-500",
    activeClasses:
      "bg-amber-500/[0.12] border-amber-500/30 text-amber-700 dark:text-amber-400 font-semibold",
  },
  {
    value: "high",
    label: "High",
    dot: "bg-red-500",
    activeClasses:
      "bg-red-500/10 border-red-500/25 text-red-700 dark:text-red-400 font-semibold",
  },
];

const PriorityFilter = () => {
  const priorityFilter = useTaskStore((s) => s.priorityFilter);
  const setPriorityFilter = useTaskStore((s) => s.setPriorityFilter);

  return (
    <div className="flex items-center gap-2.5 px-5 pb-2.5">
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.6px] text-black/35 dark:text-white/30 shrink-0">
        Priority
      </span>
      <div className="flex gap-1">
        {priorities.map((p) => (
          <button
            key={p.value}
            onClick={() => setPriorityFilter(p.value)}
            className={`flex items-center gap-1.5 px-3 py-1 text-[12.5px] font-medium border rounded-full cursor-pointer transition-all duration-150
              ${
                priorityFilter === p.value
                  ? p.activeClasses
                  : "bg-transparent border-transparent text-black/50 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/[0.07] hover:text-black/70 dark:hover:text-white/70"
              }`}
          >
            {p.dot && (
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.dot}`} />
            )}
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriorityFilter;
