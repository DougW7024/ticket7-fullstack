import axios from "axios";
import { TaskType } from "./components/TaskType";

const client = axios.create({
  baseURL: "http://localhost:3000/api/tasks/",
});

export async function getAllTasks() {
  try {
    const response = await client.get(``);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get tasks");
  }
}

export async function getTaskById(taskId: number) {
  try {
    const response = await client.get(`${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get task with ID: ${taskId}`);
  }
}

export async function addTask(newTask: TaskType) {
  try {
    // Format the dueDate to ISO-8601
    const formattedTask = {
      ...newTask,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null,
    };
    const response = await client.post(``, formattedTask);
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
        : null,
    };
    const response = await client.patch(`${taskId}`, formattedTask);
    return response.data;
  } catch (error) {
    console.error(`Failed to update task with ID: ${taskId}`, error);
    throw new Error(`Failed to update task with ID: ${taskId}`);
  }
}

export async function deleteTask(
  taskId: number
): Promise<{ data: any; confirmed: boolean } | null> {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );
  if (isConfirmed) {
    try {
      const response = await client.delete(`${taskId}`);
      return { data: response.data, confirmed: true };
    } catch (error) {
      throw new Error(`Failed to delete task with ID: ${taskId}`);
    }
  } else {
    return { data: null, confirmed: false };
  }
}
