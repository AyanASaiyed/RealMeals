import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useRegistration = () => {
  const { setAuthUser } = useAuthContext();
  const register = async ({ username, password, confirmPassword }) => {
    const valid = validCredentials(username, password, confirmPassword);

    if (!valid) return;
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      const data = await res.json();

      localStorage.setItem("user-info-1", data);

      setAuthUser(data);
      console.log("Account Successfully Registered.", {
        username,
        password,
      });
      toast.success("Registered Successfully");
    } catch (error) {
      toast.error(error.message);
      console.log("Error in Register Hook: ", error.message);
    }
  };

  return register;
};

function validCredentials(username, password, confirmPassword) {
  if (!password || !username || !confirmPassword) {
    toast.error("Please Enter All Fields");
    console.log("Please Enter All Fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters.");
    console.log("Password must be atleast 6 characters.");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    console.log("Passwords do not match");
    return false;
  }

  return true;
}

export default useRegistration;