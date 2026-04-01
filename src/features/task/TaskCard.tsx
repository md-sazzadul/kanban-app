import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Modal from "../../components/Modal";
import type { Task } from "../../types";
import TaskForm from "./TaskForm";
import { useTaskStore } from "./taskStore";

type Props = { task: Task };

const priorityConfig = {
  low: {
    dot: "bg-green-500",
    badge: "bg-green-500/10 text-green-700 dark:text-green-400",
    label: "Low",
  },
  medium: {
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    label: "Med",
  },
  high: {
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-700 dark:text-red-400",
    label: "High",
  },
};

const TaskCard = ({ task }: Props) => {
  const [open, setOpen] = useState(false);
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const searchQuery = useTaskStore((s) => s.searchQuery);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const p = priorityConfig[task.priority];

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <>{text}</>;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={i}
              className="bg-yellow-300/50 dark:bg-yellow-500/30 text-inherit rounded-xs px-px"
            >
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-start bg-white dark:bg-white/6 border border-black/[0.07] dark:border-white/[0.07] rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-all duration-150
          ${
            isDragging
              ? "opacity-50 shadow-[0_8px_24px_rgba(0,0,0,0.15)] scale-[1.02]"
              : "hover:border-[rgba(79,110,247,0.3)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_3px_12px_rgba(0,0,0,0.4)] hover:-translate-y-px"
          }`}
      >
        {/* Drag handle */}
        <div
          {...listeners}
          {...attributes}
          className="px-2 pt-3 pb-2 text-black/20 dark:text-white/20 cursor-grab active:cursor-grabbing shrink-0 transition-colors duration-150 hover:text-black/45 dark:hover:text-white/45"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="5" cy="4" r="1.5" />
            <circle cx="11" cy="4" r="1.5" />
            <circle cx="5" cy="8" r="1.5" />
            <circle cx="11" cy="8" r="1.5" />
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="11" cy="12" r="1.5" />
          </svg>
        </div>

        {/* Card body — clickable */}
        <div
          className="flex-1 min-w-0 pr-3 pt-2.5 pb-2.5 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <p className="text-[13px] font-medium text-black/82 dark:text-white/85 leading-snug mb-2 wrap-break-word">
            {highlightText(task.title, searchQuery)}
          </p>
          <div className="flex items-center">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.badge}`}
            >
              <span
                className={`w-1.25 h-1.25 rounded-full shrink-0 ${p.dot}`}
              />
              {p.label}
            </span>
          </div>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <TaskForm
          defaultValues={task}
          onSubmit={(data) => {
            updateTask({ ...task, ...data });
            setOpen(false);
          }}
          onDelete={() => {
            deleteTask(task.id);
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default TaskCard;
