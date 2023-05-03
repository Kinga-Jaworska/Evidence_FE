import Delete from "assets/delete.svg";
import Edit from "assets/edit.svg";
import Image from "next/image";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../button/button";
import { ReadTask } from "../home-page-content/home-page-content";
import styles from "./task-item.module.scss";

export type TaskItemProps = {
  task: ReadTask;
  openEditForm: (task: ReadTask) => void;
};

export const TaskItem = ({ task, openEditForm }: TaskItemProps) => {
  const queryClient = useQueryClient();
  const ChangeDurationFormat = (duration: number) => {
    if (duration >= 60)
      return `${Math.floor(duration / 60)}h ${duration % 60} min`;
    else return `${duration % 60} min`;
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await fetch(`http://localhost:3000/api/v1/time_slots/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return (
    <div className={styles.container} key={task.id}>
      <p className={styles.title}>{task.start_time}</p>
      <div className={styles.section}>
        <p className={styles.duration}>{ChangeDurationFormat(task.duration)}</p>
        <Button className={styles.button} onClick={() => openEditForm(task)}>
          <Image src={Edit} width={20} height={20} alt="edit-button" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => deleteMutation.mutate(task.slot_id)}
        >
          <Image src={Delete} width={20} height={20} alt="edit-button" />
        </Button>
      </div>
    </div>
  );
};
