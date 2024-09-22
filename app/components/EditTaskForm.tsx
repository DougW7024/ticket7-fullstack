"use client";

import { useState, useEffect } from "react";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { updateTask, getTaskById, deleteTask } from "@/app/actions";

interface EditTaskFormProps {
  initialData: {
    id: number;
    title: string;
    taskStatus: Status;
    dueDate: string;
    description: string;
  };
}

function EditTaskForm({ initialData }: EditTaskFormProps) {
  const router = useRouter();
  const allStats = Object.values(Status);

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State for task fields
  const [formData, setFormData] = useState({
    id: initialData.id,
    title: initialData.title,
    taskStatus: initialData.taskStatus,
    dueDate: initialData.dueDate,
    description: initialData.description,
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
  const btnStyle3 =
  "px-6 py-3 flex bg-red-700 hover:bg-red-800 text-xl italic text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black";
  
  const taskId = initialData.id;
  
  const handleChange = (
    e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    async function loadData() {
      try {
        const taskData = await getTaskById(taskId);
        // const newdate = `${taskData.dueDate.slice(5,7)}/${taskData.dueDate.slice(8,10)}/${taskData.dueDate.slice(0,4)}`;
        setFormData({
          id: taskData.id.toString(),
          title: taskData.title,
          taskStatus: taskData.taskStatus,
          dueDate: taskData.dueDate ? taskData.dueDate : "",
          description: taskData.description,
        });
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
    try {
      await updateTask(taskId, formData);
      setErrors([]);
      router.push("/");
      router.refresh();
    } catch (error) {
      setErrors([`Failed to update task: ${error}`]);
    } finally {
      setLoading(false);
      router.push("/");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const result = await deleteTask(taskId);
        if (result.ok) {
          router.push("/");
          router.refresh();
        } else {
          console.error("Failed to delete task");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-lg text-gray-300">
              Task Title
            </label>
            <input
              type="text"
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className={inputStyle1}
              placeholder="Enter your task title"
              // required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-lg text-gray-300">
              Status
            </label>
            <select
              id='taskStatus'
              name='taskStatus'
              value={formData.taskStatus}
              onChange={handleChange}
              className={inputStyle1}
              // required
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
              id='dueDate'
              name='dueDate'
              value={
                formData.dueDate
                  ? formData.dueDate.toString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className={inputStyle1}
              // required
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
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className={inputStyle2}
              placeholder="Enter a description for your task"
              // required
            ></textarea>
          </div>

          <div className="flex justify-between items-center">
            <button type="submit" onClick={handleSubmit} className={btnStyle1}>
              {loading ? "Submitting..." : "Submit Task"}
            </button>

            <button type="button" className={btnStyle3} onClick={handleDelete}>
              Delete
            </button>

            <button type="button" onClick={handleCancel} className={btnStyle2}>
              Cancel
            </button>
          </div>
        </form>

        {errors.length > 0 && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditTaskForm;
