import Delete from "assets/delete.svg";
import Edit from "assets/edit.svg";
import Image from "next/image";

import moment from "moment";
import { useDeleteTask } from "../../hooks/queries/use-delete-task";
import { ReadTask } from "../../services";
import { changeDurationFormatToString } from "../../utils/task-utils";
import { Button } from "../button/button";
import styles from "./task-item.module.scss";

export type TaskItemProps = {
  task: ReadTask;
  openEditForm: (task: ReadTask) => void;
};

export const TaskItem = ({ task, openEditForm }: TaskItemProps) => {
  const { deleteMutation } = useDeleteTask();

  return (
    <div className={styles.container} key={task.id}>
      <div className={styles.times}>
        <p className={styles.date}>
          {moment(task.start_time).format("DD-MM-YYYY")}
        </p>
        <p className={styles.title}>
          {moment(task.start_time).format("hh:mm a")}
        </p>
      </div>

      <div className={styles.section}>
        <p className={styles.duration}>
          {changeDurationFormatToString(task.duration)}
        </p>
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
