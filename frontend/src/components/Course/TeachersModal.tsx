import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Box,
  Divider,
  AbsoluteCenter,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase-config";
import { RootState } from "../../Store";

interface TeachersModalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  classId: string;
}

interface NewPostFieldsInterface {
  title: string;
  description: string;
  link: string;
  file: File | null | undefined;
}

export const TeachersModal: React.FC<TeachersModalProps> = ({
  isOpen,
  setIsOpen,
  classId,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state: RootState) => state.auth.account);
  const [loading, setLoading] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`course/teachers/${classId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error!",
          description: "Could not get teachers.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        // setIsOpen(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddTeacher = () => {};

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      size={"xl"}
      motionPreset="slideInTop"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={25}>Teachers</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Spinner />
          ) : teachers.length === 0 ? (
            <Text fontFamily={"WorkSans-Regular"}>
              There is no theacher assigned to this class
            </Text>
          ) : (
            <></>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAddTeacher}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
