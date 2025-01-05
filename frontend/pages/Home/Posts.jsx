import { useAuthContext } from "../../src/context/authContext";

const Posts = ({ img }) => {
  const { authUser } = useAuthContext();
  const username = authUser.username;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-[50vh] w-[40vw] bg-opacity-50 backdrop-blur-xl rounded-3xl border-2 mt-10 flex flex-col items-center justify-center p-4">
        <h1 className="text-white mb-4">{username}</h1>
        {img && (
          <img
            src={img}
            alt="Uploaded"
            className="h-[40vh] rounded-xl shadow-2xl shadow-black"
          />
        )}
      </div>
    </div>
  );
};

export default Posts;
