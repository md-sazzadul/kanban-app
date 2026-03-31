import type { Task } from "../types";
import { api } from "./api";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks.json");
  return res.data;
};
