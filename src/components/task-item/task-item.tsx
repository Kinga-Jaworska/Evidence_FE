import { Task } from "../forms";
import styles from "./task-item.module.scss";

export type TaskItemProps = {
  task: Task;
};

function ChangeDurationFormat(duration: number) {
  if (duration >= 60)
    return `${Math.floor(duration / 60)}h ${duration % 60} min`;
  else return `${duration % 60} min`;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{task.title}</p>
      <p className={styles.duration}>{ChangeDurationFormat(task.duration)}</p>
    </div>
  );
};
