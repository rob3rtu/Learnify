import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import { FiltersInterface, semesterObject, yearsObject } from "./types";
import { useState } from "react";

interface CreateCourseModalProps {
  filters: FiltersInterface;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  filters,
  isOpen,
  onClose,
}) => {
  const [courseName, setCourseName] = useState<string>("");
  const [shortName, setShortName] = useState<string>("");

  const handleOnClose = () => {
    setCourseName("");
    setShortName("");
    onClose();
  };

  const generateAbbreviation = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .filter((letter) => letter && letter === letter.toUpperCase())
      .join("");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} isCentered size={"lg"}>
      <ModalOverlay backdropFilter={"auto"} backdropBlur={"5px"} />
      <ModalContent>
        <ModalHeader>Add Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody fontFamily="WorkSans-Regular">
          <Text>{`The new course will be added to ${filters.domain.toUpperCase()}, ${
            yearsObject[filters.year]
          } - ${semesterObject[filters.semester]}`}</Text>
          <Box h={5} />
          <Input
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
              setShortName(generateAbbreviation(e.target.value));
            }}
            placeholder="Course name"
          />
          <Box h={5} />
          <Text>Abbreviation: {shortName}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleOnClose}
            isDisabled={courseName === ""}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
