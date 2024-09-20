"use client";
import { useMemo } from "react";
import { useCartStore } from "../../../lib/client-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Image from "next/image";
import { MinusCircle, PlusCircle } from "lucide-react";
function Cartitems() {
  const { cart, addToCart, removeFromCart } = useCartStore();
  console.log(cart);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.variant.quantity;
    }, 0);
  }, [cart]);
  return (
    <div>
      {cart.length == 0 && (
        <h1 className="text-center  text-xl">سبد خرید خالی است</h1>
      )}
      {cart.length > 0 && (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>محصول</TableCell>
                <TableCell>قیمت</TableCell>
                <TableCell>تعداد</TableCell>
                <TableCell>تصویر</TableCell>
                <TableCell>مجموع</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price.toLocaleString("fa")}</TableCell>
                  <TableCell className="flex items-center justify-center gap-x-2">
                    <PlusCircle
                      onClick={() => {
                        addToCart({
                          ...item,
                          variant: {
                            quantity: 1,
                            variantID: item.variant.variantID,
                          },
                        });
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-lg">
                      {item.variant.quantity.toLocaleString("fa")}
                    </span>
                    <MinusCircle
                      onClick={() => {
                        removeFromCart({
                          ...item,
                          variant: {
                            quantity: 1,
                            variantID: item.variant.variantID,
                          },
                        });
                      }}
                      className="w-4 h-4"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <Image width={50} height={50} src={item.image} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Cartitems;
