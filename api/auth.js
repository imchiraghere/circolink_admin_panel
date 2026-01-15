import api from "@/lib/axios";

export const login = async (data) => {
  const res = await api.post("/admin/login", data, {
    withCredentials: true, // important if backend sets cookie
  });
  return res.data;
};



export const logout = async () => {
  const res = await api.get("/admin/logout", {
    withCredentials: true,
  });
  return res.data;
};
