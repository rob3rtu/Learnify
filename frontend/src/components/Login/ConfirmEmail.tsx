import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { getUserData } from "./api";
import { AnyAction } from "redux";

export const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const nav = useNavigate();
  const user = useSelector((state: RootState) => state.auth.account);
  const searchParams = new URLSearchParams(document.location.search);

  useEffect(() => {
    const token = searchParams.get("token");
    localStorage.setItem("learnifyToken", token ?? "");
    dispatch(getUserData(token ?? "") as unknown as AnyAction);

    nav("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     nav("/");
  //     console.log("YES YES YES");
  //   } else {
  //     localStorage.removeItem("learnifyToken");
  //     toast({
  //       title: "Error!",
  //       description: "Invalid credentials.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     console.log("NO NO NO NO ");

  //     nav("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

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
