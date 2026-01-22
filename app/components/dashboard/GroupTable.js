"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { getAllGroups } from "@/api/admin";

export default function GroupTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGroups, setTotalGroups] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  // Fetch groups whenever page or search changes
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const data = await getAllGroups(currentPage, itemsPerPage, searchTerm);
        console.log("groups", data);
        setGroups(data.groups);
        setTotalPages(data.totalPages);
        setTotalGroups(data.totalGroups);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [currentPage, searchTerm]);

  // Reset to first page when search term changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl bg-white rounded-lg pl-10">
      {/* Header Tabs */}
      <div className="flex items-center justify-between mb-8 border-gray-200 px-6 pt-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${
              activeTab === "all"
                ? "bg-primary-gradient text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Group
          </button>
          <button
            onClick={() => setActiveTab("blocked")}
            className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${
              activeTab === "blocked"
                ? "bg-primary-gradient text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Blocked Group
          </button>
        </div>

        <div className="flex items-center gap-3 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Group By Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : groups.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No groups found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-primary-gradient text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Group No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Group Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Admin Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Members
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Created By Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Created Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {groups?.map((group, index) => (
                <tr
                  key={group._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {(currentPage - 1) * itemsPerPage + index + 1}.
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {group.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {group?.admins[0]?.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {group?.participants.length}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {group?.admins[0]?.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(group.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && groups.length > 0 && (
        <div className="flex items-center justify-center gap-1 py-4 border-t border-gray-200">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded min-w-[32px] transition-colors ${
                  currentPage === page
                    ? "bg-red-700 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Results info */}
      {!loading && groups.length > 0 && (
        <div className="text-center text-sm text-gray-600 pb-4">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalGroups)} of {totalGroups}{" "}
          groups
        </div>
      )}
    </div>
  );
}
