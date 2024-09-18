"use client";

import React, { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";

export default function AllTasksButton() {
  const [allTasksButtonState, setAllTasksButtonState] = useState(false);

  function handleClick() {
    setAllTasksButtonState(true);
    //   if (allTasksButtonState) dynamicTitle = "";
    // console.log("AllTasksButton", setAllTasksButtonState);
  }
  return (
    <button className="flex text-xl font-bold" onClick={handleClick}>
      <FaRegFolderOpen size={25} className="mr-4" />
      All Tasks
    </button>
  );
}
