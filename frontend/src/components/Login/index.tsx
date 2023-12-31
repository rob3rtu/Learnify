import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Microsoft } from "../../assets/customChakraIcons/Microsoft";
import LoginSVG from "../../assets/login.svg";
import MSprovider, { auth } from "../../firebase-config";
import { colors } from "../../theme";
import { useLoginApi } from "./useLoginApi";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const toast = useToast();
  const { setUserAccount } = useLoginApi();

  // const handleMicrosoftLogin = () => {
  //   signInWithPopup(auth, MSprovider)
  //     .then(async (res) => {
  //       setUserAccount({
  //         email: res.user.email ?? "",
  //         displayName: res.user.displayName ?? "",
  //         uid: res.user.uid,
  //       });
  //       localStorage.setItem("uid", res.user.uid);
  //     })
  //     .catch((err) => {
  //       console.log("Microsoft login error:");
  //       console.log(err);
  //     });
  // };

  const handleEmailLogin = () => {
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
      sendSignInLinkToEmail(auth, email, {
        url: "http://localhost:3000/confirm-email",
        handleCodeInApp: true,
      })
        .then(() => {
          localStorage.setItem("userEmail", email);
          setCheckEmail(true);
        })
        .catch((err) => {
          console.log(err);
        });
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

        {/* <Box position="relative" width={250}>
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
          justifyContent="center"
        >
          <IconButton
            isRound
            variant="outline"
            aria-label="microsoft login"
            fontSize="20px"
            icon={<Microsoft />}
            onClick={handleMicrosoftLogin}
          />
        </Flex> */}
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
