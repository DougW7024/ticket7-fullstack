"use client";

import Link from "next/link";
import { useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";

export default function AddNewButton() {
  const [addNewButtonState, setAddNewButtonState] = useState(false);

  function handleClick() {
    setAddNewButtonState(true);
    // console.log("AddNewButton", setAddNewButtonState);
  }
  return (
    // <button className={buttonStyle} onClick={handleClick}>
    <Link href="/tasks/new">
      <button className="flex text-xl font-bold" onClick={handleClick}>
        <MdOutlineLibraryAdd size={25} className="mr-4" />
        Add New
      </button>
    </Link>
  );
}
