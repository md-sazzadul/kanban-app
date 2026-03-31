import { create } from "zustand";
import { getTasks } from "../../services/task";
import type { Task } from "../../types";

type TaskStore = {
  tasks: Task[];
  searchQuery: string;
  priorityFilter: "all" | "low" | "medium" | "high";
  fetchTasks: () => Promise<void>;

  moveTask: (taskId: string, columnId: string) => void;
  reorderTasks: (activeId: string, overId: string) => void;

  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;

  setSearchQuery: (query: string) => void;
  setPriorityFilter: (priority: "all" | "low" | "medium" | "high") => void;
  getFilteredTasks: () => Task[];
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  searchQuery: "",
  priorityFilter: "all",

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

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t,
      ),
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setPriorityFilter: (priority) => set({ priorityFilter: priority }),

  getFilteredTasks: () => {
    const { tasks, searchQuery, priorityFilter } = get();

    let filteredTasks = tasks;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(query),
      );
    }

    // Filter by priority
    if (priorityFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priorityFilter,
      );
    }

    return filteredTasks;
  },
}));
