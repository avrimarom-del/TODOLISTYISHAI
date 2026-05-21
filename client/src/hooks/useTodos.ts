import { useQuery } from "@tanstack/react-query";
import { apiGetTodos } from "../api/todos";

const useTodos = () => {
  const getTodosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: apiGetTodos,
    staleTime: 1000 * 60 * 5,
  });
  return { getTodosQuery };
};

export { useTodos };
