const Home = () => {
  const handleLogout = async (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="h-[20vh] w-screen backdrop-blur-lg bg-opacity-85 flex-col flex">
          <h1>Home Page</h1>
          <h1 className="text-white font-extrabold">Hey</h1>
          <button
            className="h-[5vh] w-[10vw] bg-red-800 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
