import {
  Text,
  Flex,
  Image,
  Box,
  Input,
  IconButton,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { colors } from "../../theme";
import LoginSVG from "../../assets/login.svg";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Google } from "../../assets/customChakraIcons/Google";
import { Microsoft } from "../../assets/customChakraIcons/Microsoft";

export const Login = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      bg={colors.black}
      height="100vh"
    >
      <Flex direction="column" alignItems="center" paddingTop={10}>
        <Text
          fontSize={["25px", "50px", "100px"]}
          letterSpacing={["10px", "15px"]}
          style={{
            fontFamily: "WorkSans-BoldItalic",
            color: colors.white,
            lineHeight: 1,
          }}
        >
          LEARNIFY
        </Text>
        <Text
          fontSize={["10px", "15px", "25px"]}
          style={{
            fontFamily: "WorkSans-BoldItalic",
            color: colors.grey,
          }}
        >
          let's get better, together
        </Text>
      </Flex>

      <Flex direction="column" alignItems="center" marginTop={"10vh"}>
        <Flex direction="row" marginBottom={20}>
          <Input
            variant="flushed"
            placeholder="Email"
            marginRight={10}
            color={colors.white}
          />
          <IconButton
            isRound={true}
            variant="solid"
            bgColor={colors.white}
            aria-label="email login"
            fontSize="20px"
            icon={<ChevronRightIcon />}
          />
        </Flex>

        <Box position="relative" width={250}>
          <Divider />
          <AbsoluteCenter
            color={colors.white}
            backgroundColor={colors.black}
            px={6}
          >
            or
          </AbsoluteCenter>
        </Box>

        <Flex
          direction="row"
          marginTop={10}
          width={32}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            isRound
            variant="outline"
            aria-label="google login"
            fontSize="20px"
            icon={<Google />}
          />
          <IconButton
            isRound
            variant="outline"
            aria-label="microsoft login"
            fontSize="20px"
            icon={<Microsoft />}
          />
        </Flex>
      </Flex>

      <Box
        height={0.5}
        width={"100%"}
        backgroundColor="white"
        position="absolute"
        bottom={0}
      />
      <Image
        src={LoginSVG}
        width={["80vw", "60vw", "50vw"]}
        position="absolute"
        bottom={0}
      />
    </Flex>
  );
};
