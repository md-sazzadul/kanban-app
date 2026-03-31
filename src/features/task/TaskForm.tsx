import { useState } from "react";
import z from "zod";
import type { Task } from "../../types";

const schema = z.object({
  title: z.string().min(3),
  priority: z.enum(["low", "medium", "high"]),
});

type Props = {
  onSubmit: (data: Omit<Task, "id">) => void;
  defaultValues?: Partial<Task>;
};

const TaskForm = ({ onSubmit, defaultValues }: Props) => {
  const [form, setForm] = useState({
    title: defaultValues?.title || "",
    priority: defaultValues?.priority || "low",
  });

  const handleSubmit = () => {
    const result = schema.safeParse(form);

    if (!result.success) {
      alert("Invalid input");
      return;
    }

    onSubmit(form as any);
  };

  return (
    <div>
      <h2 className="text-lg mb-4">Task</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-4"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white w-full py-2"
      >
        Save
      </button>
    </div>
  );
};

export default TaskForm;
