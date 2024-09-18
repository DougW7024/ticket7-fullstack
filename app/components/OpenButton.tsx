"use client";

import { useState } from "react";
import { TfiNewWindow } from "react-icons/tfi";

interface OpenButtonProps {
  onOBFilterChange: (showOpenOnly: boolean) => void;
}

export default function OpenButton({ onOBFilterChange }: OpenButtonProps) {
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  function handleClick() {
    const newState = !showOpenOnly;
    setShowOpenOnly(newState);
    onOBFilterChange(newState);
  }

  return (
    <button 
      className={`flex text-xl font-bold`} 
      onClick={handleClick}
    >
      <TfiNewWindow size={25} className="mr-4" />
      Open
    </button>
  );
}

