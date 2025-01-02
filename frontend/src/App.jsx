import React from "react";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext.jsx";

const App = () => {
  const context = useAuthContext();
  console.log("Full context in App:", context); // Add this
  const { authUser } = context;
  console.log("authUser value in App:", authUser);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/"} /> : <Register />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
      </Routes>
    </div>
  );
};

export default App;
