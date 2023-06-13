import { useRouter } from "next/router";
import { useDownload } from "../../hooks/use-download";
import { useModal } from "../../hooks/use-modal";
import { useOpenForm } from "../../hooks/use-open-form";
import { ReadTask } from "../../services";
import { AddSlot } from "../add-slot/add-slot";
import { Button } from "../button/button";
import { Edit } from "../edit/edit";

import { useTasks } from "../../hooks/queries/use-tasks";
import { TaskContainer } from "../task-container/task-container";
import styles from "./home-page-content.module.scss";

export const StartPageContent = () => {
  const router = useRouter();
  const { downloadFile, downloadOverallFile } = useDownload();

  const { open, closeModal, openModal } = useModal();
  const { taskEdit, handleOpenForm } = useOpenForm<ReadTask>({ openModal });
  const {
    open: openSlotForm,
    closeModal: closeSlotFormModal,
    openModal: openSlotFormModal,
  } = useModal();
  const { taskEdit: addSlot, handleOpenForm: handleOpenSlotForm } =
    useOpenForm<ReadTask>({ openModal: openSlotFormModal });
  const { isLoading, data, error } = useTasks();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("/add")}>Add Form</button>
      <Button onClick={downloadFile} className={styles.downloadSection}>
        {isLoading ? "Downloading..." : "Download CSV"}
      </Button>
      <Button onClick={downloadOverallFile} className={styles.downloadSection}>
        {isLoading ? "Downloading..." : "Test download Overall"}
      </Button>

      {data && (
        <TaskContainer
          data={data}
          handleOpenForm={handleOpenForm}
          handleOpenSlotForm={handleOpenSlotForm}
        />
      )}
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
