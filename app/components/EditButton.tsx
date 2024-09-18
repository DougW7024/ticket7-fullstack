"use client";

import { useState } from "react";

export default function EditButton({ params }: { params: { id: number } }) {
  const [editButtonState, setEditButtonState] = useState(false);
  function handleClick() {
    setEditButtonState(true);
    //   if (completedButtonState) dynamicTitle = "Your Completed Tasks";
    // console.log("CompletedButton", setCompletedButtonState);
  }
  return (
    <button className="flex text-xl font-bold mr-4" onClick={handleClick}>
      Edit
    </button>
  );
}
