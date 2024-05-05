import { addTasks } from "../features/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editTask } from "../features/tasks/tasksSlice";
import axios from "axios";
import { fetchWeather } from "../features/weatherApi/weatherSlice";
import { ImSpinner } from "react-icons/im";

const TaskInput = ({ currentId, setCurrentId }) => {
  const tasks = useSelector((state) => state.tasks);
  const { weatherData, loading, error } = useSelector((state) => state.weather);

  const [todoText, setTodoText] = useState("");
  const [priority, setPriority] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const index = tasks.findIndex((task) => task.id === currentId);
  const existingTask = tasks[index];

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handlePriorityClick = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  useEffect(() => {
    if (currentId !== 0) {
      setTodoText(existingTask.text);
      setPriority(existingTask.priority);
      setCity(existingTask.city);
      setCountry(existingTask.country);
    }
  }, [currentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText.trim() || !priority) return;
    if (weatherData) {
      if (currentId === 0) {
        const newTask = {
          id: crypto.randomUUID(),
          completed: false,
          text: todoText,
          priority: priority,
          city: city,
          country: country,
          conditionText: weatherData.current.condition.text,
          conditionImg: weatherData.current.condition.icon,
          humidity: weatherData.current.humidity,
          temperature: weatherData.current.temp_c,
          WindSpeed: weatherData.current.wind_kph,
        };
        dispatch(addTasks(newTask));
        setTodoText("");
        setPriority("");
        setCity("");
        setCountry("");
      } else {
        const updateTask = {
          text: todoText,
          priority: priority,
          city: city,
          country: country,
          conditionText: weatherData.current.condition.text,
          conditionImg: weatherData.current.condition.icon,
          humidity: weatherData.current.humidity,
          temperature: weatherData.current.temp_c,
          WindSpeed: weatherData.current.wind_kph,
        };
        dispatch(
          editTask({
            ...updateTask,
            id: currentId,
          })
        );
        setCurrentId(0);
        setTodoText("");
        setPriority("");
        setCity("");
        setCountry("");
      }
    }
  };

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const data = await response.data.data;
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (city.trim() !== "") {
      dispatch(fetchWeather(city));
    }
  }, [city]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h1 className="text-3xl font-bold py-2 text-center">
        {currentId ? "Edit Task" : "Add Task"}
      </h1>
      <input
        type="text"
        placeholder="Enter The Task"
        value={todoText}
        onChange={handleInputChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-blue-500"
      />
      <p className="text-lg mb-2">Select Priority : </p>
      <div className="flex justify-between mb-4">
        <button
          type="button"
          onClick={() => handlePriorityClick("high")}
          className={`flex-1 px-4 py-2 rounded-md mr-2 ${
            priority === "high"
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          High
        </button>
        <button
          type="button"
          onClick={() => handlePriorityClick("medium")}
          className={`flex-1 px-4 py-2 rounded-md mr-2 ${
            priority === "medium"
              ? "bg-yellow-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Medium
        </button>
        <button
          type="button"
          onClick={() => handlePriorityClick("low")}
          className={`flex-1 px-4 py-2 rounded-md mr-2 ${
            priority === "low"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Low
        </button>
      </div>
      <div>
        <p className="text-md mb-2">Select Country : </p>
        <select
          value={country}
          onChange={handleCountryChange}
          className="w-40 bg-gray-300 outline-none mb-2 p-1"
        >
          {countries.map((countryName, index) => (
            <option key={index} value={countryName.country}>
              {countryName.country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-md mb-2">Select City : </p>
        <select
          value={city}
          onChange={handleCityChange}
          className="w-40 bg-gray-300 outline-none mb-2 p-1"
        >
          {countries.map((countryName, index) => {
            if (countryName.country === country) {
              return countryName.cities.map((city) => {
                return (
                  <option key={crypto.randomUUID()} value={city}>
                    {city}
                  </option>
                );
              });
            } else {
              <option key={index} value="">
                Select State
              </option>;
            }
          })}
        </select>
      </div>
      <p className="text-red-100">{error}</p>
      <button
        type="submit"
        className="w-full flex justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {loading ? <ImSpinner className="animate-spin text-2xl" /> : "Add"}
      </button>
    </form>
  );
};

export default TaskInput;
