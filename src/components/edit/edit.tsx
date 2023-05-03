import { useMutation, useQueryClient } from "@tanstack/react-query";
import Close from "assets/close-circle.svg";
import Image from "next/image";
import { Button } from "../button/button";
import { Task, TaskForm } from "../forms/task-form";
import { ReadTask } from "../home-page-content/home-page-content";
import { CustomModal } from "../modal/modal";
import styles from "./edit.module.scss";

export type EditProps = {
  task: ReadTask;
  open: boolean;
  onClose: () => void;
};

export const Edit = ({ task, open, onClose }: EditProps) => {
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: async (data: Task) => {
      return await fetch(`http://localhost:3000/api/v1/tasks/${task.slot_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, user_id: 2 }),
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleEdit = (task: Task) => {
    editMutation.mutate(task);
  };

  return (
    <CustomModal open={open} closeModal={onClose}>
      <TaskForm
        handleSubmit={handleEdit}
        initialValues={task}
        closeIcon={
          <Button onClick={onClose} className={styles.closeButton}>
            <Image src={Close} width={20} height={20} alt="close-btn" />
          </Button>
        }
      />
    </CustomModal>
  );
};
