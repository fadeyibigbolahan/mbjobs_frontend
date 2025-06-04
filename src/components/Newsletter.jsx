import React from "react";

const Newsletter = () => {
  return (
    <div className="w-full md:py-16 text-white md:px-4 p-4">
      <div className="max-w-[1240px] mx-auto flex flex-col">
        <div className="flex gap-4 flex-col justify-center items-center lg:col-span-2 my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            How it works
          </h1>
          <p className="text-center md:w-2/3 leading-8">
            Obtained your registration pin (E-pin) from a vendor (Click on
            vendor's page),
            <br />
            click on your upline's link or click on "Register". <br />
            Fill out the registration form and submit it, you can then log in to
            your dashboard, officially becoming a member of the company.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
