import api from "./client";

export const calculateEvent = (payload) => api.post("/calculate", payload);
export const getShops = () => api.get("/shops");
export const updateShopPrice = (payload) => api.post("/shop/update-price", payload);
export const placeOrder = (payload) => api.post("/order", payload);
export const registerUser = (payload) => api.post("/auth/register", payload);
export const loginUser = (payload) => api.post("/auth/login", payload);
export const registerShop = (payload) => api.post("/auth/register", payload);
export const loginShop = (payload) => api.post("/auth/login", payload);
export const getAdminShops = () => api.get("/admin/shops");
export const updateAdminShopStatus = (shopId, payload) => api.patch(`/admin/shops/${shopId}/status`, payload);
export const getAdminOrders = () => api.get("/admin/orders");
export const updateAdminOrderStatus = (orderId, payload) =>
  api.patch(`/admin/orders/${orderId}/status`, payload);
export const getAdminDishRatios = () => api.get("/admin/dish-ratios");
export const createAdminDishRatio = (payload) => api.post("/admin/dish-ratios", payload);
export const updateAdminDishRatio = (dishRatioId, payload) =>
  api.put(`/admin/dish-ratios/${dishRatioId}`, payload);
export const deleteAdminDishRatio = (dishRatioId) => api.delete(`/admin/dish-ratios/${dishRatioId}`);
