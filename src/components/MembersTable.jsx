import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import user from "../assets/user.jpg";

export default function MembersTable({ members, onSelectMember }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMembers = useMemo(() => {
    return members?.filter((member) => {
      const matchesSearch =
        member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, searchQuery, statusFilter]);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-kanit text-lg font-semibold text-gray-800 mb-4">
        All Members
      </h2>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-[300px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-[180px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers?.length > 0 ? (
                filteredMembers?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <img
                        src={member.avatarUrl || user}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="w-[150px] text-xs">{member.fullName}</div>
                    </TableCell>
                    <TableCell className="text-xs">{member.email}</TableCell>
                    <TableCell className="capitalize text-xs">
                      {member.role}
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-xs">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          member.status === "active"
                            ? "bg-green-100 text-green-700"
                            : member.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => onSelectMember(member)}
                        className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm py-4">
                    No members found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
