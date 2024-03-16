import {
  Flex,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Avatar,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { PostInterface } from "./types";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { colors } from "../../theme";
import moment from "moment";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface CommentsModalProps {
  post: PostInterface | null;
  isOpen: boolean;
  onClose: () => void;
  fakeReload?: () => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  post,
  isOpen,
  onClose,
  fakeReload,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const course = useSelector((state: RootState) => state.course.course);
  const [localPost, setLocalPost] = useState<PostInterface | null>(post);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (post) {
      setLocalPost(post);
    }
  }, [post]);

  const handleSubmitMessage = async () => {
    apiClient
      .post(`post/comment/${post?.id}`, { message })
      .then((res) => {
        setLocalPost(res.data);
        setMessage("");
        dispatch({
          type: "course/setCourse",
          payload: {
            ...course,
            posts: course?.posts.map((mapPost) => {
              if (mapPost.id === localPost?.id) {
                return res.data;
              }

              return mapPost;
            }),
          },
        });
        fakeReload?.();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error!",
          description: "Could not send message.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"3xl"}
      motionPreset="slideInTop"
    >
      <ModalOverlay
        bg="whiteAlpha.300"
        backdropFilter="auto"
        backdropBlur={"sm"}
      />
      <ModalContent bgColor={colors.black}>
        <ModalHeader fontSize={25} color={colors.white}>
          {localPost?.title}
        </ModalHeader>
        <ModalCloseButton color={colors.white} />
        <ModalBody>
          <Flex h={400} overflowY={"scroll"} direction={"column"} gap={5}>
            {localPost?.comments.length === 0 ? (
              <Flex alignItems={"center"} justify={"center"} flex={1}>
                <Text
                  fontFamily={"WorkSans-SemiBold"}
                  fontSize={20}
                  color={colors.white}
                >
                  There are no comments yet
                </Text>
              </Flex>
            ) : (
              localPost?.comments.map((comment) => {
                return (
                  <Flex
                    key={comment.id}
                    gap={2}
                    alignItems={"center"}
                    bgColor={colors.white}
                    borderRadius={10}
                    w={"fit-content"}
                    px={3}
                  >
                    <Avatar
                      src={comment.user?.profileImage ?? undefined}
                      fontFamily="WorkSans-Regular"
                      cursor="pointer"
                      name={
                        comment.user?.fullName ??
                        comment.user?.email.split("@")[0]
                      }
                      size="sm"
                    />
                    <Flex
                      direction={"column"}
                      gap={3}
                      alignItems={"flex-start"}
                      p={2}
                    >
                      <Flex
                        width={"100%"}
                        justify={"space-between"}
                        gap={10}
                        fontSize={12}
                      >
                        <Text fontFamily={"WorkSans-SemiBold"}>
                          {comment.user.fullName}
                        </Text>
                        <Text fontFamily={"WorkSans-SemiBold"}>
                          {moment(comment.createdAt)
                            .format("HH:mm DD.MM.YYYY")
                            .toLocaleString()}
                        </Text>
                      </Flex>
                      <Text fontFamily={"WorkSansRegular"} fontSize={17}>
                        {comment.message}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (message !== "") {
                handleSubmitMessage();
              }
            }}
            style={{ width: "100%" }}
          >
            <InputGroup>
              <Input
                width={"100%"}
                borderRadius={10}
                maxLength={250}
                placeholder="Say something"
                value={message}
                color={"white"}
                _placeholder={{
                  color: "white",
                  opacity: 0.4,
                }}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <InputRightAddon
                bgColor={"transparent"}
                cursor={"pointer"}
                onClick={() => {
                  if (message !== "") {
                    handleSubmitMessage();
                  }
                }}
              >
                <ChevronRightIcon color={"white"} />
              </InputRightAddon>
            </InputGroup>
          </form>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
