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
    if (!over || active.id === over.id) return;

    const tasks = useTaskStore.getState().tasks;
    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overTask = tasks.find((t) => t.id === over.id);
    const targetColumnId = overTask ? overTask.columnId : (over.id as string);

    // Only update columnId if the task actually changed columns
    if (activeTask.columnId !== targetColumnId) {
      moveTask(active.id as string, targetColumnId);
    }

    // Always reorder (handles same-column reordering too)
    reorderTasks(active.id as string, over.id as string);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3.5 h-[calc(100vh-130px)] text-black/35 dark:text-white/35 text-sm">
        {/* Spinner — keyframe animation requires custom CSS */}
        <div className="board-spinner w-6 h-6 rounded-full border-2 border-[rgba(79,110,247,0.2)] border-t-[#4f6ef7]" />
        <span>Loading board…</span>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .board-spinner { animation: spin 0.7s linear infinite; }
        `}</style>
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-3.5 p-5 h-[calc(100vh-130px)] items-start overflow-x-auto board-scrollbar">
        {filteredColumns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>

      {/* Horizontal scrollbar styling — not achievable with Tailwind utility classes */}
      <style>{`
        .board-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.15) transparent; }
        .board-scrollbar::-webkit-scrollbar { height: 6px; }
        .board-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
        .dark .board-scrollbar { scrollbar-color: rgba(255,255,255,0.1) transparent; }
        .dark .board-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
      `}</style>
    </DndContext>
  );
};

export default BoardView;
