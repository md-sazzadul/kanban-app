import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Modal from "../../components/Modal";
import type { Task } from "../../types";
import { cn } from "../../utils/cn";
import TaskForm from "./TaskForm";
import { useTaskStore } from "./taskStore";

type Props = {
  task: Task;
};

const priorityStyles = {
  low: "bg-green-200 text-green-800",
  medium: "bg-yellow-200 text-yellow-800",
  high: "bg-red-200 text-red-800",
};

const TaskCard = ({ task }: Props) => {
  const [open, setOpen] = useState(false);
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const searchQuery = useTaskStore((s) => s.searchQuery);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Highlight search matches
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={index}
              className="bg-yellow-300 dark:bg-yellow-600 text-gray-900 dark:text-white"
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
        {...listeners}
        {...attributes}
        style={style}
        className="bg-white dark:bg-gray-700 p-3 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setOpen(true)}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h3 className="font-medium">
          {highlightText(task.title, searchQuery)}
        </h3>

        <span
          className={cn(
            "text-xs px-2 py-1 rounded mt-2 inline-block",
            priorityStyles[task.priority],
          )}
        >
          {task.priority}
        </span>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <TaskForm
          defaultValues={task}
          onSubmit={(data) => {
            updateTask({ ...task, ...data });
            setOpen(false);
          }}
        />

        <button
          onClick={() => {
            deleteTask(task.id);
            setOpen(false);
          }}
          className="mt-3 text-red-500 hover:text-red-600"
        >
          Delete Task
        </button>
      </Modal>
    </>
  );
};

export default TaskCard;
