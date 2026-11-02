import {  algoliaClient,  SHOP_INDEX,} from "../config/algolia.js";

export const saveShopToAlgolia = async (shop) => {
  const shopData = shop.toObject
    ? shop.toObject()
    : shop;

  const objectID = String(shopData.shopId || shopData.objectID);

  if (!objectID || objectID === "undefined") {
    throw new Error("Shop ID is required for Algolia");
  }

  const searchableShop = {
    objectID,
    shopName: shopData.shopName || shopData.name || "",
    name: shopData.name || "",
    shopId:shopData.shopId || "",
    city: shopData.city || "",
    country: shopData.country || "",
    address: shopData.address || "",
    description: shopData.description || "",
    shopImage: shopData.shopImage || "",
  };

  await algoliaClient.saveObject({
    indexName: SHOP_INDEX,
    body: searchableShop,
  });

  return searchableShop;
};

export const deleteShopFromAlgolia = async (shopId) => {
  await algoliaClient.deleteObject({
    indexName: SHOP_INDEX,
    objectID: String(shopId),
  });
};