import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { PostInterface } from "./types";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { colors } from "../../theme";
import moment from "moment";

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
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={25}>{localPost?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex h={400} overflowY={"scroll"} direction={"column"} gap={5}>
            {localPost?.comments.length === 0 ? (
              <Flex alignItems={"center"} justify={"center"} flex={1}>
                <Text fontFamily={"WorkSans-SemiBold"} fontSize={20}>
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
                    bgColor={colors.grey}
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
                      bg={colors.blue}
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
                            .format("hh:mm DD.MMM.YYYY")
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
            <Input
              width={"100%"}
              placeholder="Say something"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
