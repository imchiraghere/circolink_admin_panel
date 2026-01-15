"use client";
import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { get_user_details, block_user, delete_user } from "@/api/admin";
import ConfirmationModal from "../popup/ConfirmationModal";

const ListOfUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "danger",
    title: "",
    message: "",
    confirmText: "",
    onConfirm: null,
  });
  const itemsPerPage = 10;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch users whenever page, search, or sort changes
  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const res = await get_user_details(
          currentPage,
          itemsPerPage,
          searchTerm,
          sortOrder
        );

        if (res?.success) {
          setAllUsers(res.users);
          setTotalUsers(res.total);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, [currentPage, searchTerm, sortOrder]);

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
  };

  const closeModal = () => {
    if (!actionLoading) {
      setModalConfig({
        isOpen: false,
        type: "danger",
        title: "",
        message: "",
        confirmText: "",
        onConfirm: null,
      });
    }
  };

  const openBlockModal = (userId, currentBlockStatus, userName) => {
    setModalConfig({
      isOpen: true,
      type: currentBlockStatus ? "success" : "danger",
      title: currentBlockStatus ? "Unblock User?" : "Block User?",
      message: currentBlockStatus
        ? `Are you sure you want to unblock "${userName}"? They will regain access to their account.`
        : `Are you sure you want to block "${userName}"? They will lose access to their account.`,
      confirmText: currentBlockStatus ? "Yes, Unblock" : "Yes, Block",
      onConfirm: () => confirmBlockUser(userId, currentBlockStatus),
    });
  };

  const confirmBlockUser = async (userId, currentBlockStatus) => {
    setActionLoading(true);

    try {
      const res = await block_user(userId, !currentBlockStatus);

      if (res?.success) {
        setAllUsers((prev) =>
          prev.map((user) =>
            user._id === userId
              ? { ...user, isBlocked: !currentBlockStatus }
              : user
          )
        );
        closeModal();
      }
    } catch (error) {
      console.error("Error toggling block status:", error);
      alert("Failed to update block status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (userId, currentDeleteStatus, userName) => {
    setModalConfig({
      isOpen: true,
      type: currentDeleteStatus ? "success" : "danger",
      title: currentDeleteStatus ? "Restore User?" : "Delete User?",
      message: currentDeleteStatus
        ? `Are you sure you want to restore "${userName}"? Their account will be reactivated.`
        : `Are you sure you want to delete "${userName}"? This action can be reversed later.`,
      confirmText: currentDeleteStatus ? "Yes, Restore" : "Yes, Delete",
      onConfirm: () => confirmDeleteUser(userId, currentDeleteStatus),
    });
  };

  const confirmDeleteUser = async (userId, currentDeleteStatus) => {
    setActionLoading(true);

    try {
      const res = await delete_user(userId, !currentDeleteStatus);

      if (res?.success) {
        setAllUsers((prev) =>
          prev.map((user) =>
            user._id === userId
              ? { ...user, isDeleted: !currentDeleteStatus }
              : user
          )
        );
        closeModal();
      }
    } catch (error) {
      console.error("Error toggling delete status:", error);
      alert("Failed to update delete status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="min-h-screen bg-white text-black p-6">
        <div className="max-w-6xl">
          {/* Search and Filter */}
          <div className="flex items-center my-8">
            <span className="flex min-w-[60%] gap-4 items-center">
              <h2 className="2xl:text-2xl font-semibold capitalize text-base">
                List of all users
              </h2>
              <hr className="w-20" />
            </span>

            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search User by Name, Email, or Phone"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-gray-100 rounded px-4 py-1 text-sm 2xl:py-2 2xl:text-md pr-10 text-black placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                />
                <Search
                  className="absolute bg-primary-gradient right-3 p-[1px] rounded-sm top-1.5 2xl:top-2.5 text-white"
                  size={22}
                />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-white border border-zinc-700 rounded px-4 py-2 text-black focus:outline-none focus:border-zinc-600"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <p className="mt-2 text-zinc-600">Loading users...</p>
            </div>
          )}

          {/* Table */}
          {!loading && (
            <div className="overflow-x-auto rounded-md">
              <table className="w-full text-sm 2xl:text-md">
                <thead>
                  <tr className="bg-primary-gradient text-white rounded-t-lg">
                    <th className="text-left px-4 py-3 font-semibold">
                      User No
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      User ID
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">Phone</th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Emails
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Joined Date
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Active/Block
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-8 text-zinc-500"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    allUsers.map((user, index) => {
                      const globalIndex =
                        (currentPage - 1) * itemsPerPage + index + 1;
                      const userName = `${user.firstName} ${user.lastName}`;

                      return (
                        <tr
                          key={user._id}
                          className={`border-zinc-800 text-xs 2xl:text-sm hover:bg-zinc-100 transition-colors ${
                            user.isDeleted ? "opacity-50 bg-red-50" : ""
                          }`}
                        >
                          <td className="px-4 py-4 text-zinc-400">
                            {globalIndex}.
                          </td>
                          <td className="px-4 py-4">
                            <span>
                              {userName}
                              {user.isDeleted && (
                                <span className="ml-2 text-xs text-red-600 font-semibold">
                                  (Deleted)
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-4">{user.phone}</td>
                          <td className="px-4 py-4">
                            <span>{user.email}</span>
                          </td>
                          <td className="px-4 py-4">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() =>
                                openBlockModal(
                                  user._id,
                                  user.isBlocked,
                                  userName
                                )
                              }
                              disabled={user.isDeleted}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                user.isBlocked
                                  ? "bg-primary-gradient"
                                  : "bg-zinc-400"
                              } ${
                                user.isDeleted
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  user.isBlocked
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() =>
                                openDeleteModal(
                                  user._id,
                                  user.isDeleted,
                                  userName
                                )
                              }
                              className={`p-2 rounded hover:bg-red-100 transition-colors ${
                                user.isDeleted
                                  ? "text-green-600 hover:bg-green-100"
                                  : "text-red-600"
                              }`}
                              title={
                                user.isDeleted ? "Restore User" : "Delete User"
                              }
                            >
                              {user.isDeleted ? (
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M3 12h18M3 6h18M3 18h18" />
                                  <path d="M12 3v18" />
                                </svg>
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-zinc-900 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded hover:bg-zinc-100 disabled:opacity-50"
              >
                &lt;&lt;
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded ${
                        currentPage === pageNum
                          ? "bg-primary-gradient text-white"
                          : "hover:bg-zinc-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return <span key={pageNum}>...</span>;
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded hover:bg-zinc-100 disabled:opacity-50"
              >
                &gt;&gt;
              </button>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 text-zinc-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Pagination Info */}
          {!loading && totalUsers > 0 && (
            <div className="text-center mt-4 text-sm text-zinc-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers}{" "}
              users
            </div>
          )}
        </div>

        <style jsx>{`
          .bg-primary-gradient {
            background: linear-gradient(90deg, #151118 0%, #a3251e 100%);
          }
        `}</style>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        type={modalConfig.type}
        isLoading={actionLoading}
      />
    </>
  );
};

export default ListOfUsers;
