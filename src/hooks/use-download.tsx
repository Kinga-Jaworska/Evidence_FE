import FileSaver from "file-saver";
import toast from "react-simple-toasts";

export const useDownload = () => {
  const currentUser = 2; // TODO: after add auth flow
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
  return { downloadFile };
};
