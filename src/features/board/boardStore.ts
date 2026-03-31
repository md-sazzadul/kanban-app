import { create } from "zustand";
import { getBoards } from "../../services/board";
import type { Board } from "../../types";

type BoardStore = {
  boards: Board[];
  activeBoardId: string | null;
  loading: boolean;

  fetchBoards: () => Promise<void>;
  setActiveBoard: (id: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],
  activeBoardId: null,
  loading: false,

  fetchBoards: async () => {
    set({ loading: true });
    const boards = await getBoards();
    set({
      boards,
      activeBoardId: boards[0]?.id || null,
      loading: false,
    });
  },

  setActiveBoard: (id) => set({ activeBoardId: id }),
}));
