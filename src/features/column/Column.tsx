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
  const tasks = useTaskStore((s) => s.tasks);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const columnTasks = tasks.filter((task) => task.columnId === column.id);

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-gray-800 rounded p-4 w-72 min-w-70"
    >
      <h2 className="font-semibold mb-4">{column.title}</h2>

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
        <p className="text-sm text-gray-400">No tasks</p>
      )}

      <button
        onClick={() => setOpen(true)}
        className="mt-3 text-sm text-blue-500"
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
