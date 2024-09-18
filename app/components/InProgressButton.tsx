"use client";

import { useState } from "react";
import { BsQuestionDiamond } from "react-icons/bs";

interface InProgressButtonProps {
  onIPFilterChange: (showInProgressOnly: boolean) => void;
}

export default function InProgressButton({
  onIPFilterChange,
}: InProgressButtonProps) {
  const [showInProgressOnly, setShowInProgressOnly] = useState(false);

  function handleClick() {
    const newState = !showInProgressOnly;
    setShowInProgressOnly(newState);
    onIPFilterChange(newState);
  }

  return (
    <button className={`flex text-xl font-bold`} onClick={handleClick}>
      <BsQuestionDiamond size={25} className="mr-4" />
      In Progress
    </button>
  );
}

