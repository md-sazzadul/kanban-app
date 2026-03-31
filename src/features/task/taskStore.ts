import { create } from "zustand";
import { getTasks } from "../../services/task";
import type { Task } from "../../types";

type TaskStore = {
  tasks: Task[];
  fetchTasks: () => Promise<void>;

  moveTask: (taskId: string, columnId: string) => void;
  reorderTasks: (activeId: string, overId: string) => void;
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

  reorderTasks: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.tasks.findIndex((t) => t.id === activeId);
      const newIndex = state.tasks.findIndex((t) => t.id === overId);

      const newTasks = [...state.tasks];
      const [moved] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, moved);

      return { tasks: newTasks };
    }),
}));
