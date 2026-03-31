import type { Column } from "../types";
import { api } from "./api";

export const getColumns = async (): Promise<Column[]> => {
  const res = await api.get("/columns.json");
  return res.data;
};
