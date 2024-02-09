import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnyAction } from "redux";
import { colors } from "../../theme";
import { getUserData } from "./api";

export const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const searchParams = new URLSearchParams(document.location.search);

  useEffect(() => {
    const token = searchParams.get("token");
    localStorage.setItem("learnifyToken", token ?? "");
    dispatch(getUserData(token ?? "") as unknown as AnyAction);

    nav("/");

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
