import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import NewProjectForm from "./NewProjectForm";

const NewProjectModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="dark:bg-neutral-900">New Project</ModalHeader>
        <ModalCloseButton />

        <ModalBody className="dark:bg-neutral-900">
          <NewProjectForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewProjectModal;
