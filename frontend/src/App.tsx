import { Flex, Spinner } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ConfirmEmail } from "./components/Login/ConfirmEmail";
import { NotFound } from "./components/NotFound";
import { colors } from "./theme";
import { Profile } from "./components/Profile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store";
import { Course } from "./components/Course";
import { getUserData } from "./components/Login/api";
import { AnyAction } from "redux";
import { Users } from "./components/Users";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const user = useSelector((state: RootState) => state.auth.account);

  useEffect(() => {
    const token = localStorage.getItem("learnifyToken");
    if (token !== null) {
      dispatch(getUserData(token ?? "") as unknown as AnyAction);
    } else {
      dispatch({ type: "login/setAccount", payload: null });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Route path="/course/:id" element={<Course />} />
          {user.role === "admin" && <Route path="/users" element={<Users />} />}
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
