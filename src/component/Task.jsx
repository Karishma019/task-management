import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteTasks, toggleCompleted } from "../features/tasks/tasksSlice";
function Task({ task, setCurrentId }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      <div className="flex items-center gap-4">
        <input
          onChange={() => dispatch(toggleCompleted({ id: task.id }))}
          type="checkbox"
          checked={task.completed}
          className="h-5 w-5 cursor-pointer"
        />
        <div>
          <div className="flex gap-2">
            <p className="text-sm">
              {task.city}, {task.country}
            </p>
          </div>
          <span
            className={`mr-2 text-xl ${
              task.completed ? "line-through text-gray-500" : "font-semibold"
            }`}
          >
            {task.text}
          </span>

          <div className="flex gap-2 my-1">
            <p className="text-sm">
              temp: <span className="font-bold">{task.temperature}&deg;C</span>
            </p>
            <p className="text-sm">
              Speed: <span className="font-bold"> {task.WindSpeed}kph</span>
            </p>
          </div>
        </div>

        <div>
          <img
            src={task.conditionImg}
            alt={task.conditionText}
            className="h-10"
          />
          <p className="text-sm">{task.conditionText}</p>
        </div>
      </div>
      <span
        className={`px-2 py-1 rounded-md ${
          task.priority === "high"
            ? "bg-red-500 text-white"
            : task.priority === "medium"
            ? "bg-yellow-500 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        {task.priority}
      </span>
      <div className="flex items-center gap-2">
        <FaEdit
          className="text-2xl cursor-pointer"
          onClick={() => setCurrentId(task.id)}
        />
        <RiDeleteBin6Fill
          className="text-2xl cursor-pointer"
          onClick={() => dispatch(deleteTasks({ id: task.id }))}
        />
      </div>
    </div>
  );
}

export default Task;
