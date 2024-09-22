import { Status } from "@prisma/client";
import { getTaskById } from "@/app/actions";
import EditTaskForm from "@/app/components/EditTaskForm";
import { TaskType } from "@/app/components/TaskType";

type PageProps = {
  params: {
    id: number;
    title: string;
    taskStatus: Status;
    dueDate: string;
    description: string;
  };
};

let task: TaskType | null = null;
let error: string | null = null;

export default async function EditTaskPage({ params }: PageProps) {
  const taskId = params.id;

  if (isNaN(taskId)) {
    console.error("Invalid task ID");
  }
  const task = await getTaskById(taskId);
  try {
    if (!task) {
      return console.error("No task found");
    }
  } catch (e) {
    error = "Failed to load task data";
    return console.error(error, e);
  }
  return <EditTaskForm initialData={task} />;
}
