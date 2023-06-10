import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GroupedTask } from "../../services";
import { useHeaders } from "../use-header";

export function useTasks() {
  const { headers, currentUserID } = useHeaders();

  const fetchGroups = (): Promise<GroupedTask> =>
    axios
      .get(`http://localhost:3000/api/v1/tasks/${currentUserID}`, {
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
