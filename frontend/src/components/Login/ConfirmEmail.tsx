import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";
import { apiClient } from "../Utils/apiClient";
import { useDispatch } from "react-redux";

export const ConfirmEmail = () => {
  const dispatch = useDispatch();
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
              id,
              fullName,
              email,
              role
            }
          }
        `,
      })
      .then((res) => {
        dispatch({
          type: "login/setAccount",
          payload: { ...res.data.data.verifyToken },
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
