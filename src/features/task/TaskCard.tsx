import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../types";
import { cn } from "../../utils/cn";

type Props = {
  task: Task;
};

const priorityStyles = {
  low: "bg-green-200 text-green-800",
  medium: "bg-yellow-200 text-yellow-800",
  high: "bg-red-200 text-red-800",
};

const TaskCard = ({ task }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white dark:bg-gray-700 p-3 rounded shadow cursor-pointer"
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
  );
};

export default TaskCard;
