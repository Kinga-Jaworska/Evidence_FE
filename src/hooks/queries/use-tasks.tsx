import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GroupedTask } from "../../services";
import useAuth from "../use-auth";

export function useTasks() {
  const { token } = useAuth();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchGroups = (): Promise<GroupedTask> =>
    axios
      .get("http://localhost:3000/api/v1/tasks/", {
        headers: {
          ...headers,
        },
      })
      .then((response) => response.data);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchGroups,
  });

  return { isLoading, error, data };
}
