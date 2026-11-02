import { Suspense } from "react";
import ShopSearchResults from "../components/ShopSearchResults";


export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <p className="px-5 pt-24 text-gray-600">Loading shops...</p>
      }
    >
      <ShopSearchResults />
    </Suspense>
  );
}