import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { VERIFY_TOKEN } from "../../graphql/queries";

export const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const nav = useNavigate();
  const searchParams = new URLSearchParams(document.location.search);
  const token = searchParams.get("token");

  const { data, error } = useQuery(VERIFY_TOKEN, {
    variables: { token },
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      dispatch({
        type: "login/setAccount",
        payload: { ...data.verifyToken },
      });
      localStorage.setItem("learnifyToken", token ?? "");
      nav("/");
    } else if (error) {
      toast({
        title: "Error!",
        description: "Invalid credentials.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      nav("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
