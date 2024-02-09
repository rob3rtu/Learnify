import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import LoginSVG from "../../assets/login.svg";
import { colors } from "../../theme";
import { apiClient } from "../../utils/apiClient";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const toast = useToast();

  const handleEmailLogin = async () => {
    if (email === "") {
      setError(true);
      toast({
        title: "Error!",
        description: "You must provide an email.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      try {
        await apiClient.post(`auth/login/${email}`);
        setCheckEmail(true);
      } catch (err: any) {
        console.log(err);
        toast({
          title: "Error!",
          description: err.response.data.error ?? "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  if (checkEmail) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg={colors.black}
        height="100vh"
      >
        <Text
          style={{
            fontFamily: "WorkSans-Bold",
            color: colors.white,
          }}
          color={colors.white}
        >
          Check your email for a confirmation link.
        </Text>
      </Flex>
    );
  }

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
            value={email}
            borderColor={error ? "red" : ""}
            onChange={(e) => {
              if (e.target.value !== "") {
                setError(false);
              }
              setEmail(e.target.value);
            }}
          />
          <IconButton
            isRound={true}
            variant="solid"
            bgColor={colors.white}
            aria-label="email login"
            fontSize="20px"
            icon={<ChevronRightIcon />}
            onClick={handleEmailLogin}
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
