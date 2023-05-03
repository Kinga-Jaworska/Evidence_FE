import { useState } from "react";

export interface useOpenFormProps {
  openModal: () => void;
}

export function useOpenForm<T>({ openModal }: useOpenFormProps) {
  const [taskEdit, setEditTask] = useState<null | T>(null);

  const handleOpenForm = (task: T) => {
    setEditTask(task);
    openModal();
  };

  return { taskEdit, handleOpenForm };
}
