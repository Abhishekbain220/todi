import React, { useContext } from 'react';
import { TaskContext } from '../utils/TaskContext';

const Form = ({ createFunction,setTask,setHeading, task,heading,formHeading, button,close }) => {
  let { updateHeading,setUpdateHeading,updateTask,setUpdateTask ,loading} = useContext(TaskContext);

  return (
    <div className="px-4 absolute  sm:px-6 md:px-8 flex justify-center w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
      <i onClick={()=> close(false)} class="ri-close-line absolute right-5 cursor-pointer text-3xl top-5"></i>
      <form
        onSubmit={createFunction}
        className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 rounded-2xl  flex flex-col gap-5"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
          {formHeading}
        </h2>

        <input
          onChange={(e) => setHeading(e.target.value)}
          type="text"
          value={heading}
          placeholder="Heading"
          className="border rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          onChange={(e) => setTask(e.target.value)}
          type="text"
          value={task}
          placeholder="Task"
          className="border rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all text-base sm:text-lg font-medium"
        >
          {loading ? "Loading..." : `${button}`}
        </button>
      </form>
    </div>
  );
};

export default Form;
