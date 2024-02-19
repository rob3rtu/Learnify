import { Flex, Input, Spinner, Text, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { useEffect } from "react";
import { colors } from "../../../theme";
import { AnyAction } from "redux";
import { getForum } from "../api";
import NotFoundSVG from "../../../assets/not-found.svg";

interface ForumProps {
  courseId: string;
}

export const Forum: React.FC<ForumProps> = ({ courseId }) => {
  const dispatch = useDispatch();
  const forum = useSelector((state: RootState) => state.forum.forum);
  const loading = useSelector((state: RootState) => state.forum.loading);

  useEffect(() => {
    dispatch(getForum(courseId) as unknown as AnyAction);
    console.log("forum page");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      maxH={"83vh"}
      width={"100%"}
      flex={1}
      overflowY={"scroll"}
      p={10}
      gap={10}
    >
      <Input
        position={"absolute"}
        bottom={5}
        alignSelf={"center"}
        placeholder="Ask any question..."
      />
    </Flex>
  );
};
