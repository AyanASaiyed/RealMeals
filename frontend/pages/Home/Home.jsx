import { useAuthContext } from "../../src/context/authContext";
import useCreatePost from "../../src/hooks/useCreatePost";
import useLogout from "../../src/hooks/useLogout";
import Posts from "./Posts";
import { useState } from "react";

const Home = () => {
  const { authUser } = useAuthContext();
  const username = authUser.username;

  const createPost = useCreatePost();

  const [Image, setImage] = useState(null);

  const logout = useLogout();

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
    console.log(base64);
    await createPost(base64);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

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
          <Posts img={Image} />
        </div>
        <div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              uploadImage(e);
            }}
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
