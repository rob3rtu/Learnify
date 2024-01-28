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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { ADD_COURSE } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

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
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.home.courses);
  const [courseName, setCourseName] = useState<string>("");
  const [shortName, setShortName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [addCourse] = useMutation(ADD_COURSE);

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

  const handleAddCourse = async () => {
    setLoading(true);

    try {
      const res = await addCourse({
        variables: { shortName, longName: courseName, ...filters },
      });

      dispatch({
        type: "home/setCourses",
        payload: [...courses, res.data.addCourse],
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    handleOnClose();
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
            onClick={handleAddCourse}
            isDisabled={courseName === ""}
            isLoading={loading}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
