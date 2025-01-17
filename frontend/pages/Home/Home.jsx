import axios from "axios";
import { useAuthContext } from "../../src/context/authContext";
import useLogout from "../../src/hooks/useLogout";
import Posts from "./Posts";
import { useEffect, useState } from "react";

const Home = () => {
  const { authUser } = useAuthContext();
  const username = authUser.username;

  const [Image, setImage] = useState();
  const [Posts, setPosts] = useState();

  const logout = useLogout();

  useEffect(() => {
    getPosts();
  }, []);

  const uploadImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!Image) {
      console.log("No file set");
      return;
    }
    formData.append("post", Image);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Image Uploaded Successfully: ", res.data);
    } catch (error) {
      console.log("Error uploading image on AXIOS: ", error.message);
    }
  };

  const getPosts = async () => {
    const res = await axios.get("http://localhost:3000/api/posts/get");
    setPosts(res);
    console.log(res);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
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
        <div>{Image ? <Posts img={Image} /> : ""}</div>
        {Posts.map((data) => {
          return <img src={data} />;
        })}
        <div>
          <form onSubmit={submit}>
            <input type="file" accept="image/*" onChange={uploadImage} />
            <button className=" h-[5vh] w-[7vw] bg-green-900 rounded-2xl">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
