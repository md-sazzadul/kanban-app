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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="bg-white dark:bg-gray-700 p-3 rounded shadow cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <h3 className="font-medium">{task.title}</h3>

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
          onClick={() => deleteTask(task.id)}
          className="mt-3 text-red-500"
        >
          Delete Task
        </button>
      </Modal>
    </>
  );
};

export default TaskCard;
