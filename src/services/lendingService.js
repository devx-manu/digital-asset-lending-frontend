import api from "./api";

export const lendingService = {
  getAll: () => api.get("/lendings"),
  getByUser: (userId) => api.get(`/lendings/user/${userId}`),
  request: (userId, assetId) => api.post(`/lendings?userId=${userId}&assetId=${assetId}`),
  approve: (id, managerId) => api.put(`/lendings/${id}/approve`, { managerId }),
  reject: (id, managerId) => api.put(`/lendings/${id}/reject`, { managerId }),
  return: (id) => api.put(`/lendings/${id}/return`),
};
