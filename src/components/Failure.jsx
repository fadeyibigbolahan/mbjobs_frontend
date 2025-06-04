import { X } from "lucide-react";
import React from "react";

const Failure = ({ message = "Failed", onClose }) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black/50 fixed top-0 left-0 z-50 p-3">
      <div className="flex justify-between gap-5 items-center flex-col bg-white rounded-xl p-6 shadow-lg text-center md:w-[300px] w-full">
        <div className="flex justify-center items-center w-[100px] h-[100px] bg-red-600/50 rounded-full">
          <div className="flex justify-center items-center w-[70px] h-[70px] bg-red-600 rounded-full">
            <X color="white" size={40} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Opps!</h2>
        <p className="text-sm">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Failure;
