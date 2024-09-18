import { getAllTasks } from "./actions";
import TaskGrid from "./TaskGrid"; // Client component
import { TaskType } from "./components/TaskType";

export default async function HomePage() {
  const tasks: TaskType[] = await getAllTasks();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <TaskGrid tasks={tasks} />
    </div>
  );
}
