"use client";

import { useState, useEffect } from "react";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { updateTask, getTaskById } from "@/app/actions";

function EditTaskPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const allStats = Object.values(Status);

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for task fields
  const [title, setTitle] = useState("");
  const [taskStatus, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  //imbedded TailwindCSS styles:
  const inputStyle1 =
    "w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const inputStyle2 =
    "w-full h-28 px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const btnStyle1 =
    "px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const btnStyle2 =
    "px-6 py-3 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400";

  const taskId = params.id;

  useEffect(() => {
    async function loadData() {
      try {
        const taskData = await getTaskById(taskId);
        // const newdate = `${taskData.dueDate.slice(5,7)}/${taskData.dueDate.slice(8,10)}/${taskData.dueDate.slice(0,4)}`;
        setTitle(taskData.title);
        setStatus(taskData.taskStatus);
        setDueDate(taskData.dueDate ? taskData.dueDate : "");
        setDescription(taskData.description);
      } catch (error) {
        setErrors([`Failed to load task data: ${error}`]);
      }
    }
    loadData();
  }, [taskId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // const newdate = `${dueDate.slice(5,7)}/${dueDate.slice(8,10)}/${dueDate.slice(0,4)}`;
    const formData = {
      id: taskId,
      title,
      taskStatus,
      dueDate,
      description,
    };
    try {
      await updateTask(taskId, formData);
      setSuccess(true);
      setErrors([]);
      router.push("/");
      router.refresh();
    } catch (error) {
      setErrors([`Failed to update task: ${error}`]);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push("/");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black bg-cover bg-center"
      style={{ backgroundImage: "url()" }}
    >
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-cyan-400 animate-pulse">
          Edit Task
        </h1>

        {errors.length > 0 && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-lg text-gray-300">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputStyle1}
              placeholder="Enter your task title"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-lg text-gray-300">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={taskStatus}
              onChange={(e) => setStatus(e.target.value)}
              className={inputStyle1}
              required
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
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate ? dueDate.toString().split("T")[0] : ""}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputStyle1}
              required
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
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputStyle2}
              placeholder="Enter a description for your task"
              required
            ></textarea>
          </div>

          <div className="flex justify-between items-center">
            {/* Submit Button */}
            <button type="submit" className={btnStyle1}>
              {loading ? "Submitting..." : "Submit Task"}
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

export default EditTaskPage;
