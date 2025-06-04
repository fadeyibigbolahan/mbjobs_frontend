import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { url } from "../../api";

export default function EventActivityGraph({ orgId }) {
  const [eventData, setEventData] = useState([]);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1); // Full past year

  // Helper to format to "YYYY-MM-DD"
  const formatDate = (isoString) => {
    return new Date(isoString).toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchOrgEvent = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${url}events/${orgId}`, {
          headers: { Authorization: token },
        });

        // Transform eventData with formatted dates
        const formatted = data.events.map((event) => ({
          date: formatDate(event.date),
          count: 1, // You could adjust this if needed
          bookings: event.bookings || [], // assuming bookings may exist
        }));

        setEventData(formatted);
      } catch (err) {
        console.error("Failed to fetch event data", err);
      }
    };

    fetchOrgEvent();
  }, [orgId]);

  // Debug log to check eventData
  console.log("Event Data:", eventData);

  return (
    <div className="p-2 overflow-x-auto bg-white shadow rounded-xl">
      <h2 className="font-kanit text-lg font-semibold text-gray-800 mb-4">
        Event Calendar
      </h2>

      <div className="w-[800px] md:w-full">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={eventData}
          classForValue={(value) => {
            if (!value) return "color-empty";
            if (value.count >= 5) return "color-github-4";
            if (value.count >= 3) return "color-github-3";
            if (value.count >= 2) return "color-github-2";
            return "color-github-1";
          }}
          tooltipDataAttrs={(value) => ({
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": value.date
              ? `${value.date}: ${value.count} event${
                  value.count > 1 ? "s" : ""
                }`
              : "No activity",
          })}
          showWeekdayLabels={true}
          horizontal={true}
        />
      </div>

      <ReactTooltip id="heatmap-tooltip" />

      <style>
        {`
          .color-empty { fill: #ebedf0; }
          .color-github-1 { fill: #c6e48b; }
          .color-github-2 { fill: #7bc96f; }
          .color-github-3 { fill: #239a3b; }
          .color-github-4 { fill: #196127; }
          .react-calendar-heatmap text {
            font-size: 8px;
            fill: #333;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            pointer-events: none;
          }
          .react-calendar-heatmap .day {
            shape-rendering: geometricPrecision;
          }
        `}
      </style>
    </div>
  );
}
