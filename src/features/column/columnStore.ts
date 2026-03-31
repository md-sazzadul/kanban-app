import { create } from "zustand";
import { getColumns } from "../../services/column";
import type { Column } from "../../types";

type ColumnStore = {
  columns: Column[];
  fetchColumns: () => Promise<void>;
};

export const useColumnStore = create<ColumnStore>((set) => ({
  columns: [],

  fetchColumns: async () => {
    const columns = await getColumns();
    set({ columns });
  },
}));
