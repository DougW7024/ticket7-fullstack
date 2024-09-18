"use client";

import { useState } from "react";
import { MdOutlineOpenWith } from "react-icons/md";

interface CompletedButtonProps {
  onCBFilterChange: (showCompletedOnly: boolean) => void;
}

export default function CompletedButton({
  onCBFilterChange,
}: CompletedButtonProps) {
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  function handleClick() {
    const newState = !showCompletedOnly;
    setShowCompletedOnly(newState);
    onCBFilterChange(newState);
  }

  return (
    <button className={`flex text-xl font-bold`} onClick={handleClick}>
      <MdOutlineOpenWith size={25} className="mr-4" />
      Completed
    </button>
  );
}

