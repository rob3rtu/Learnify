import { Button, Text, Flex } from "@chakra-ui/react";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { RootState } from "../../Store";
import { NavBar } from "./NavBar";
import { colors } from "../../theme";

export const Home = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.auth.account);

  console.log("ACCOUNT INFO", account);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("uid");
        dispatch({ type: "login/setAccount", payload: null });
        console.log("Successfully log out!");
      })
      .catch((err) => {
        console.log("Log out error: ", err);
      });
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      minH="100vh"
      position="relative"
    >
      <NavBar user={account} />
      <Text size="xl" color={colors.white}>
        Hello there, {account?.fullName ?? "who?"}
      </Text>
      <Button onClick={handleLogOut}>Log out</Button>
    </Flex>
  );
};
