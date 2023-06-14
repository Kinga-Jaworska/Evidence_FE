import Close from "assets/close-circle.svg";
import Image from "next/image";
import { useEditTask } from "../../hooks/queries/use-edit-task";
import { ReadTask, Task } from "../../services";
import { changeDurationFormatToString } from "../../utils/task-utils";
import { Button } from "../button/button";
import { TaskForm } from "../forms/task-form";
import { CustomModal } from "../modal/modal";
import styles from "./edit.module.scss";

export type EditProps = {
  task: ReadTask;
  open: boolean;
  onClose: () => void;
};

export const Edit = ({ task, open, onClose }: EditProps) => {
  const { editMutation } = useEditTask({ onClose, task });

  const handleEdit = (task: Task) => {
    editMutation.mutate(task);
  };

  return (
    <CustomModal open={open} closeModal={onClose}>
      <TaskForm
        handleSubmit={handleEdit}
        initialValues={{
          ...task,
          duration: changeDurationFormatToString(task.duration),
        }}
        closeIcon={
          <Button onClick={onClose} className={styles.closeButton}>
            <Image src={Close} width={20} height={20} alt="close-btn" />
          </Button>
        }
      />
    </CustomModal>
  );
};
