import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiCreateTodo,
  apiDeleteTodo,
  apiEditTodo,
  apiGetTodos,
} from "../api/todos";
import type { Todo } from "../types/Todo";

const useTodos = () => {
  const queryClient = useQueryClient();

  const getTodosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: apiGetTodos,
    staleTime: 1000 * 60 * 5,
  });

  const createTodoMutation = useMutation({
    mutationFn: apiCreateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const editTodoMutation = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: Partial<Todo>;
    }) => apiEditTodo(id, updatedData as Todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: apiDeleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    getTodosQuery,
    createTodo: createTodoMutation.mutateAsync,
    editTodo: editTodoMutation.mutateAsync,
    deleteTodo:deleteTodoMutation.mutateAsync
  };
};

export { useTodos };
