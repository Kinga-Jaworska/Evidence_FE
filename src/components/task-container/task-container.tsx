import AddSlotIcon from "assets/add-slot.svg";
import Image from "next/image";
import { GroupedTask, ReadTask } from "../../services";
import { Button } from "../button/button";
import { TaskItem } from "../task-item/task-item";
import { TaskTable } from "../task-table/task-table";

type TaskContainerProps = {
  data: GroupedTask;
  handleOpenForm: (task: ReadTask) => void;
  handleOpenSlotForm: (task: ReadTask) => void;
};

// TODO: SIMPLIFY IT
export const TaskContainer = ({
  data,
  handleOpenForm,
  handleOpenSlotForm,
}: TaskContainerProps) => {
  return (
    <>
      {Object.keys(data).length ? (
        Object.keys(data).map((key) => {
          return (
            <TaskTable key={key} header={key}>
              <Button onClick={() => handleOpenSlotForm(data[key][0])}>
                <Image
                  src={AddSlotIcon}
                  width={20}
                  height={20}
                  alt="add-slot-button"
                />
              </Button>
              {/* {data[key][0]?.description && (
                <p className={styles.description}>
                  Description: {data[key][0].description}
                </p>
              )} */}
              {data[key].map((task) => (
                <TaskItem
                  key={task.slot_id}
                  task={task}
                  openEditForm={(task) => handleOpenForm(task)}
                />
              ))}
            </TaskTable>
          );
        })
      ) : (
        <p>No tasks</p>
      )}
    </>
  );
};
