const useCreatePost = () => {
  const createPost = async ({ base64url }) => {
    try {
      const res = await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64url }),
        credentials: "include",
      });

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
