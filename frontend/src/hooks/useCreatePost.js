import axios from "axios";

const useCreatePost = () => {
  const createPost = async (base64url) => {
    try {
      const res = await axios.post("http://localhost:3000/api/posts/create")

      if (!res.ok) {
        console.log("Error Fetching createPost API");
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user-posts", data);
    } catch (error) {
      console.log("Error in Creating Post: ", error.message);
    }
  };

  return createPost;
};

export default useCreatePost;
