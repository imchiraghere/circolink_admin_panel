import api from "@/lib/axios";

export const sendContactMessage = async (data) => {
  const res = await api.post("/submit", data);
  return res.data;
};
