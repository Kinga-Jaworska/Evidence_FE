import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReadTask, Task } from "../../services";
import { useHeaders } from "../use-header";

type UseEditTaskProps = {
  task: ReadTask;
  onClose?: () => void;
};

export function useEditTask({ onClose, task }: UseEditTaskProps) {
  const queryClient = useQueryClient();
  const { headers } = useHeaders();

  const editMutation = useMutation({
    mutationFn: async (data: Task) => {
      return await fetch(`http://localhost:3000/api/v1/tasks/${task.slot_id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ ...data, user_id: 2 }),
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      onClose?.();
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return { editMutation };
}
