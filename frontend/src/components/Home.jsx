import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { TaskContext } from '../utils/TaskContext';
import Form from './Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPage from './LoadingPage';

const Home = () => {
  const { token, logout, setToken } = useContext(UserContext);
  const {
    heading,
    setHeading,
    task,
    setTask,
    createTask,
    viewTasks,
    deleteTask,
    updateHandler,
    updateHeading,
    updateTask,
    updateTaskHandler,
    setUpdateHeading,
    setUpdateTask,
    updateSwitch,
    createForm,
    createSwitch,
    setCreateSwitch,
    setUpdateSwitch,
    getTaskData,loading,setLoading
  } = useContext(TaskContext);

  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const { data } = await axios.get("/user/currentUser", { withCredentials: true });
      setUser(data.user.username);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("authToken");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUser();
      getTaskData();
    }
  }, [token, navigate]);

  return user?(
    <div className="min-h-screen bg-gray-100 w-full p-4 flex flex-col items-center justify-center space-y-6">
      {/* Welcome Section */}
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-md text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Welcome, {user}!</h1>
        <p className="text-gray-600 mt-2">You are successfully logged in.</p>
      </div>

      {/* Add Task Section */}
      <div
        onClick={createForm}
        className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-md text-center flex items-center justify-center space-x-2 cursor-pointer gap-1 hover:bg-gray-50 transition"
      >
        <i className="ri-add-large-line text-blue-600 text-2xl font-black"></i>
        <p className="text-gray-600">Add new task</p>
      </div>

      {createSwitch && (
        <Form
          createFunction={createTask}
          setTask={setTask}
          setHeading={setHeading}
          task={task}
          heading={heading}
          formHeading={"Create new Task"}
          button={"Submit"}
          close={setCreateSwitch}
        />
      )}

      {updateSwitch && (
        <Form
          createFunction={updateTaskHandler}
          setTask={setUpdateTask}
          setHeading={setUpdateHeading}
          task={updateTask}
          heading={updateHeading}
          formHeading="Update Task"
          button="Update"
          close={setUpdateSwitch}
        />
      )}

      {/* Tasks List */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Tasks</h2>
        <div className="space-y-3">
          {viewTasks.length > 0 ? (
            viewTasks.map((elem, i) => (
              <div
                key={i}
                className="p-4 flex flex-col sm:flex-row justify-between items-center border rounded-md bg-gray-50 hover:bg-gray-100 transition"
              >
                <div onClick={() => updateHandler(elem.heading, elem.task, elem._id)} className="w-full sm:w-auto cursor-pointer">
                  <h3 className="text-blue-600 font-medium text-lg">{elem.heading}</h3>
                  <p className="text-gray-700 text-sm break-words">{elem.task}</p>
                </div>
                <div className="text-2xl mt-2 sm:mt-0">
                {!loading ? (<i
                    onClick={() => deleteTask(elem._id)}
                    className="ri-delete-bin-6-line cursor-pointer text-red-500 hover:text-red-700"
                  ></i>):(<i class="ri-loader-4-line"></i>)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">No tasks yet.</p>
          )}
        </div>
      </div>
    </div>
  ):(<LoadingPage/>)
};

export default Home;
