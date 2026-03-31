import { create } from "zustand";
import { getTasks } from "../../services/task";
import type { Task } from "../../types";

type TaskStore = {
  tasks: Task[];
  fetchTasks: () => Promise<void>;

  moveTask: (taskId: string, columnId: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const tasks = await getTasks();
    set({ tasks });
  },

  moveTask: (taskId, columnId) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, columnId } : t)),
    })),
}));
