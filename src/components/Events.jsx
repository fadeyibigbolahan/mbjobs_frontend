import { useState, useEffect } from "react";
import { Calendar, MapPin, User } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { url } from "../../api";

// const events = [
//   {
//     id: 1,
//     name: "Annual Fundraising Gala",
//     description: "A formal evening to raise funds for our charity programs.",
//     date: "2025-06-15T18:00:00",
//     location: "Grand Hotel Ballroom, NYC",
//     rsvpCount: 120,
//     capacity: 150,
//     visibility: "Public",
//   },
//   {
//     id: 2,
//     name: "Community Cleanup Drive",
//     description: "Join us to clean up Central Park and promote sustainability.",
//     date: "2025-06-20T09:00:00",
//     location: "Central Park, New York",
//     rsvpCount: 45,
//     capacity: 100,
//     visibility: "Private",
//   },
//   {
//     id: 3,
//     name: "Summer Networking Event",
//     description: "An evening of drinks, games, and making new connections.",
//     date: "2025-07-10T19:00:00",
//     location: "The Skyline Lounge, Downtown",
//     rsvpCount: 90,
//     capacity: 120,
//     visibility: "Public",
//   },
//   {
//     id: 4,
//     name: "Summer Networking Event",
//     description: "An evening of drinks, games, and making new connections.",
//     date: "2025-07-10T19:00:00",
//     location: "The Skyline Lounge, Downtown",
//     rsvpCount: 90,
//     capacity: 120,
//     visibility: "Public",
//   },
//   {
//     id: 5,
//     name: "Summer Networking Event",
//     description: "An evening of drinks, games, and making new connections.",
//     date: "2025-07-10T19:00:00",
//     location: "The Skyline Lounge, Downtown",
//     rsvpCount: 90,
//     capacity: 120,
//     visibility: "Public",
//   },
//   {
//     id: 6,
//     name: "Summer Networking Event",
//     description: "An evening of drinks, games, and making new connections.",
//     date: "2025-07-10T19:00:00",
//     location: "The Skyline Lounge, Downtown",
//     rsvpCount: 90,
//     capacity: 120,
//     visibility: "Public",
//   },
// ];

export default function Events({ orgId }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrgEvent = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${url}events/${orgId}`, {
          headers: { Authorization: token },
        });

        console.log("data", data);
        setEvents(data.events);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch organization data");
      }
    };

    fetchOrgEvent();
  }, [orgId]);

  return (
    <div className="bg-white shadow rounded-xl md:p-6 p-2 space-y-4">
      <h2 className="font-kanit text-lg font-semibold text-gray-800">
        Upcoming Events
      </h2>
      <div className="max-h-[400px] overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Event Name
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Date & Time
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Location
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Price
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                External Link
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Bookings
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Capacity
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Visibility
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 border-b">
                <td className="p-3 text-gray-800">
                  <div className="w-[150px] flex flex-col gap-1">
                    <p className="font-semibold text-xs">{event.title}</p>
                  </div>
                </td>
                <td className="p-3 text-gray-600">
                  <div className="flex items-center gap-2 text-xs">
                    {new Date(event.date).toLocaleString()}
                  </div>
                </td>
                <td className="p-3 text-gray-600">
                  <div className="flex items-center gap-2 text-xs">
                    {event.location}
                  </div>
                </td>
                <td className="p-3 text-gray-600">
                  <div className="flex items-center gap-2 text-xs">
                    ${event.price || 0}
                  </div>
                </td>
                <td className="p-3 text-gray-600">
                  <div className="flex items-center gap-2 text-xs">
                    {event.externalLink}
                  </div>
                </td>
                <td className="p-3 text-gray-600 text-xs">
                  {event.bookings.length}
                </td>
                <td className="p-3 text-gray-600 text-xs">{event.capacity}</td>
                <td className="p-3 text-gray-600 text-xs">
                  {event.isPublic ? "Public" : "Private"}
                </td>
                <td className="p-3 text-gray-600">
                  <Button className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
