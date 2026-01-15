import api from "@/lib/axios";

export const getAllQuery = async () => {
  const res = await api.get("/admin/getAllQuery", {
    withCredentials: true,
  });
  return res.data;
};

export const get_user_details = async (
  page = 1,
  limit = 10,
  search = "",
  sortOrder = "newest"
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search: search }),
    sort: sortOrder,
  }).toString();

  const res = await api.get(`/admin/getAllUsers?${queryParams}`, {
    withCredentials: true,
  });
  return res.data;
};

export const get_single_user = async (userId) => {
  const res = await api.get(`/admin/getUser/${userId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const block_user = async (userId, isBlocked) => {
  const res = await api.patch(
    `/admin/block/${userId}`,
    { isBlocked },
    { withCredentials: true }
  );
  return res.data;
};

export const delete_user = async (userId, isDeleted) => {
  const res = await api.patch(
    `/admin/delete/${userId}`,
    { isDeleted },
    { withCredentials: true }
  );
  return res.data;
};

export const get_admin_details = async () => {
  const res = await api.get("/admin/get-admin", {
    withCredentials: true,
  });
  return res.data;
};
