import { useQuery } from "@tanstack/react-query";
import FileSaver from "file-saver";
import { useRouter } from "next/router";
import toast from "react-simple-toasts";
import { Button } from "../button/button";
import { Task } from "../forms";
import { TaskItem } from "../task-item/task-item";
import { TaskTable } from "../task-table/task-table";
import styles from "./home-page-content.module.scss";

interface ReadTask extends Task {
  id: number;
}

type GroupedTask = {
  [key: string]: ReadTask[];
};

export const HomePageContent = () => {
  const router = useRouter();
  const currentUser = 2; // TODO: after add auth flow

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

  const downloadFile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${currentUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      const blob = await response.blob();
      FileSaver.saveAs(blob, `${currentUser}-evidence`);
    } catch (error) {
      toast("Error", { position: "center" });
      console.error("Error:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className={styles.container}>
      {/* TODO: Make Navigation Bar */}
      {/* Separate pages */}
      <button onClick={() => router.push("/add")}>Add Form</button>
      <Button onClick={downloadFile} className={styles.downloadSection}>
        {isLoading ? "Downloading..." : "Download CSV"}
      </Button>
      <div className="">
        {data &&
          Object.keys(data).map((key) => {
            return (
              <TaskTable key={key} header={key}>
                {data[key].map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TaskTable>
            );
          })}
      </div>
    </div>
  );
};
