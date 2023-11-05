import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { colors } from "../../theme";
import { NavBar } from "./NavBar";

export const Home = () => {
  const account = useSelector((state: RootState) => state.auth.account);

  console.log("ACCOUNT INFO", account);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      minH="100vh"
    >
      <NavBar user={account} />
    </Flex>
  );
};
