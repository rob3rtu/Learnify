import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";
import { apiClient } from "../Utils/apiClient";

export const ConfirmEmail = () => {
  const toast = useToast();
  const searchParams = new URLSearchParams(document.location.search);
  const nav = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    apiClient
      .post("", {
        query: `
          query {
            verifyToken(token: "${token}") {
              id
            }
          }
        `,
      })
      .then((res) => {
        localStorage.setItem("learnifyToken", token ?? "");
        nav("/");
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: "Invalid credentials.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        nav("/");
      });
  }, []);

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
};
