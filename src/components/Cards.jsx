import React from "react";
import basic from "../assets/BASIC.png";
import silver from "../assets/SILVER.png";
import gold from "../assets/GOLD.png";
import vip from "../assets/VIP.png";

import html2canvas from "html2canvas";

const downloadCard = async () => {
  const cardElement = document.getElementById("membershipCard");

  html2canvas(cardElement, {
    useCORS: true,
    allowTaint: false,
    backgroundColor: null, // optional: keeps transparent background if any
  })
    .then((canvas) => {
      const link = document.createElement("a");
      link.download = "membership-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    })
    .catch((error) => {
      console.error("Failed to capture card:", error);
    });
};

const Cards = ({ data }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        id="membershipCard"
        style={{
          position: "relative",
          width: "380px",
          height: "250px",
          backgroundImage: `url(${
            data?.membershipLevel === "Basic"
              ? basic
              : data?.membershipLevel === "Silver"
              ? silver
              : data?.membershipLevel === "Gold"
              ? gold
              : vip
          })`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <div
          className="flex flex-row justify-center items-center gap-2"
          style={{ position: "absolute", top: 10, left: 20 }}
        >
          <div className="flex justify-center items-center h-[30px] w-[30px]">
            <img
              src={data?.organizationId?.logoUrl || ""}
              alt="org-logo"
              className="w-full h-full"
              crossOrigin="anonymous"
            />
          </div>
          <p className="font-sembold text-xs">
            {data?.organizationId?.name || ""}
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: 90,
            right: 12,
          }}
        >
          <p className="text-xs">{data?.userId?.fullName || ""}</p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 100,
            right: 12,
          }}
        >
          <p className="text-xs">{data?.membershipId || ""}</p>
        </div>
        <img
          src={data?.qrCodeUrl || ""}
          alt="QR Code"
          style={{ position: "absolute", bottom: 65, left: 50, width: 85 }}
          crossOrigin="anonymous"
        />
      </div>
      <button
        className="rounded bg-[#003366 ] p-2 text-white hover:bg-[#7A54A1] flex justify-center items-center"
        onClick={downloadCard}
      >
        Download Card
      </button>
    </div>
  );
};

export default Cards;
