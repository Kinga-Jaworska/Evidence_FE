import FileSaver from "file-saver";
import toast from "react-simple-toasts";
import useAuth from "./use-auth";

export const useDownload = () => {
  const currentUser = 1; // TODO: after add auth flow
  const { headers } = useAuth();
  const downloadFile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${currentUser}`,
        {
          method: "GET",
          headers: {
            ...headers,
            "Content-Type": "text/csv",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      const blob = await response.blob();
      FileSaver.saveAs(blob, `${currentUser}-evidence.csv`);
    } catch (error) {
      toast("Error", { position: "center" });
      console.error("Error:", error);
    }
  };
  return { downloadFile };
};
