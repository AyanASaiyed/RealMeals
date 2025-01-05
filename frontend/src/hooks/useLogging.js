import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useLogging = () => {
  const { setAuthUser } = useAuthContext();
  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      const data = await res.json();

      localStorage.setItem("user-info-1", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Successful Login");
      console.log("successfull login.", {
        username,
        password,
      });
    } catch (error) {
      toast.error(error.message);
      console.log("Error in Login Hook: ", error.message);
    }
  };

  return login;
};

export default useLogging;
