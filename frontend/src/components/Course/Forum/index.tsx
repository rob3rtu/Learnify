import {
  Flex,
  Input,
  Spinner,
  Text,
  Image,
  useToast,
  Avatar,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { useEffect, useState } from "react";
import { colors } from "../../../theme";
import { AnyAction } from "redux";
import { getForum } from "../api";
import NotFoundSVG from "../../../assets/not-found.svg";
import { apiClient } from "../../../utils/apiClient";
import moment from "moment";
import { socket } from "./socket";

interface ForumProps {
  courseId: string;
}

export const Forum: React.FC<ForumProps> = ({ courseId }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const forum = useSelector((state: RootState) => state.forum.forum);
  const user = useSelector((state: RootState) => state.auth.account);
  const loading = useSelector((state: RootState) => state.forum.loading);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.on("connection", () => {});
  }, []);

  socket.on("message-response", (newForum: any) => {
    dispatch({ type: "forum/setForum", payload: newForum });
  });

  useEffect(() => {
    dispatch(getForum(courseId) as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlSubmitMessage = async () => {
    // await apiClient
    //   .post("forum/new", {
    //     forumId: forum?.id,
    //     userId: user?.id,
    //     message: message,
    //   })
    //   .then((res) => {
    socket.emit("send-message", {
      forumId: forum?.id,
      userId: user?.id,
      message: message,
    });

    setMessage("");
    // })
    // .catch((err) => {
    //   console.log(err);
    //   toast({
    //     title: "Error!",
    //     description: "Could not send message.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // });
  };

  if (loading)
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg={colors.black}
        height="100vh"
      >
        <Spinner size="xl" color={colors.white} />
      </Flex>
    );

  if (forum === null)
    return (
      <Flex
        flex={1}
        width="100vw"
        align="center"
        justify="center"
        direction="column"
      >
        <Image src={NotFoundSVG} width={400} maxW={"80vw"} />
        <Text
          marginTop={5}
          fontFamily="WorkSans-SemiBold"
          fontSize={25}
          color={colors.white}
        >
          Forum not found...
        </Text>
      </Flex>
    );

  return (
    <Flex
      direction={"column-reverse"}
      maxH={"74vh"}
      width={"100%"}
      flex={1}
      overflowY={"scroll"}
      p={10}
      gap={10}
    >
      {forum.messages.length === 0 ? (
        <Text
          position={"absolute"}
          fontFamily={"WorkSans-Regular"}
          fontSize={20}
          color={colors.white}
          alignSelf={"center"}
          mb={10}
        >
          There are no messages.
        </Text>
      ) : (
        <>
          {forum.messages.map((message) => {
            return (
              <Flex
                key={message.id}
                width={"100%"}
                alignItems={"center"}
                justifyContent={
                  user?.id === message.user.id ? "flex-end" : "flex-start"
                }
              >
                <Flex
                  key={message.id}
                  gap={2}
                  alignItems={"center"}
                  bgColor={
                    user?.id === message.user.id ? colors.blue : colors.white
                  }
                  borderRadius={10}
                  w={"fit-content"}
                  px={3}
                >
                  <Avatar
                    src={message.user?.profileImage ?? undefined}
                    fontFamily="WorkSans-Regular"
                    cursor="pointer"
                    name={
                      message.user?.fullName ??
                      message.user?.email.split("@")[0]
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
                        {message.user.fullName}
                      </Text>
                      <Text fontFamily={"WorkSans-SemiBold"}>
                        {moment(message.createdAt)
                          .format("HH:mm DD.MM.YYYY")
                          .toLocaleString()}
                      </Text>
                    </Flex>
                    <Text fontFamily={"WorkSans-Medium"} fontSize={16}>
                      {message.message}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message !== "") {
            handlSubmitMessage();
          }
        }}
        style={{
          width: "90%",
          position: "absolute",
          bottom: 5,
          alignSelf: "center",
        }}
      >
        <Input
          width={"100%"}
          maxLength={250}
          placeholder="Ask any question..."
          color={colors.white}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </form>
    </Flex>
  );
};
