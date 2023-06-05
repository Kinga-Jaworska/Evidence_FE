import { useMutation } from "@tanstack/react-query";
import type { NextPage } from "next";
import toast from "react-simple-toasts";
import { TaskForm } from "../src/components/forms/task-form";
import useAuth from "../src/hooks/use-auth";
import { Task } from "../src/services";

const AddPage: NextPage = () => {
  const { headers } = useAuth();
  const addMutation = useMutation({
    mutationFn: async (data: Task) => {
      return await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers,
        body: JSON.stringify({ ...data, user_id: 1 }),
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
