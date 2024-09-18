"use client";

import Link from "next/link";
import { addTask, deleteTask, updateTask } from "./actions";
import { TaskType } from "./components/TaskType";
import React, { useEffect, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { TfiNewWindow } from "react-icons/tfi";
import { BsQuestionDiamond } from "react-icons/bs";
import { MdOutlineOpenWith, MdOutlineLibraryAdd } from "react-icons/md";

interface TaskGridProps {
  tasks: TaskType[];
}

function handleNewClick() {
  // const [addNewButtonState, setAddNewButtonState] = useState(true);
  // setAddNewButtonState(true);
}

export default function TaskGrid({ tasks }: TaskGridProps) {
  const [pageTitle, setPageTitle] = useState("Your Tasks");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [sortByDueDate, setSortByDueDate] = useState(false);

  //imbedded TailwindCSS styles:
  const navbtnStyle =
    "flex cursor-pointer rounded-lg border-2 transition duration-300 ease-in-out border-orange-800 p-2 hover:text-white hover:bg-black hover:border-orange-600";
  const addbtnStyle =
    "flex cursor-pointer rounded-lg border-2 transition duration-300 ease-in-out border-slate-500 p-2 hover:text-white hover:bg-black hover:border-slate-300";
  const miscbtnStyle =
    "border-2 border-orange-800 p-2 hover:text-white hover:bg-black hover:border-orange-600 text-white font-bold italic hover:not-italic py-1 px-2 rounded-full";

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleAllTasksClick = () => {
    setPageTitle("All Tasks");
    setFilteredTasks(tasks);
  };

  const handleOpenClick = () => {
    setPageTitle("Your Open Tasks");
    setFilteredTasks(tasks.filter((task) => task.taskStatus === "OPEN"));
  };

  const handleInProgressClick = () => {
    setPageTitle("Your In Progress Tasks");
    setFilteredTasks(tasks.filter((task) => task.taskStatus === "IN_PROGRESS"));
  };

  const handleCompletedClick = () => {
    setPageTitle("Your Completed Tasks");
    setFilteredTasks(tasks.filter((task) => task.taskStatus === "COMPLETED"));
  };

  const handleSortByDueDate = () => {
    setSortByDueDate(!sortByDueDate);
    const sorted = [...filteredTasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    setFilteredTasks(sortByDueDate ? sorted.reverse() : sorted);
  };

  const sortedTasks = sortByDueDate
    ? [...filteredTasks].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      })
    : filteredTasks;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <nav>
        <div className="flex w-full md:w-1/4 lg:w-64 p-4 md:my-16 justify-evenly">
          <ul className="text-xl font-bold flex flex-col space-y-8 p-4 text-gray-300 h-screen">
            <li className={navbtnStyle}>
              <button
                className="flex text-xl font-bold"
                onClick={handleAllTasksClick}
              >
                <FaRegFolderOpen size={25} className="mr-4" />
                All Tasks
              </button>
            </li>

            <li className={navbtnStyle}>
              <button
                className={`flex text-xl font-bold`}
                onClick={handleOpenClick}
              >
                <TfiNewWindow size={25} className="mr-4" />
                Open
              </button>
            </li>

            <li className={navbtnStyle}>
              <button
                className={`flex text-xl font-bold`}
                onClick={handleInProgressClick}
              >
                <BsQuestionDiamond size={25} className="mr-4" />
                In Progress
              </button>
            </li>

            <li className={navbtnStyle}>
              <button
                className={`flex text-xl font-bold`}
                onClick={handleCompletedClick}
              >
                <MdOutlineOpenWith size={25} className="mr-4" />
                Completed
              </button>
            </li>

            <li className={navbtnStyle}>
              <button
                className={`flex text-xl font-bold ${
                  sortByDueDate ? "text-blue-500" : "text-gray-200"
                }`}
                onClick={handleSortByDueDate}
              >
                Sort by Due Date {sortByDueDate ? "↓" : "↑"}
              </button>
            </li>

            <li className={addbtnStyle}>
              <Link href="/tasks/new">
                <button
                  className="flex text-xl font-bold"
                  onClick={() => handleNewClick()}
                >
                  <MdOutlineLibraryAdd size={25} className="mr-4" />
                  Add New
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <div className="flex flex-col w-full md:basis-3/4 text-white text-center">
          <h1 className="flex justify-center text-3xl font-bold my-8 tracking-tight">
            {pageTitle}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-4 md:mx-16 lg:mx-28">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-gray-700 rounded-lg flex flex-col justify-between"
                style={{ minHeight: "240px" }}
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                  <span className="font-bold text-green-600">
                    {task.taskStatus === "IN_PROGRESS"
                      ? `IN PROGRESS`
                      : task.taskStatus}
                  </span>
                  <p className="text-sm text-gray-500 mb-2">
                    {task.dueDate?.slice(5, 7)}/{task.dueDate?.slice(8, 10)}/
                    {task.dueDate?.slice(0, 4)}
                  </p>
                  <p className="line-clamp-3">
                    {task.description.length > 45
                      ? `${task.description.slice(0, 45)}...`
                      : task.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-between border-slate-300">
                  <Link href={`http://localhost:3000/tasks/${task.id}/edit`}>
                    <button
                      className={miscbtnStyle}
                      onClick={() => updateTask(task.id, task)}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className={miscbtnStyle}
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
