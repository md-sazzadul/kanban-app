import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Modal from "../../components/Modal";
import type { Column as ColumnType } from "../../types";
import TaskCard from "../task/TaskCard";
import TaskForm from "../task/TaskForm";
import { useTaskStore } from "../task/taskStore";

type Props = { column: ColumnType };

// Per-column accent colors — only the hex values can't be expressed as static Tailwind classes
const columnAccents: Record<string, { bar: string; count: string }> = {
  "col-1": {
    bar: "#6366f1",
    count: "bg-indigo-500/[0.12] text-indigo-600 dark:text-indigo-400",
  },
  "col-2": {
    bar: "#f59e0b",
    count: "bg-amber-500/[0.12] text-amber-600 dark:text-amber-400",
  },
  "col-3": {
    bar: "#10b981",
    count: "bg-emerald-500/[0.12] text-emerald-600 dark:text-emerald-400",
  },
};
const defaultAccent = {
  bar: "#4f6ef7",
  count: "bg-blue-500/[0.12] text-blue-600 dark:text-blue-400",
};

const Column = ({ column }: Props) => {
  const [open, setOpen] = useState(false);
  const addTask = useTaskStore((s) => s.addTask);
  const getFilteredTasks = useTaskStore((s) => s.getFilteredTasks);
  const searchQuery = useTaskStore((s) => s.searchQuery);
  const priorityFilter = useTaskStore((s) => s.priorityFilter);

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const columnTasks = getFilteredTasks().filter(
    (t) => t.columnId === column.id,
  );
  const accent = columnAccents[column.id] ?? defaultAccent;

  const getEmptyMessage = () => {
    if (searchQuery && priorityFilter !== "all")
      return `No ${priorityFilter} tasks matching "${searchQuery}"`;
    if (searchQuery) return `No tasks matching "${searchQuery}"`;
    if (priorityFilter !== "all") return `No ${priorityFilter} priority tasks`;
    return "No tasks yet";
  };

  return (
    <div
      className={`relative flex flex-col w-72 min-w-72 max-h-[calc(100vh-160px)] bg-black/3 dark:bg-white/3 border rounded-[14px] overflow-hidden transition-all duration-200
      ${
        isOver
          ? "border-[#4f6ef7]/40 shadow-[0_0_0_3px_rgba(79,110,247,0.08),inset_0_0_20px_rgba(79,110,247,0.04)]"
          : "border-black/[0.07] dark:border-white/6"
      }`}
    >
      {/* Colored accent bar — inline style needed because the color is dynamic */}
      <div
        className="h-0.75 w-full opacity-80"
        style={{ background: accent.bar }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-[13.5px] font-semibold tracking-tight text-black/75 dark:text-white/80">
            {column.title}
          </h2>
          <span
            className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${accent.count}`}
          >
            {columnTasks.length}
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          title="Add task"
          className="w-6.5 h-6.5 flex items-center justify-center text-black/35 dark:text-white/30 bg-transparent border border-dashed border-black/18 dark:border-white/15 rounded-lg cursor-pointer transition-all duration-150 hover:bg-[rgba(79,110,247,0.08)] hover:border-[rgba(79,110,247,0.4)] hover:text-[#4f6ef7]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Task list */}
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto px-2.5 pb-3 flex flex-col gap-1.5 col-scrollbar"
      >
        <SortableContext
          items={columnTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {columnTasks.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-7 text-center">
            <svg
              className="text-black/18 dark:text-white/15"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <line x1="9" y1="12" x2="15" y2="12" />
            </svg>
            <p className="text-[12px] text-black/30 dark:text-white/25 leading-relaxed">
              {getEmptyMessage()}
            </p>
          </div>
        )}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <TaskForm
          onSubmit={(data) => {
            addTask({
              ...data,
              id: crypto.randomUUID(),
              columnId: column.id,
              boardId: column.boardId,
            });
            setOpen(false);
          }}
        />
      </Modal>

      {/* Thin scrollbar — can't be done with Tailwind utility classes */}
      <style>{`
        .col-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.12) transparent; }
        .col-scrollbar::-webkit-scrollbar { width: 4px; }
        .col-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
        .dark .col-scrollbar { scrollbar-color: rgba(255,255,255,0.1) transparent; }
        .dark .col-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default Column;
