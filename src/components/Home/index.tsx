import { Button, Text } from "@chakra-ui/react";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { RootState } from "../../Store";

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
    <>
      <Text size="xl">Hello there, {account?.fullName ?? "who?"}</Text>
      <Button onClick={handleLogOut}>Log out</Button>
    </>
  );
};
