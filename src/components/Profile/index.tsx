import { Button, Flex, Text } from "@chakra-ui/react";
import { colors } from "../../theme";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";

export const Profile = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.auth.account);

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
    >
      <Text size="xl" color={colors.white}>
        Hello there, {account?.fullName ?? "who?"}
      </Text>
      <Button onClick={handleLogOut}>Log out</Button>
    </Flex>
  );
};
