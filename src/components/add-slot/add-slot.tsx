import { useMutation, useQueryClient } from "@tanstack/react-query";
import Close from "assets/close-circle.svg";
import Image from "next/image";
import { Button } from "../button/button";
import { AddTimeSlot, AddTimeTask } from "../forms/add-time-slot";
import { Task } from "../forms/task-form";
import { ReadTask } from "../home-page-content/home-page-content";
import { CustomModal } from "../modal/modal";
import styles from "./add-slot.module.scss";

export type AddSlotProps = {
  task: ReadTask;
  open: boolean;
  onClose: () => void;
};

export interface TimeSlot extends AddTimeTask {
  task: Task;
}

export const AddSlot = ({ task, open, onClose }: AddSlotProps) => {
  const queryClient = useQueryClient();
  const addTimeSlotMutation = useMutation({
    mutationFn: async (data: TimeSlot) => {
      console.log(data);
      return await fetch(`http://localhost:3000/api/v1/time_slots`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, task_id: 2 }),
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

  const handleEdit = (slot: AddTimeTask) => {
    addTimeSlotMutation.mutate({ ...slot, task });
  };

  return (
    <CustomModal open={open} closeModal={onClose}>
      <AddTimeSlot
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
