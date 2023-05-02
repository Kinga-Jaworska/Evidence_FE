import { useMutation } from "@tanstack/react-query";
import type { NextPage } from "next";
import toast from "react-simple-toasts";
import { AddForm, Task } from "../../src/components/forms";

const AddPage: NextPage = () => {
  const mutation = useMutation({
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
    console.log(data);
    mutation.mutate(data);
  };

  return <AddForm handleSubmit={onSubmit} />;
};

export default AddPage;
