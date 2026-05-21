interface Todo {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

type TodoFormData = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

export type { Todo, TodoFormData };
