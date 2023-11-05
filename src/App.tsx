import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ConfirmEmail } from "./components/Login/ConfirmEmail";
import { NotFound } from "./components/NotFound";
import { useAuth } from "./components/Utils/useAuth";
import { colors } from "./theme";
import { Profile } from "./components/Profile";

function App() {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user)
      dispatch({
        type: "login/setAccount",
        payload: {
          email: user.providerData[0].email,
          fullName: user.providerData[0].displayName,
          uid: user.uid,
        },
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading)
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

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
