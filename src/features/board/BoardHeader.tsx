import { useBoardStore } from "./boardStore";

const BoardHeader = () => {
  const boards = useBoardStore((s) => s.boards);
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const setActiveBoard = useBoardStore((s) => s.setActiveBoard);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 shadow flex gap-4">
      {boards.map((b) => (
        <button
          key={b.id}
          onClick={() => setActiveBoard(b.id)}
          className={`px-3 py-1 rounded ${
            activeBoardId === b.id ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {b.title}
        </button>
      ))}
    </div>
  );
};

export default BoardHeader;
