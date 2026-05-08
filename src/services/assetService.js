import api from "./api";

export const assetService = {
  getAll: () => api.get("/assets"),
  create: (data) => api.post("/assets", data),
};
