import axios from "axios";
import { TaskType } from "./components/TaskType";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api/tasks/",
});
const fetchClient = fetch("http://localhost:3000/api/tasks/");

export async function getAllTasks() {
  try {
    const response = await axiosClient.get(``);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get tasks");
  }
}

export async function getTaskById(taskId: number) {
  try {
    const response = await axiosClient.get(`${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get task with ID: ${taskId}`);
  }
}

// export async function getTaskById(taskId: number): Promise<Response> {
//   return fetch(`/api/tasks/${taskId}`, { method: "GET" });
// }

export async function addTask(newTask: TaskType) {
  try {
    // Format the dueDate to ISO-8601
    const formattedTask = {
      ...newTask,
      dueDate: newTask.dueDate
        ? new Date(newTask.dueDate).toISOString()
        : Date.now().toString(),
    };
    const response = await axiosClient.post(``, formattedTask);
    return response.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw new Error("Failed to create task");
  }
}

export async function updateTask(taskId: number, updatedTask: TaskType) {
  try {
    // Format the dueDate to ISO-8601
    const formattedTask = {
      ...updatedTask,
      dueDate: updatedTask.dueDate
        ? new Date(updatedTask.dueDate).toISOString()
        : Date.now().toString(),
    };
    const response = await axiosClient.patch(`${taskId}`, formattedTask);
    return response.data;
  } catch (error) {
    console.error(`Failed to update task with ID: ${taskId}`, error);
    throw new Error(`Failed to update task with ID: ${taskId}`);
  }
}

export async function deleteTask(taskId: number): Promise<Response> {
  return fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
}
