import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import EditTaskForm from "./EditTaskForm";

const EditTaskModal = ({ isOpen, onClose, task }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="dark:bg-neutral-900">Edit Task</ModalHeader>
        <ModalCloseButton />

        <ModalBody className="dark:bg-neutral-900">
          <EditTaskForm onClose={onClose} task={task} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
