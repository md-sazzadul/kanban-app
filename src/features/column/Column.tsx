import type { Column as ColumnType } from "../../types";
import TaskCard from "../task/TaskCard";
import { useTaskStore } from "../task/taskStore";

type Props = {
  column: ColumnType;
};

const Column = ({ column }: Props) => {
  const tasks = useTaskStore((s) => s.tasks);

  const columnTasks = tasks.filter((task) => task.columnId === column.id);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 w-72 min-w-70">
      <h2 className="font-semibold mb-4">{column.title}</h2>

      <div className="flex flex-col gap-2">
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {columnTasks.length === 0 && (
        <p className="text-sm text-gray-400">No tasks</p>
      )}
    </div>
  );
};

export default Column;
