import { FC, ReactNode } from "react";
import styles from "./task-table.module.scss";

export type TaskTableProps = {
  children: ReactNode;
  header?: string;
};

export const TaskTable: FC<TaskTableProps> = ({
  children,
  header,
}: TaskTableProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
