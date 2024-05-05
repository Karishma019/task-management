import { useSelector } from "react-redux";
import Task from "./Task";
import noTaskImg from "../img/noTask.png";

const TaskList = ({ setCurrentId }) => {
  const tasks = useSelector((state) => state.tasks);
  return (
    <div className="mt-10 px-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold border-b py-1 inline">My Tasks</h1>
      {tasks.length !== 0 ? (
        tasks.map((task) => {
          return <Task key={task.id} task={task} setCurrentId={setCurrentId} />;
        })
      ) : (
        <div className="flex justify-center  flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Task List is Empty</h2>
          <img src={noTaskImg} alt="Empty-task" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default TaskList;
