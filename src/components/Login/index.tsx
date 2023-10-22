import {
  Text,
  Flex,
  Image,
  Box,
  Input,
  IconButton,
  Divider,
  AbsoluteCenter,
  useToast,
} from "@chakra-ui/react";
import { colors } from "../../theme";
import LoginSVG from "../../assets/login.svg";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Google } from "../../assets/customChakraIcons/Google";
import { Microsoft } from "../../assets/customChakraIcons/Microsoft";
import { sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import MSprovider, { auth } from "../../firebase-config";
import { useDispatch } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const toast = useToast();

  if (checkEmail) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg={colors.black}
        height="100vh"
      >
        <Text color={colors.white}>
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
            onClick={() => {
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
            }}
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
            onClick={() => {
              signInWithPopup(auth, MSprovider)
                .then((res) => {
                  dispatch({
                    type: "login/setAccount",
                    payload: {
                      email: res.user.email,
                      fullName: res.user.displayName,
                      uid: res.user.uid,
                    },
                  });
                  localStorage.setItem("uid", res.user.uid);
                })
                .catch((err) => {
                  console.log("Microsoft login error:");
                  console.log(err);
                });
            }}
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
