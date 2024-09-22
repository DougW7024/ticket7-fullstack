"use client";

import { useState } from "react";
import { Status } from "@prisma/client";
import { addTask } from "@/app/actions";
import { useRouter } from "next/navigation";

function NewTaskPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const allStats = Object.keys(Status);

  // State for task fields
  const [formData, setFormData] = useState({
    title: "",
    taskStatus: "OPEN",
    dueDate: "",
    description: "",
  });

  //imbedded TailwindCSS styles:
  const inputStyle1 =
    "w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const inputStyle2 =
    "w-full h-28 px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const btnStyle1 =
    "px-6 py-3 flex bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const btnStyle2 =
    "px-6 py-3 flex bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormData({
      title: formData.title,
      taskStatus: formData.taskStatus,
      dueDate: formData.dueDate,
      description: formData.description,
    });
    const newTask = await addTask({ ...formData, id: params.id });
    router.push("/");
    router.refresh();
  }

  function handleCancel() {
    setFormData({
      title: "",
      taskStatus: "",
      dueDate: "",
      description: "",
    });
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
              onChange={handleChange}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              className={inputStyle1}
              placeholder="Enter your task title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-lg text-gray-300">
              Status
            </label>
            <select
              onChange={handleChange}
              id="taskStatus"
              name="taskStatus"
              value={formData.taskStatus}
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
              onChange={handleChange}
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
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
              onChange={handleChange}
              id="description"
              name="description"
              value={formData.description}
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
