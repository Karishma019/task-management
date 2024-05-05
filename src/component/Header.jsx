import { useSelector, useDispatch } from "react-redux";
import { toggleAuth } from "../features/auth/authSlice";
const Header = () => {
  const login = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAuth = () => {
    dispatch(toggleAuth());
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto max-w-5xl flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Management</h1>
        <div>
          <button
            onClick={handleAuth}
            className={`px-4 py-2 ${
              login
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            } rounded-md`}
          >
            {login ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
