import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getBoards } from "../../services/board";
import type { Board } from "../../types";

type BoardStore = {
  boards: Board[];
  activeBoardId: string | null;
  loading: boolean;

  fetchBoards: () => Promise<void>;
  setActiveBoard: (id: string) => void;
};

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      boards: [],
      activeBoardId: null,
      loading: false,

      fetchBoards: async () => {
        set({ loading: true });
        const boards = await getBoards();
        const { activeBoardId } = get();
        // Keep persisted activeBoardId if it's still valid, otherwise fall back to first board
        const validId =
          boards.find((b) => b.id === activeBoardId)?.id ??
          boards[0]?.id ??
          null;
        set({
          boards,
          activeBoardId: validId,
          loading: false,
        });
      },

      setActiveBoard: (id) => set({ activeBoardId: id }),
    }),
    {
      name: "kanban-board-ui",
      // Only persist activeBoardId — boards are always re-fetched from the API
      partialize: (state) => ({ activeBoardId: state.activeBoardId }),
    },
  ),
);
