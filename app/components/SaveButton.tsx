"use client";

import { GrSave } from "react-icons/gr";

export default function SaveButton() {
  return (
    <button className="flex text-xl font-bold">
      <GrSave size={25} className="mr-4" />
      SAVE
    </button>
  );
}
