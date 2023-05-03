import { useQuery } from "@tanstack/react-query";
import AddSlotIcon from "assets/add-slot.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDownload } from "../../hooks/use-download";
import { useModal } from "../../hooks/use-modal";
import { useOpenForm } from "../../hooks/use-open-form";
import { GroupedTask, ReadTask } from "../../services";
import { AddSlot } from "../add-slot/add-slot";
import { Button } from "../button/button";
import { Edit } from "../edit/edit";
import { TaskItem } from "../task-item/task-item";
import { TaskTable } from "../task-table/task-table";
import styles from "./home-page-content.module.scss";

export const HomePageContent = () => {
  const router = useRouter();
  const { downloadFile } = useDownload();
  const { open, closeModal, openModal } = useModal();
  const { taskEdit, handleOpenForm } = useOpenForm<ReadTask>({ openModal });
  const {
    open: openSlotForm,
    closeModal: closeSlotFormModal,
    openModal: openSlotFormModal,
  } = useModal();
  const { taskEdit: addSlot, handleOpenForm: handleOpenSlotForm } =
    useOpenForm<ReadTask>({ openModal: openSlotFormModal });

  const { isLoading, error, data } = useQuery<
    void,
    unknown,
    GroupedTask,
    string[]
  >({
    queryKey: ["tasks"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/tasks").then(async (res) =>
        res.json()
      ),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("/add")}>Add Form</button>
      <Button onClick={downloadFile} className={styles.downloadSection}>
        {isLoading ? "Downloading..." : "Download CSV"}
      </Button>
      <div>
        {data &&
          Object.keys(data).map((key) => {
            return (
              <TaskTable key={key} header={key}>
                <Button
                  className={styles.button}
                  onClick={() => handleOpenSlotForm(data[key][0])}
                >
                  <Image
                    src={AddSlotIcon}
                    width={20}
                    height={20}
                    alt="add-slot-button"
                  />
                </Button>
                {data[key].map((task) => (
                  <TaskItem
                    key={task.slot_id}
                    task={task}
                    openEditForm={(task) => handleOpenForm(task)}
                  />
                ))}
              </TaskTable>
            );
          })}
      </div>
      {taskEdit && <Edit task={taskEdit} open={open} onClose={closeModal} />}
      {addSlot && (
        <AddSlot
          task={addSlot}
          open={openSlotForm}
          onClose={closeSlotFormModal}
        />
      )}
    </div>
  );
};
