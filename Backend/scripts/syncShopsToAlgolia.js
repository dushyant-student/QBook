import "dotenv/config";
import ShopModel from "../models/userShopModel.js";
import { connectDB } from "../config/db.js";
import { saveShopToAlgolia } from "../services/algoliaShopService.js";

async function syncShops() {
  try {
    // MongoDB connect For Algoliya
    await connectDB();

    const shops = await ShopModel.find();

    console.log(`Found ${shops.length} shops`);

    // Step 3: Shops ko Algolia mein sync
    // for (const shop of shops) {
    await saveShopToAlgolia(shop);
    //   // console.log(`Synced shop: ${shop._id}`);
    // }

    for (const shop of shops) {
      // console.log(
      (
        {
          mongoId: shop._id,
          shopId: shop.shopId,
          name: shop.shopName
        }
      )
      // );

      await saveShopToAlgolia({
        ...shop.toObject(),
        objectID: shop._id.toString()
      });
    }

    // console.log("All shops synced successfully!");
  } catch (error) {
    console.error("Sync failed:", error.message);
    process.exitCode = 1;
  } finally {
    // Database connection close
    await ShopModel.db.close();
  }
}

syncShops();