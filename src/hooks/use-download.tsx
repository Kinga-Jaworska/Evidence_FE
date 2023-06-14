import FileSaver from "file-saver";
import toast from "react-simple-toasts";
import { useHeaders } from "./use-header";
import { useStore } from "./use-store";

export const useDownload = () => {
  const { authData } = useStore();
  const { headers } = useHeaders();

  const downloadFile = async () => {
    try {
      const response = await fetch(
        `${process.env.BE_URL}/users/${authData?.id}`,
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
      FileSaver.saveAs(blob, `${authData.email}-evidence.csv`);
    } catch (error) {
      toast("Error", { position: "center" });
      console.error("Error:", error);
    }
  };

  const downloadOverallFile = async () => {
    try {
      await fetch(`${process.env.BE_URL}/files`, {
        method: "GET",
        headers,
      });

      toast("Successfully saved report on company google drive", {
        position: "center",
      });
    } catch (error) {
      toast("Error", { position: "center" });
      console.error("Error:", error);
    }
  };

  return { downloadFile, downloadOverallFile };
};
