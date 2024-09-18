"use client";

import { MdOutlineCancel } from "react-icons/md";

export default function CancelButton() {
  return (
    <button className="flex text-xl font-bold">
      <MdOutlineCancel size={25} className="mr-4" />
      CANCEL
    </button>
  );
}
