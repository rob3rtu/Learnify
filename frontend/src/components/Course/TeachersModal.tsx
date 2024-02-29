import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  useToast,
  Spinner,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiClient";

import { Select } from "chakra-react-select";
import { CourseTeacherInterface, GenericTeacherInterface } from "./types";
import { DeleteIcon } from "@chakra-ui/icons";
import { colors } from "../../theme";
import { useSelector } from "react-redux";
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
  const user = useSelector((state: RootState) => state.auth.account);
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [classTeachers, setClassTeachers] = useState<CourseTeacherInterface[]>(
    []
  );
  const [restOfTeachers, setRestOfTeachers] = useState<
    GenericTeacherInterface[]
  >([]);
  const [fakeReload, setFakeReload] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`course/teachers/${classId}`)
      .then((res) => {
        setClassTeachers(res.data.classTeachers);
        setRestOfTeachers(res.data.restOfTeachers);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fakeReload]);

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
          ) : classTeachers.length === 0 ? (
            <Text fontFamily={"WorkSans-Regular"}>
              There is no theacher assigned to this class
            </Text>
          ) : (
            <Flex
              direction={"column"}
              alignItems={"flex-start"}
              gap={5}
              maxH={300}
              overflowY={"scroll"}
            >
              {classTeachers.map((teacher) => {
                return (
                  <Flex
                    key={teacher.id}
                    width={"100%"}
                    alignItems={"center"}
                    justify={"space-between"}
                    px={5}
                  >
                    <Text key={teacher.id} fontFamily={"WorkSans-Medium"}>
                      {teacher.teacher.user.fullName} -{" "}
                      {teacher.teacher.user.email}
                    </Text>

                    {(user?.role === "admin" || user?.role === "teacher") &&
                      user.id !== teacher.teacher.user.id && (
                        <IconButton
                          variant="link"
                          fill={colors.grey}
                          aria-label="delete"
                          icon={<DeleteIcon />}
                          onClick={async () => {
                            await apiClient
                              .delete(`course/teachers/delete/${teacher.id}`)
                              .then((res) => {
                                setFakeReload(!fakeReload);
                                toast({
                                  title: "Success!",
                                  description: "Teacher deleted from class.",
                                  status: "success",
                                  duration: 5000,
                                  isClosable: true,
                                });
                              })
                              .catch((err) => {
                                console.log(err);
                                toast({
                                  title: "Error!",
                                  description:
                                    "Could not delete teacher from class.",
                                  status: "error",
                                  duration: 5000,
                                  isClosable: true,
                                });
                              });
                          }}
                        />
                      )}
                  </Flex>
                );
              })}
            </Flex>
          )}

          <Box height={10} />

          {!loading && (user?.role === "admin" || user?.role === "teacher") && (
            <Flex direction={"column"} alignItems={"flex-start"} gap={2}>
              <Text fontFamily={"WorkSans-SemiBold"} fontSize={20}>
                Add teachers
              </Text>

              <Select
                useBasicStyles
                placeholder="Select teacher"
                chakraStyles={{
                  container: (provided) => ({
                    ...provided,
                    width: "100%",
                  }),
                }}
                options={restOfTeachers.map((teacher) => {
                  return {
                    value: teacher.id,
                    label: teacher.user.fullName,
                  };
                })}
                onChange={async (val) => {
                  console.log(val);
                  await apiClient
                    .post("course/teachers/new", {
                      classId,
                      teacherId: val?.value,
                    })
                    .then(() => {
                      setFakeReload(!fakeReload);
                      toast({
                        title: "Success!",
                        description: "Teacher added to class.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      toast({
                        title: "Error!",
                        description: "Could not add teacher to class.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    });
                }}
              />
            </Flex>
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
