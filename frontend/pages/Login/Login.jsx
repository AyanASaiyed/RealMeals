import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogging from "../../src/hooks/useLogging";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogging();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <h1 className="text-5xl font-extralight text-white">
        Real<span className="text-green-500">Meals</span>
      </h1>

      <div className="text-white h-[54vh] w-[40vw] mt-10 rounded-3xl border-4 text-center border-white shadow-lg shadow-white bg-opacity-80 backdrop-blur-xl flex flex-col pt-5 items-center font-thin">
        <h1 className="font-bold text-3xl w-[20vw] border-b-4 border-white pb-3">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Enter Username"
            className="rounded-full text-black border-black border-4 h-[7vh] w-[20vw] mt-10 pl-4 font-mono shadow-lg shadow-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Enter Password"
            className="rounded-full text-black border-black border-4 h-[7vh] w-[20vw] mt-10 pl-4 font-mono shadow-lg shadow-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="rounded-full border-white border-4 h-[7vh] w-[20vw] mt-10 pl-4 hover:bg-green-700 text-white font-semibold shadow-lg shadow-black">
            Login
          </button>
        </form>
        <Link to={"/register"}>
          <h3 className="mt-5 hover:text-green-500">Don't have an Account?</h3>
        </Link>
      </div>
    </div>
  );
};

export default Login;
