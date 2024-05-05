import TaskInput from "./component/TaskInput";
import TaskList from "./component/TaskList";
import Header from "./component/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuth } from "./features/auth/authSlice";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const login = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <Header />
        {!login && (
          <div className="flex justify-center items-center h-96">
            <div className="w-96 bg-white p-6 rounded-lg shadow-md">
              <h1>
                {" "}
                <span
                  className="text-blue-500 cursor-pointer font-bold"
                  onClick={() => dispatch(toggleAuth())}
                >
                  Login
                </span>{" "}
                to Add Your task and View Your Tasks
              </h1>
            </div>
          </div>
        )}
        {login && (
          <>
            <TaskInput currentId={currentId} setCurrentId={setCurrentId} />
            <TaskList setCurrentId={setCurrentId} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
