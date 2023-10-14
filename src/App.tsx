import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
