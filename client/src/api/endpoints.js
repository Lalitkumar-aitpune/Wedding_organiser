import api from "./client";

export const calculateEvent = (payload) => api.post("/calculate", payload);
export const getShops = () => api.get("/shops");
export const updateShopPrice = (payload) => api.post("/shop/update-price", payload);
export const placeOrder = (payload) => api.post("/order", payload);
export const registerShop = (payload) => api.post("/auth/register", payload);
export const loginShop = (payload) => api.post("/auth/login", payload);
