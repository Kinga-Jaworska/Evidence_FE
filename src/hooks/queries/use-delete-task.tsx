import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHeaders } from "../use-header";

export function useDeleteTask() {
  const { headers } = useHeaders();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await fetch(`http://localhost:3000/api/v1/time_slots/${id}`, {
        method: "DELETE",
        headers,
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return { deleteMutation };
}
