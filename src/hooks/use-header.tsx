import { useStore } from "./use-store";

export const useHeaders = () => {
  const { accessToken, authData } = useStore();
  const currentUserID = authData?.id;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return { headers, currentUserID };
};
