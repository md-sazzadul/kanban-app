import PriorityFilter from "../filter/priorityFilter";
import SearchBar from "../search/SearchBar";
import { useBoardStore } from "./boardStore";

const BoardHeader = () => {
  const boards = useBoardStore((s) => s.boards);
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const setActiveBoard = useBoardStore((s) => s.setActiveBoard);

  return (
    <div className="bg-white dark:bg-gray-900 shadow">
      <div className="p-4 flex gap-4 border-b border-gray-200 dark:border-gray-700">
        {boards.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveBoard(b.id)}
            className={`px-3 py-1 rounded ${
              activeBoardId === b.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {b.title}
          </button>
        ))}
      </div>
      <SearchBar />
      <PriorityFilter />
    </div>
  );
};

export default BoardHeader;
