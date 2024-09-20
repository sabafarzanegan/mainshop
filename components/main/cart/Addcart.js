"use client";
import { useState } from "react";
import { useCartStore } from "../../../lib/client-store";
import { Minus, Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { useSearchParams } from "next/navigation";

function Addcart() {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const param = useSearchParams();
  const id = Number(param.get("id"));
  const productID = Number(param.get("productID"));
  const title = param.get("title");
  const type = param.get("type");
  const price = Number(param.get("price"));
  const image = param.get("image");
  return (
    <>
      <div className="flex items-center justify-center gap-x-4">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          className="bg-gray-300 text-primary hover:bg-gray-300">
          <Minus />
        </Button>
        <Button className="flex-1">
          <span className="text-lg">{quantity}</span>
        </Button>
        <Button
          onClick={() => setQuantity(quantity + 1)}
          className="bg-gray-300 text-primary hover:bg-gray-300">
          <Plus />
        </Button>
      </div>
      <Button
        onClick={() => {
          addToCart({
            id: id,
            variant: { variantID: productID, quantity },
            name: title + " " + type,
            price,
            image,
          });
          console.log("hey");
        }}>
        افزودن به سبدخرید
      </Button>
    </>
  );
}

export default Addcart;
