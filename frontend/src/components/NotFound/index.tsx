import { Center, Text } from "@chakra-ui/react";
import { colors } from "../../theme";

export const NotFound = () => {
  return (
    <Center height="100vh">
      <Text
        style={{
          fontFamily: "WorkSans-BoldItalic",
          fontSize: 50,
          color: colors.black,
        }}
      >
        404 Page Not Found
      </Text>
    </Center>
  );
};
