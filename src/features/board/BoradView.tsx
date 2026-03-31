import Column from "../column/Column";
import { useColumnStore } from "../column/columnStore";
import { useBoardStore } from "./boardStore";

const BoardView = () => {
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const columns = useColumnStore((s) => s.columns);

  const filteredColumns = columns.filter(
    (col) => col.boardId === activeBoardId,
  );

  return (
    <div className="flex gap-4 p-6 overflow-x-auto h-full">
      {filteredColumns.map((col) => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  );
};

export default BoardView;
