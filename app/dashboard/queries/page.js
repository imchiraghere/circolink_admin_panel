"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  MailOpen,
} from "lucide-react";
import { getAllQuery } from "@/api/admin";

export default function QueriesManagementTable() {
  const [queries, setQueries] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getQueries = async () => {
      const res = await getAllQuery();
      if (res.success) {
        setQueries(res.data);
      }
    };
    getQueries();
  }, []);

  // Sort queries: unread first, then read
  const sortedQueries = [...queries].sort((a, b) => {
    if (a.isRead === b.isRead) return 0;
    return a.isRead ? 1 : -1;
  });

  // Filter based on active tab
  const filteredQueries = sortedQueries.filter((query) => {
    if (activeTab === "unread") return !query.isRead;
    if (activeTab === "read") return query.isRead;
    return true;
  });

  // Apply search filter
  const searchedQueries = filteredQueries.filter((query) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      query.email?.toLowerCase().includes(searchLower) ||
      query.name?.toLowerCase().includes(searchLower) ||
      query.phone?.toLowerCase().includes(searchLower) ||
      query.message?.toLowerCase().includes(searchLower)
    );
  });

  const handleToggleRead = async (queryId, currentStatus) => {
    // Update UI optimistically
    setQueries((prev) =>
      prev.map((q) =>
        q._id === queryId ? { ...q, isRead: !currentStatus } : q,
      ),
    );

    // TODO: Call your backend API to update isRead status
    // await updateQueryStatus(queryId, !currentStatus);
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 pt-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-primary-gradient text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Queries ({queries.length})
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === "unread"
                  ? "bg-primary-gradient text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({queries.filter((q) => !q.isRead).length})
            </button>
            <button
              onClick={() => setActiveTab("read")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === "read"
                  ? "bg-primary-gradient text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Read ({queries.filter((q) => q.isRead).length})
            </button>
          </div>

          <div className="flex items-center gap-3 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Queries"
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
          <table className="w-full">
            <thead className="bg-primary-gradient text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Found Us
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {searchedQueries.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No queries found
                  </td>
                </tr>
              ) : (
                searchedQueries.map((query, index) => (
                  <tr
                    key={query._id}
                    className={`hover:bg-gray-50 transition-all ${
                      query.isRead ? "opacity-50" : "opacity-100"
                    } ${!query.isRead ? "bg-red-50" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {index + 1}.
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-medium ${!query.isRead ? "text-red-700" : "text-gray-900"}`}
                    >
                      {query.name || "-"}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${!query.isRead ? "text-red-700" : "text-gray-600"}`}
                    >
                      {query.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {query.phone || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {query.message || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      {query.foundUs || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(query.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleToggleRead(query._id, query.isRead)
                        }
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          query.isRead
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {query.isRead ? (
                          <>
                            <MailOpen className="w-3.5 h-3.5" />
                            Read
                          </>
                        ) : (
                          <>
                            <Mail className="w-3.5 h-3.5" />
                            Unread
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {searchedQueries.length > 0 && (
          <div className="flex items-center justify-center gap-1 py-4 border-t border-gray-200">
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <ChevronsLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <button className="px-3 py-1 bg-red-700 text-white rounded min-w-[32px]">
              1
            </button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded min-w-[32px]">
              2
            </button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded min-w-[32px]">
              3
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 hover:bg-gray-100 rounded min-w-[32px]">
              10
            </button>

            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <ChevronsRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
