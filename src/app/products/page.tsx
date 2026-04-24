// app/page.tsx
import { Suspense } from "react";
import ProductList from "@/src/components/ProductsList";
export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductList />
    </Suspense>
  );
}