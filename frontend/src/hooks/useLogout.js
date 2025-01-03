import { useAuthContext } from "../context/authContext";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("user-info-1", data);
      setAuthUser(null);
    } catch (error) {
      console.log("Error in Logout Hook: ", error.message);
    }
  };

  return logout;
};

export default useLogout;
