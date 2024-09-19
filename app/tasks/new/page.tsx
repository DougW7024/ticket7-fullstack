"use client";

import { useState } from "react";
import { Status } from "@prisma/client";
import { addTask } from "@/app/actions";
import { useRouter } from "next/navigation";

function NewTaskPage({ params }: { params: { id: number } }) {
  const [title, setTitle] = useState("");
  const [taskStatus, setStatus] = useState("OPEN");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const allStats = Object.keys(Status);

  //imbedded TailwindCSS styles:
  const inputStyle1 =
    "w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const inputStyle2 =
    "w-full h-28 px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const btnStyle1 =
    "px-6 py-3 flex bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const btnStyle2 =
    "px-6 py-3 flex bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400";
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = {
      id: params.id,
      title,
      taskStatus,
      dueDate,
      description,
    };
    const newTask = await addTask(formData);
    router.push("/");
    router.refresh();
  }

  function handleCancel() {
    setTitle("");
    setStatus("");
    setDueDate("");
    setDescription("");
    router.push("/");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black bg-cover bg-center"
      style={{
        backgroundImage: "url()",
      }}
    >
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-cyan-400 animate-pulse">
          Create New Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-lg text-gray-300">
              Task Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              name="title"
              value={title}
              className={inputStyle1}
              placeholder="Enter your task title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-lg text-gray-300">
              Status
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              id="status"
              name="status"
              value={taskStatus}
              className={inputStyle1}
            >
              {allStats.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-lg text-gray-300">
              Due Date
            </label>
            <input
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              className={inputStyle1}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-lg text-gray-300"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              name="description"
              value={description}
              className={inputStyle2}
              placeholder="Enter a description for your task"
            ></textarea>
          </div>

          <div className="flex justify-between items-center">
            {/* Submit Button */}
            <button type="submit" onClick={handleSubmit} className={btnStyle1}>
              Submit Task
            </button>

            {/* Cancel Button */}
            <button type="button" onClick={handleCancel} className={btnStyle2}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskPage;
