import { useState } from "react";
import { Link } from "react-router-dom";
import useRegistration from "../../src/hooks/useRegistration";

const Register = () => {
  const register = useRegistration();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    await register(inputs);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <h1 className="text-5xl font-extralight">
        Real<span className="text-green-500">Meals😋</span>
      </h1>

      <div className="text-black h-[64vh] w-[40vw] mt-10 rounded-3xl border-8 text-center border-black bg-opacity-80 backdrop-blur-xl shadow-lg shadow-black flex flex-col pt-5 items-center font-thin">
        <h1 className="font-bold text-3xl w-[20vw] border-b-4 border-black pb-3">
          Signup
        </h1>
        <form onSubmit={handleSignup}>
          <input
            placeholder="Enter Username"
            className="rounded-full border-black border-4 h-[7vh] w-[20vw] mt-10 pl-4 font-mono shadow-lg shadow-black"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <input
            placeholder="Enter Password"
            className="rounded-full border-black border-4 h-[7vh] w-[20vw] mt-10 pl-4 font-mono shadow-lg shadow-black"
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          <input
            placeholder="Confirm Password"
            className="rounded-full border-black border-4 h-[7vh] w-[20vw] mt-10 pl-4 font-mono shadow-lg shadow-black"
            type="password"
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
          <button className="rounded-full border-black border-4 h-[7vh] w-[20vw] mt-10 pl-4 hover:bg-green-700 text-white font-semibold shadow-lg shadow-black">
            Create Account
          </button>
        </form>
        <Link to={"/login"}>
          <h3 className="mt-5 hover:text-white">Already have an Account?</h3>
        </Link>
      </div>
    </div>
  );
};

export default Register;
