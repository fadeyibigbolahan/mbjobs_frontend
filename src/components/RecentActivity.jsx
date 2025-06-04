import { UserPlus, CalendarPlus, MessageSquareText } from "lucide-react";

const iconMap = {
  member_joined: <UserPlus className="w-3 h-3 text-black" />,
  event_created: <CalendarPlus className="w-3 h-3 text-black" />,
  feedback: <MessageSquareText className="w-3 h-3 text-black" />,
};

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white shadow rounded-xl p-2 space-y-4">
      <h2 className="font-kanit text-lg font-semibold text-gray-800">
        Recent Activity
      </h2>
      <ul className="space-y-3 max-h-[260px] overflow-y-auto">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-start gap-3 border-b pb-1"
          >
            <div className="border border-[#7A54A1] bg-[#7A54A120] p-2 rounded-full">
              {iconMap[activity.type]}
            </div>
            <div>
              <p className="text-sm text-gray-800">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
