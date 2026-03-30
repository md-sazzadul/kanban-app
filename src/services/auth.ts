import { api } from "./api";

export type User = {
  id: string;
  email: string;
  password: string;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.get<User[]>("/users.json");

  const user = res.data.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export const registerUser = async (email: string, password: string) => {
  const res = await api.get<User[]>("/users.json");

  const exists = res.data.find((u) => u.email === email);

  if (exists) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password,
  };

  // ⚠️ Note: Since it's static JSON, we can't persist to file
  // We'll simulate by saving in localStorage

  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
  localStorage.setItem("users", JSON.stringify([...localUsers, newUser]));

  return newUser;
};
