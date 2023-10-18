import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyB6mTEwhaWLK0od7nz3Q8HkmfJFld7O8UU",
  authDomain: "licenta-fmi.firebaseapp.com",
  projectId: "licenta-fmi",
  storageBucket: "licenta-fmi.appspot.com",
  messagingSenderId: "1041916442718",
  appId: "1:1041916442718:web:b205ced93335b8b6cb9ccf",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

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
