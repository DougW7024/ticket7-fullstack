"use client";

import { useState } from "react";

export default function DeleteButton({ params }: { params: { id: number } }) {
  const [deleteButtonState, setDeleteButtonState] = useState(false);
  function handleClick() {
    setDeleteButtonState(true);
    //   if (completedButtonState) dynamicTitle = "Your Completed Tasks";
    // console.log("CompletedButton", setCompletedButtonState);
  }
  return (
    <button className="flex text-xl font-bold mr-4" onClick={handleClick}>
      Delete
    </button>
  );
}
