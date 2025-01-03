import { useAuthContext } from "../../src/context/authContext";
import useLogout from "../../src/hooks/useLogout";
import Posts from "./Posts";
import { useState } from "react";

const Home = () => {
  const { authUser } = useAuthContext();
  const username = authUser.username;

  const [image, setImage] = useState(null);

  const logout = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  const handleFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="h-[12vh] w-screen backdrop-blur-lg bg-opacity-80 flex items-center justify-center space-x-72 -mt-5 bg-white/5">
          <h1 className="text-white font-extrabold">Welcome, {username}</h1>
          <h1 className="text-5xl font-extralight">
            Real<span className="text-green-500">Meals😋</span>
          </h1>
          <button
            className="h-[5vh] w-[5vw] bg-red-800 text-white rounded-full hover:bg-red-950"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div>
          <Posts />
        </div>
        <div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleFileInput}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 h-[7vh] w-[8vw] bg-green-800 hover:bg-green-900 text-white rounded-3xl"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
