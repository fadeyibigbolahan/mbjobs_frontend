import React from "react";
import { EllipsisVertical, CircleFadingArrowUp } from "lucide-react";

const OverviewCard = ({ title, number }) => {
  return (
    <div className="flex flex-col border-2 rounded-md gap-2">
      <div className="flex justify-between items-center p-2">
        <p className="text-gray-600 text-sm">{title}</p>
        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-md border-2">
          <EllipsisVertical size={16} className="text-gray-600" />
        </div>
      </div>
      <div className="flex justify-start items-center gap-2 p-2">
        <h2 className="font-kanit text-center md:text-2xl text-4xl font-semibold text-[#003366 ]">
          {number}
        </h2>
        <div className="flex border border-[#7A54A1] bg-[#7A54A120] p-1 gap-1 rounded-md">
          <CircleFadingArrowUp size={15} className="text-green-800" />
          <p className="text-green-800 text-xs">1.8%</p>
        </div>
      </div>
      <div className="w-full p-2 bg-[#E5E7EB]">
        <p className="text-gray-600 text-xs">+100 from last month</p>
      </div>
    </div>
  );
};

export default OverviewCard;
