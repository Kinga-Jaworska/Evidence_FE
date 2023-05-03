import { useMutation, useQueryClient } from "@tanstack/react-query";
import Close from "assets/close-circle.svg";
import Image from "next/image";
import { AddTimeSlot, ReadTask, TimeSlot } from "../../services";
import { Button } from "../button/button";
import { AddTimeSlotForm } from "../forms/add-time-slot";
import { CustomModal } from "../modal/modal";
import styles from "./add-slot.module.scss";

export type AddSlotProps = {
  task: ReadTask;
  open: boolean;
  onClose: () => void;
};

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
        body: JSON.stringify({ ...data, task_id: task.id }),
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

  const handleEdit = (slot: AddTimeSlot) => {
    addTimeSlotMutation.mutate({ ...slot, task });
  };

  return (
    <CustomModal open={open} closeModal={onClose}>
      <AddTimeSlotForm
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
