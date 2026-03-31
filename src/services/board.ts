import type { Board } from "../types";
import { api } from "./api";

export const getBoards = async (): Promise<Board[]> => {
  const res = await api.get("/boards.json");
  return res.data;
};
