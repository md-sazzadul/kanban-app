import { useState } from "react";
import z from "zod";
import type { Task } from "../../types";

const schema = z.object({
  title: z.string().min(3),
  priority: z.enum(["low", "medium", "high"]),
});

type Props = {
  onSubmit: (data: Omit<Task, "id">) => void;
  defaultValues?: Partial<Task>;
  onDelete?: () => void;
};

const priorities = [
  { value: "low", label: "Low", dot: "bg-green-500" },
  { value: "medium", label: "Medium", dot: "bg-amber-500" },
  { value: "high", label: "High", dot: "bg-red-500" },
] as const;

const TaskForm = ({ onSubmit, defaultValues, onDelete }: Props) => {
  const [form, setForm] = useState({
    title: defaultValues?.title ?? "",
    priority: defaultValues?.priority ?? "low",
  });
  const [error, setError] = useState("");
  const isEdit = !!defaultValues?.id;

  const handleSubmit = () => {
    const result = schema.safeParse(form);
    if (!result.success) {
      setError("Title must be at least 3 characters.");
      return;
    }
    setError("");
    onSubmit(form as any);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[rgba(79,110,247,0.1)] flex items-center justify-center text-[#4f6ef7] shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>
        <h2 className="text-[16px] font-semibold tracking-tight text-black/85 dark:text-white/90">
          {isEdit ? "Edit task" : "New task"}
        </h2>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {/* Title field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11.5px] font-semibold uppercase tracking-[0.5px] text-black/40 dark:text-white/35">
            Title
          </label>
          <input
            className={`w-full px-3 py-2.5 text-sm text-black/85 dark:text-white/85 bg-black/3 dark:bg-white/5 border rounded-[9px] outline-none transition-all duration-200 placeholder:text-black/30 dark:placeholder:text-white/25
              focus:bg-white dark:focus:bg-[rgba(79,110,247,0.08)] focus:border-[rgba(79,110,247,0.5)] focus:shadow-[0_0_0_3px_rgba(79,110,247,0.1)]
              ${error ? "border-red-500/50 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]" : "border-black/10 dark:border-white/10"}`}
            placeholder="What needs to be done?"
            value={form.title}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
              if (error) setError("");
            }}
            autoFocus
          />
          {error && <span className="text-[12px] text-red-500">{error}</span>}
        </div>

        {/* Priority field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11.5px] font-semibold uppercase tracking-[0.5px] text-black/40 dark:text-white/35">
            Priority
          </label>
          <div className="flex gap-1.5">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setForm({ ...form, priority: p.value })}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[13px] font-medium border rounded-lg cursor-pointer transition-all duration-150
                  ${
                    form.priority === p.value
                      ? "bg-[rgba(79,110,247,0.08)] border-[rgba(79,110,247,0.35)] text-[#4f6ef7] dark:bg-[rgba(79,110,247,0.12)] dark:text-[#818cf8] font-semibold"
                      : "bg-transparent border-black/10 dark:border-white/10 text-black/50 dark:text-white/45 hover:bg-black/4 dark:hover:bg-white/5"
                  }`}
              >
                <span
                  className={`w-1.75 h-1.75 rounded-full shrink-0 ${p.dot}`}
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 items-center">
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3.5 py-2.5 text-[13px] font-medium text-red-500 bg-red-500/[0.07] border border-red-500/20 rounded-[9px] cursor-pointer transition-all duration-150 hover:bg-red-500/12 hover:border-red-500/35"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 py-2.5 text-[14px] font-semibold text-white bg-linear-to-br from-[#4f6ef7] to-[#6d4df5] border-none rounded-[9px] cursor-pointer transition-all duration-150 shadow-[0_3px_12px_rgba(79,110,247,0.3)] hover:-translate-y-px hover:shadow-[0_5px_18px_rgba(79,110,247,0.4)] active:translate-y-0"
        >
          {isEdit ? "Save changes" : "Create task"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
