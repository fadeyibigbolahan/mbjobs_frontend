import React from "react";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";

const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-md p-6 md:w-[300px] w-full shadow-lg flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center w-[100px] h-[100px] bg-red-600/50 rounded-full">
          <div className="flex justify-center items-center w-[70px] h-[70px] bg-red-600 rounded-full">
            <CircleHelp color="white" size={40} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-red-600">
          {title || "Are you sure?"}
        </h2>
        <p className="text-sm text-gray-600 text-center">{message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
