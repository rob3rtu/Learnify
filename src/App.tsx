import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store";
import { Home } from "./components/Home";
import { ConfirmEmail } from "./components/Login/ConfirmEmail";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.account);

  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      dispatch({ type: "login/setAccount", payload: null });
    } else {
      dispatch({ type: "login/setAccount", payload: { lala: "test" } });
    }
  }, []);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
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
