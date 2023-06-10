import { useMutation } from "@tanstack/react-query";
import type { NextPage } from "next";
import toast from "react-simple-toasts";
import { TaskForm } from "../src/components/forms/task-form";
import { useStore } from "../src/hooks";
import { useHeaders } from "../src/hooks/use-header";
import { Task } from "../src/services";

const AddPage: NextPage = () => {
  const { authData } = useStore();
  const { headers } = useHeaders();

  const addMutation = useMutation({
    mutationFn: async (data: Task) => {
      return await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers,
        body: JSON.stringify({ ...data, user_id: authData.id }),
      });
    },

    onError: (error: any) => {
      toast("Error", { position: "top-right" });
    },
    onSuccess: () => {},
  });

  const onSubmit = async (data: Task) => {
    addMutation.mutate(data);
  };

  return <TaskForm handleSubmit={onSubmit} />;
};

export default AddPage;
