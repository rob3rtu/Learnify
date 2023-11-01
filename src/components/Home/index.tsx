import { Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { RootState } from "../../Store";

export const Home = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.auth.account);

  useEffect(() => {
    const user = auth.currentUser;

    console.log("User: ", user);
    dispatch({
      type: "login/setAccount",
      payload: {
        email: user?.providerData[0].email,
        fullName: user?.providerData[0].displayName,
        uid: user?.uid,
      },
    });
  }, []);

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
