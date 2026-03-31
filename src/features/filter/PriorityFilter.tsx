import { useTaskStore } from "../task/taskStore";

const PriorityFilter = () => {
  const priorityFilter = useTaskStore((s) => s.priorityFilter);
  const setPriorityFilter = useTaskStore((s) => s.setPriorityFilter);

  const priorities = [
    {
      value: "all",
      label: "All Priorities",
      color: "bg-gray-200 dark:bg-gray-700",
    },
    { value: "low", label: "Low", color: "bg-green-200 text-green-800" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-200 text-yellow-800",
    },
    { value: "high", label: "High", color: "bg-red-200 text-red-800" },
  ] as const;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by Priority:
        </span>
        <div className="flex gap-2">
          {priorities.map((priority) => (
            <button
              key={priority.value}
              onClick={() => setPriorityFilter(priority.value)}
              className={`px-3 py-1 rounded text-sm transition-all ${
                priorityFilter === priority.value
                  ? `${priority.color} ring-2 ring-blue-500 font-semibold`
                  : `${priority.color} opacity-60 hover:opacity-100`
              }`}
            >
              {priority.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriorityFilter;
