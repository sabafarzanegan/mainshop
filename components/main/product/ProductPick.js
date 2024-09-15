"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "../../../lib/utils";

function ProductPick({ variant, title, price, image, productID }) {
  console.log(variant);
  const router = useRouter();
  const searchParam = useSearchParams();
  const selectedColor = searchParam.get("type");
  console.log(selectedColor);

  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full cursor-pointer transition-all duration-300 hover:opacity-75",
        selectedColor === variant.productType ? "opacity-100" : "opacity-50"
      )}
      style={{ background: variant.color }}
      onClick={() =>
        router.push(
          `/products/${productID}?id=${productID}&productID=${variant.id}&price=${price}&title=${title}&type=${variant.productType}&image=${image}`,
          { scroll: false }
        )
      }></div>
  );
}

export default ProductPick;
