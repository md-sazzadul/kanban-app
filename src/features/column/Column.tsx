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

type Props = {
  column: ColumnType;
};

const Column = ({ column }: Props) => {
  const [open, setOpen] = useState(false);
  const addTask = useTaskStore((s) => s.addTask);
  const getFilteredTasks = useTaskStore((s) => s.getFilteredTasks);
  const searchQuery = useTaskStore((s) => s.searchQuery);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  // Get filtered tasks based on search query
  const allFilteredTasks = getFilteredTasks();

  const columnTasks = allFilteredTasks.filter(
    (task) => task.columnId === column.id,
  );

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-gray-800 rounded p-4 w-72 min-w-70"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">{column.title}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {columnTasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <SortableContext
          items={columnTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      {columnTasks.length === 0 && (
        <p className="text-sm text-gray-400">
          {searchQuery ? "No matching tasks" : "No tasks"}
        </p>
      )}

      <button
        onClick={() => setOpen(true)}
        className="mt-3 text-sm text-blue-500 hover:text-blue-600"
      >
        + Add Task
      </button>

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
    </div>
  );
};

export default Column;
