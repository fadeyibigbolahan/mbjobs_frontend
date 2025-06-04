import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white text-center px-4">
      <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
    </div>
  );
};

export default Loading;
