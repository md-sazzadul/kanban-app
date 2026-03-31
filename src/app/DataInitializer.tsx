import { useEffect } from "react";
import { useBoardStore } from "../features/board/boardStore";
import { useColumnStore } from "../features/column/columnStore";
import { useTaskStore } from "../features/task/taskStore";

const DataInitializer = ({ children }: any) => {
  const fetchBoards = useBoardStore((s) => s.fetchBoards);
  const fetchColumns = useColumnStore((s) => s.fetchColumns);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);

  useEffect(() => {
    fetchBoards();
    fetchColumns();
    fetchTasks();
  }, []);

  return children;
};

export default DataInitializer;
