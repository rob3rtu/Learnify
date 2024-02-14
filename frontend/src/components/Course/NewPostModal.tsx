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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase-config";
import { RootState } from "../../Store";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
  userId: string;
}

interface NewPostFieldsInterface {
  title: string;
  description: string;
  link: string;
  file: File | null | undefined;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  classId,
  userId,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state: RootState) => state.auth.account);
  const [loading, setLoading] = useState<boolean>(false);
  const [newPostDisable, setNewPostDisable] = useState<boolean>(true);
  const [newPostFields, setNewPostFields] = useState<NewPostFieldsInterface>({
    title: "",
    description: "",
    link: "",
    file: null,
  });

  useEffect(() => {
    setNewPostDisable(
      newPostFields.title === "" ||
        (newPostFields.link === "" &&
          (newPostFields.file === null || newPostFields.file === undefined))
    );
  }, [newPostFields]);

  const onCloseCustom = () => {
    setNewPostFields({ title: "", description: "", link: "", file: null });
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    let documentRef;
    let documentUrl;

    if (newPostFields.file) {
      documentRef = ref(storage, `${user?.email}/${newPostFields.file.name}`);

      await uploadBytes(documentRef, newPostFields.file);
      documentUrl = await getDownloadURL(documentRef);
    }

    await apiClient
      .post("post/new", {
        classId,
        userId,
        classSection: "materials",
        title: newPostFields.title,
        description: newPostFields.description,
        resourceType: newPostFields.link === "" ? "document" : "link",
        resourceUrl:
          newPostFields.link === "" ? documentUrl : newPostFields.link,
      })
      .then((res) => {
        dispatch({ type: "course/setCourse", payload: res.data });
        toast({
          title: "Success!",
          description: "Nice work!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error!",
          description: "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
        onCloseCustom();
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseCustom}
      size={"xl"}
      motionPreset="slideInTop"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={25}>New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={3} alignItems={"baseline"}>
            <Text fontFamily={"WorkSans-SemiBold"} fontSize={20}>
              Title:{" "}
            </Text>
            <Input
              variant={"flushed"}
              placeholder="Enter title"
              value={newPostFields.title}
              onChange={(e) => {
                setNewPostFields({
                  ...newPostFields,
                  title: e.target.value,
                });
              }}
            />
          </Flex>

          <Box height={5} />

          <Textarea
            placeholder="Short description(optional)"
            minH={100}
            maxH={300}
            value={newPostFields.description}
            onChange={(e) => {
              setNewPostFields({
                ...newPostFields,
                description: e.target.value,
              });
            }}
          />

          <Box height={10} />

          <Flex direction={"column"} gap={5} alignItems={"center"}>
            <Input
              isDisabled={
                newPostFields.file !== undefined && newPostFields.file !== null
              }
              placeholder="Copy link here"
              value={newPostFields.link}
              onChange={(e) => {
                setNewPostFields({
                  ...newPostFields,
                  link: e.target.value,
                });
              }}
            />
            <Box position="relative" width={250}>
              <Divider />
              <AbsoluteCenter backgroundColor={"white"} px={6}>
                or
              </AbsoluteCenter>
            </Box>
            <Input
              isDisabled={newPostFields.link !== ""}
              type="file"
              accept=".doc, .docx, .pdf, .ppt, .pptx, .txt"
              onChange={(e) => {
                setNewPostFields({
                  ...newPostFields,
                  file: e.target.files?.item(0),
                });
              }}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={newPostDisable}
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
