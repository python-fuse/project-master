import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import NewTaskForm from "./NewTaskForm";

const NewTaskModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="dark:bg-neutral-900">New Task</ModalHeader>
        <ModalCloseButton />

        <ModalBody className="dark:bg-neutral-900">
          <NewTaskForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewTaskModal;
