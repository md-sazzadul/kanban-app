import { closestCorners, DndContext, type DragEndEvent } from "@dnd-kit/core";
import Column from "../column/Column";
import { useColumnStore } from "../column/columnStore";
import { useTaskStore } from "../task/taskStore";
import { useBoardStore } from "./boardStore";

const BoardView = () => {
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const columns = useColumnStore((s) => s.columns);
  const loading = useBoardStore((s) => s.loading);
  const moveTask = useTaskStore((s) => s.moveTask);
  const reorderTasks = useTaskStore((s) => s.reorderTasks);

  const filteredColumns = columns.filter(
    (col) => col.boardId === activeBoardId,
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const targetColumnId = over.id as string;

    moveTask(taskId, targetColumnId);

    if (active.id !== over.id) {
      reorderTasks(active.id as string, over.id as string);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-6 overflow-x-auto h-full">
        {filteredColumns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </DndContext>
  );
};

export default BoardView;
