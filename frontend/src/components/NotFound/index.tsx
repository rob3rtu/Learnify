import { Flex, Image, Text } from "@chakra-ui/react";
import { colors } from "../../theme";
import NotFoundSVG from "../../assets/not-found.svg";

export const NotFound = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      height="100vh"
    >
      <Image src={NotFoundSVG} width={400} maxW={"80vw"} />
      <Text
        style={{
          fontFamily: "WorkSans-BoldItalic",
          fontSize: 25,
          color: colors.white,
        }}
      >
        Page Not Found
      </Text>
    </Flex>
  );
};
