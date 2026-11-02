import api from "@/lib/axios";


export const ChangeTiming = async (shopId, timing) => {

  const response = await api.put( `/change-timing/${shopId}`, timing);
  return response.data;
};


export const getShopTiming = async (shopId) => {
  const response = await api.get(`/shop-timing/${shopId}`);
  return response.data;
};