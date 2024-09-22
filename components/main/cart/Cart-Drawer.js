"use client";
import {
  ArrowBigLeft,
  ArrowLeft,
  ArrowUpLeft,
  ShoppingCart,
} from "lucide-react";
import { useCartStore } from "../../../lib/client-store";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../../ui/drawer";
import Cartitems from "../cart/Cartitems";
import { Button } from "../../ui/button";
import { AnimatePresence, motion } from "framer-motion";
function CartDrawer() {
  const { cart, checkoutProgress, setCheckoutProgress } = useCartStore();
  console.log(checkoutProgress);

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0 }}
                className="absolute flex items-center justify-center -top-0.5 right-0 w-6 h-6 dark:bg-primary bg-primary/75 text-base font-bold rounded-full">
                {cart.length.toLocaleString("fa")}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingCart className="w-8 h-8" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="py-4">
        <DrawerHeader>
          <DrawerTitle className="text-center">
            {checkoutProgress === "cart-page" && "سید خرید"}

            {checkoutProgress === "payment-page" && "سفارش دهید"}
            {checkoutProgress === "confirmation-page" &&
              "سفارش خود را نهایی کنید"}
          </DrawerTitle>
        </DrawerHeader>
        {checkoutProgress === "payment-page" && (
          <div
            onClick={() => {
              setCheckoutProgress("cart-page");
            }}
            className="flex items-center gap-x-2 text-center px-4">
            <span className="text-sm">برگشت به سبد خرید</span>
            <ArrowLeft className="w-4 h-4" />
          </div>
        )}
        {checkoutProgress === "cart-page" && <Cartitems />}
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;
