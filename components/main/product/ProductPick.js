"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "../../../lib/utils";

function ProductPick({ variant, title, price, image, productID }) {
  const router = useRouter();
  const searchParam = useSearchParams();
  const selectedColor = searchParam.get("type");
  const selectedCode = searchParam.get("productID");

  const selectedImage =
    image.find((img) => img.variantID === parseInt(selectedCode)) || image[0];
  return (
    <>
      <div
        className={cn(
          "w-6 h-6 rounded-full cursor-pointer transition-all duration-300 hover:opacity-75",
          selectedCode == variant.id ? "opacity-100" : "opacity-30"
        )}
        style={{ background: variant.color }}
        onClick={() =>
          router.push(
            `/products/${productID}?id=${productID}&productID=${variant.id}&price=${price}&title=${title}&type=${variant.productType}&image=${selectedImage?.url}`,
            { scroll: false }
          )
        }></div>
    </>
  );
}

export default ProductPick;
