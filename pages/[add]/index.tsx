import { useMutation } from "@tanstack/react-query";
import type { NextPage } from "next";
import toast from "react-simple-toasts";
import { Task, TaskForm } from "../../src/components/forms/task-form";

const AddPage: NextPage = () => {
  const addMutation = useMutation({
    mutationFn: async (data: Task) => {
      return await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, user_id: 2 }),
      });
    },
    onError: (error: any) => {
      toast("Error", { position: "top-right" });
    },
    onSuccess: () => {},
  });

  const onSubmit = (data: Task) => {
    addMutation.mutate(data);
  };

  return <TaskForm handleSubmit={onSubmit} />;
};

export default AddPage;
