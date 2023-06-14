import { ReactNode } from "react";
import Modal from "react-modal";
import styles from "./modal.module.scss";

export type ModalProps = {
  children: ReactNode;
  open: boolean;
  closeModal: () => void;
};

export const CustomModal = ({ open, children, closeModal }: ModalProps) => {
  Modal.setAppElement("#__next");
  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      className={styles.container}
    >
      <div className={styles.modalContent}>{children}</div>
    </Modal>
  );
};
