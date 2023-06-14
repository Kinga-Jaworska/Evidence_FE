import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHeaders } from "../use-header";

export function useDeleteTask() {
  const { headers } = useHeaders();
  const queryClient = useQueryClient();

  // TODO: change fetch to axios

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await fetch(`${process.env.BE_URL}/time_slots/${id}`, {
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
