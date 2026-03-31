export type ID = string;

export type Board = {
  id: string;
  title: string;
};

export type Column = {
  id: string;
  title: string;
  boardId: string;
};

export type Task = {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  columnId: string;
  boardId: string;
};
